import React, { useState, useEffect } from 'react'
import RetrieveData from '../components/RetrieveData'
import PostData from '../components/PostData'


function Home() {
  const [dataVisible, setDataVisible] = useState(true)

  return (
    <div >
      <h2 className='nav'>
        <span onClick={() => setDataVisible(false)}>Post Data</span>
        <span onClick={() => setDataVisible(true)}>Retrieve Data</span>
      </h2>
      {
        dataVisible? (<RetrieveData />): (<PostData />)
      }
    </div>
  )
}

export default Home
