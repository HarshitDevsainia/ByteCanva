import react from 'react'
import {Link ,useLocation} from 'react-router-dom';
import {Navbar , NavbarCollapse, NavbarLink, NavbarToggle, TextInput,Button, Dropdown, Avatar} from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';



export default function Header() {
  let path=useLocation().pathname;
  const {currUser}=useSelector(state=>state.user);
  const {theme}=useSelector(state=>state.theme);
  const dispatch = useDispatch();
  function handleSignout() {
    console.log('You Sign Out');
  }
    return (
        <>
           <Navbar className='border-gray border-b-2'>
              <Link 
                to={'/'}>
                <span className='rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2  satisfy-regular font-bold '>ByteCanvas</span>
              </Link>
              <form>
                  <TextInput
                    type='text'
                    placeholder='Search..'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                  ></TextInput>
              </form>
              <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
              </Button>
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