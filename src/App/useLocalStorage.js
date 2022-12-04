import React from 'react'

function useLocalStorage(itemName, initialValue)
{
  const [sincronized, setSincronized] = React.useState(true);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try
      {
        const localStorageItem = localStorage.getItem(itemName)
  
        let parsedItem;
  
        if(!localStorageItem){
          localStorage.setItem(itemName,JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else { 
          parsedItem = JSON.parse(localStorageItem);
        }
  
        setItem(parsedItem)
        setLoading(false)
        setSincronized(true)
      }
      catch(error)
      {
        setLoading(false)
        setError(true)
        setSincronized(true)
      }
    }, 2000)
  },[sincronized])

  const saveItem = (newItem) => {
    setItem(newItem)
    localStorage.setItem(itemName, JSON.stringify(newItem))
  }

  const sincronize = () => {
    setLoading(true)
    setSincronized(false)
  }

  return {item, saveItem, loading, error, sincronize}
}

export {useLocalStorage}