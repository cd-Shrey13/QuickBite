import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const URL = import.meta.env.VITE_URL;

function App() {
  let response;
  useEffect(() => {
    const getResponse = async (params) =>  {
      response = await axios.get("http://localhost:3000/");
      console.log(response.data.message); 
    }

    getResponse();
  }, [])
  return (
    <>
     
      
    </>
  )
}

export default App
