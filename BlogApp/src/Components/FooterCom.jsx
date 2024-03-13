import React from 'react'
import {Link} from 'react-router-dom';
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitch, BsTwitter} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className='border-t-2 border-gray-700'>
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full grid justify-between sm:flex md:grid-cols-1">
              <div className="mt-5">
                  <h2 className=' text-2xl satisfy-regular'>ByteCanva Blog</h2>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                  <div className='m-3'>
                    <Footer.Title title='about'/>
                    <Footer.LinkGroup col>
                      <Footer.Link>100 JS Projects</Footer.Link>
                      <Footer.Link>ByteCanva Blog</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div className='m-3'>
                    <Footer.Title title='follow us'/>
                    <Footer.LinkGroup col>
                      <Footer.Link href='https//github.com/HarshitDevsania'>Github</Footer.Link>
                      <Footer.Link href='#'>DisCord</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div className='m-3'>
                    <Footer.Title title='legel'/>
                    <Footer.LinkGroup col>
                      <Footer.Link href='#'>Privacy & Policy</Footer.Link>
                      <Footer.Link href='#'>Terms & Conditions</Footer.Link>
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
                   <Footer.Icon href='' icon={BsFacebook}/>
                   <Footer.Icon href='' icon={BsInstagram}/>
                   <Footer.Icon href='' icon={BsTwitter}/>
                   <Footer.Icon href='' icon={BsGithub}/>
                   <Footer.Icon href='' icon={BsDribbble}/>
                  </div>
                </div>
            </div>
    </Footer>
  )
};
