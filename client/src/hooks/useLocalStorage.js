import { useState, useEffect } from "react"

const useLocalStorage = (name) => {
  const [ value, setValue ] = useState("")

  useEffect(() => {
    const storedValue = window.localStorage.getItem(name)
    setValue(storedValue)
    /* console.log(`useLocalStorage ${name}: loaded "${storedValue}" from localstorage`); */
  }, [ ])
 
  const save = (newValue) => {
    setValue(newValue)
    window.localStorage.setItem(name, newValue)
    /* console.log(`useLocalStorage ${name}: saved "${newValue}" to localstorage`); */
  }

  return [ value, save ]
}

export default useLocalStorage