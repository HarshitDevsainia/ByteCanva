import react from 'react'
import {Link ,useLocation} from 'react-router-dom';
import {Navbar , NavbarCollapse, NavbarLink, NavbarToggle, TextInput,Button} from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon } from "react-icons/fa";

export default function Header() {
  let path=useLocation().pathname;
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
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                  <FaMoon/>
                </Button>
                <Link to={'/SignIn'}>
                  <Button className='h-10 max-[320px]:hidden' gradientDuoTone={'purpleToBlue'} outline>SignIn</Button>
                </Link>
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