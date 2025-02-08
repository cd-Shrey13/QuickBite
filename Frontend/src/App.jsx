import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const URL = import.meta.env.VITE_URL;

function App() {
  const [response, setResponse] = useState(null)
  useEffect(() => {
    const getResponse = async (params) =>  {
      response = await axios.get(`${URL}`);
      setResponse(response.data.message); 
    }

    getResponse();
  }, [])
  return (
    <>
      {
        response ? <h1>{response}</h1> : <h1>Loading...</h1>
      }
    </>
  )
}

export default App
