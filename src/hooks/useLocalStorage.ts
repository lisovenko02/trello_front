import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface IUseLocalStorage<T> {
  key: string
  defaultValues: T
}

const useLocalStorage = <T>({
  key,
  defaultValues,
}: IUseLocalStorage<T>): [T, Dispatch<SetStateAction<T>>, boolean] => {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<T>(defaultValues)

  const isMounted = useRef(false)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setValue(JSON.parse(item))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

    return () => {
      isMounted.current = false
    }
  }, [key])

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      isMounted.current = true
    }
  }, [key, value])

  return [value, setValue, isLoading]
}

export default useLocalStorage
