import react, { useEffect, useState } from 'react'
import {Link ,useLocation} from 'react-router-dom';
import {Navbar , NavbarCollapse, NavbarLink, NavbarToggle, TextInput,Button, Dropdown, Avatar} from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import {signOutUserSuccess} from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  let path=useLocation().pathname;
  const location=useLocation();
  const [searchTerm,setSearchTerm]=useState('');
  const {currUser}=useSelector(state=>state.user);
  const {theme}=useSelector(state=>state.theme);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromURL=urlParams.get('searchTerm');
    if(searchTermFromURL){
      setSearchTerm(searchTermFromURL);
    } 
  },[location.search]);

  async function handleSubmit(e) {
    e.preventDefault();
    const urlParams=new URLSearchParams(location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  async function handleSignout() {
    try{
      const res=await fetch('/api/user/signout',{
        method:'POST'
      });
      let data=await res.json();
      if(!res.ok){
        throw data.message;
      }
      else{
        dispatch(signOutUserSuccess());
        return;
      }
    }
    catch(err){
      console.log(err);
    }
  }
    return (
        <>
           <Navbar className='border-gray border-b-2'>
              <Link 
                to={'/'}>
                <span className='rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2  satisfy-regular font-bold '>ByteCanvas</span>
              </Link>
              <form onSubmit={handleSubmit}>
                  <TextInput
                    type='text'
                    placeholder='Search..'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    value={searchTerm}
                  ></TextInput>
              </form>
              <Link to={'/search'}>
                  <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                    <AiOutlineSearch/>
                  </Button>
              </Link>
              <div className='flex gap-2 md:order-2'> 
                <Button 
                className='w-12 h-10 hidden sm:inline' 
                color='gray' 
                pill
                onClick={()=>dispatch(toggleTheme())}>
                  {theme === 'light' ? <FaSun/> : <FaMoon/>}
                </Button>
                {currUser?(
                  <Dropdown
                     arrowIcon={false}
                     inline
                     label={
                      <Avatar alt='user' img={currUser.profilePicture} rounded/>
                     }
                  >
                  <Dropdown.Header>
                      <span className='Block text-sm'>@{currUser.username}</span>
                      <span className=' block text-sm font-medium truncate'>{currUser.email}</span>
                  </Dropdown.Header>
                  <Link to={'/dashboard?tab=Profile'}>
                     <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider/>
                  <Dropdown.Item onClick={handleSignout}>SignOut</Dropdown.Item>
                </Dropdown>
                ):(<Link to={'/SignIn'}>
                  <Button className='h-10 max-[320px]:hidden' gradientDuoTone={'purpleToBlue'} outline>SignIn</Button>
                </Link>)}
                <NavbarToggle/>
              </div>
              <Navbar.Collapse>
                <Navbar.Link active={path==='/'} as={'div'}>
                   <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path==='/about'} as={'div'}>
                   <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link  active={path==='/project'} as={'div'}>
                   <Link to='/project'>Projects</Link>
                </Navbar.Link>
                <Navbar.Link  active={path==='/signin'} className='lg:hidden min-[320px]:hidden' as={'div'}>
                   <Link to='/signin'>Sign In</Link>
                </Navbar.Link>
              </Navbar.Collapse>
           </Navbar>
        </>
    )
}