import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import DashBoard from './Pages/DashBoard';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Project from './Pages/Project';
import Header from './Components/Header';
import FooterCom from './Components/FooterCom'
import PrivateRoute from './Components/PrivateRoute';
import AdminPrivateRoute from './Components/AdminPrivateRoute';
import CreatePost from './Pages/CreatePost';
import UpdatePost from './Pages/UpdatePost';
import PostPage from './Pages/PostPage';
import ScrollToTop from './Components/ScrollToTop';
import Search from './Pages/Search';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
          <Header/>
          <Routes>
             <Route path='/' element={<Home/>}/> 
             <Route path='/About' element={<About/>} /> 
             <Route path='/Signin' element={<Signin/>} /> 
             <Route path='/Signup' element={<Signup/>} /> 
             <Route element={<PrivateRoute/>}>
                <Route path='/DashBoard' element={<DashBoard/>} /> 
             </Route>
             <Route path='/Project' element={<Project/>} /> 
             <Route element={<AdminPrivateRoute/>}>
                <Route path='/create-post' element={<CreatePost/>}/>
                <Route path='/update-post/:postId' element={<UpdatePost/>}/>
             </Route>
             <Route path='/posts/:postSlug' element={<PostPage/>}/>
             <Route path='/search' element={<Search/>}/>
          </Routes>
          <FooterCom/>
      </BrowserRouter>
    </>
  )
}

export default App
