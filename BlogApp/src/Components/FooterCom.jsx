import React from 'react';
import {Link} from 'react-router-dom';
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitch, BsTwitter} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border-t-2 border-gray-300'>
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full grid justify-between sm:flex md:grid-cols-1">
              <div className="mt-5">
                  <h2 className=' text-2xl satisfy-regular'>ByteCanva Blog</h2>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                  <div className='m-3'>
                    <Footer.Title title='about'/>
                    <Footer.LinkGroup col>
                      <Footer.Link href='https://www.geeksforgeeks.org/top-javascript-projects/'>Top JS Projects</Footer.Link>
                      <Footer.Link href='http://localhost:5173/'>ByteCanva Blog</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div className='m-3'>
                    <Footer.Title title='follow us'/>
                    <Footer.LinkGroup col>
                      <Footer.Link>
                        <Link to={'https://github.com/HarshitDevsainia/ByteCanva'} target='_blank' rel="noopener noreferrer" >Github</Link>
                      </Footer.Link>
                      <Footer.Link href='https://discord.com/' target='_blank' rel="noopener noreferrer">DisCord</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div className='m-3'>
                    <Footer.Title title='legel'/>
                    <Footer.LinkGroup col>
                      <Footer.Link href='/'>Privacy & Policy</Footer.Link>
                      <Footer.Link href='/'>Terms & Conditions</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                </div>
              </div>
              <FooterDivider/>
                <div className="w-full sm:flex sm:justify-between sm:items-center">
                  <FooterCopyright 
                  href='#' 
                  by='ByteCanva Blog'
                  year={new Date().getFullYear()}/>
                  <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                   <Footer.Icon href='https://www.facebook.com/' icon={BsFacebook}/>
                   <Footer.Icon href='https://www.instagram.com/' icon={BsInstagram}/>
                   <Footer.Icon href='https://twitter.com/' icon={BsTwitter}/>
                   <Footer.Icon href='https://github.com/HarshitDevsainia/ByteCanva' target='_blank' rel="noopener noreferrer" icon={BsGithub}/>
                   <Footer.Icon href='https://dribbble.com/' icon={BsDribbble}/>
                  </div>
                </div>
            </div>
    </Footer>
  )
};
