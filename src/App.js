
import './App.css';
import LoadingBar from "react-top-loading-bar";
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
 const apikey = process.env.REACT_APP_NEWS_API_KEY;

  const[progress , setprogress] = useState(0)

  // setprogress = (progress) =>{
  //   setprogress(progress=progress)
  // }
  return (
    <BrowserRouter>
      <Navbar/>
      <LoadingBar
      height={2}
      color="#f11946"
      progress={progress}
    />
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<News setprogress={setprogress} apikey={apikey} key="general" category="general"/>}></Route>
          <Route exact path="/business" element={<News setprogress={setprogress} apikey={apikey} key="business" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setprogress={setprogress} apikey={apikey} key="entertainment" category="entertainment"/>}></Route>
          <Route exact path="/general" element={<News setprogress={setprogress} apikey={apikey} key="general" category="general"/>}></Route>
          <Route exact path="/health" element={<News setprogress={setprogress} apikey={apikey} key="health" category="health"/>}></Route>
          <Route exact path="/science" element={<News setprogress={setprogress} apikey={apikey} key="science" category="science"/>}></Route>
          <Route exact path="/sports" element={<News setprogress={setprogress} apikey={apikey} key="sports" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setprogress={setprogress} apikey={apikey} key="technology" category="technology"/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App


