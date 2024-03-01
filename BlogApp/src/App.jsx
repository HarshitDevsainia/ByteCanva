import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import DashBoard from './Pages/DashBoard';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Project from './Pages/Project';
import Header from './Components/Header';


function App() {
  return (
    <>
      <BrowserRouter>
          <Header/>
          <Routes>
             <Route path='/' element={<Home/>}/> 
             <Route path='/About' element={<About/>} /> 
             <Route path='/Signin' element={<Signin/>} /> 
             <Route path='/Signup' element={<Signup/>} /> 
             <Route path='DashBoard' element={<DashBoard/>} /> 
             <Route path='Project' element={<Project/>} /> 
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
