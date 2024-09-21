'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";

type NavBarItemPropsType = {
  title : string,
  classProps: string,
}
const NavBarItem: React.FC<NavBarItemPropsType> = ({title, classProps}) => {
  return (
    <li className={`mx-4 cursor-pointer font-bold hover:opacity-75 ${classProps}`}>
      {title}
    </li>
  )
};

const navList: string[] = ["Market", "Exchange", "Tutorials", "Wallets"];

const NavBar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  return (
    <nav className="w-full flex justify-between items-center p-4 md:justify-around lg:justify-center">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Image src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      {/* Desktop menu */}
      <ul className="hidden flex-row flex-initial justify-between items-center md:flex">
        {
          navList.map((item, index) => (
            <NavBarItem key={index} title={item} classProps=""/>
          ))
        }
        <li className="py-2 px-7 rounded-full bg-blue-600 hover:opacity-75 cursor-pointer">
          Login
        </li>
      </ul>
      {/* Mobile menu */}
      <div className="flex relative">
        <IoMdMenu className={`md:hidden cursor-pointer ${toggleMenu && "opacity-0"}`} fontSize={40} onClick={() => setToggleMenu(true)}/>
        {
          toggleMenu &&
            <ul className="bg-blue-glassmorphism z-10 fixed top-0 right-0 p-3 w-[50vw] h-screen shadow-2xl flex flex-col gap-5 justify-start items-center rounded-md md:hidden transition-all duration-1000">
              <li className="text-xl w-full flex justify-end">
                <IoMdClose className="md:hidden cursor-pointer" fontSize={40} onClick={() => setToggleMenu(false)}/>
              </li>
              {
                navList.map((item, index) => (
                  <NavBarItem key={index} title={item} classProps=" text-lg border text-center bg-gray-200 text-black rounded-md p-2 w-full sm:w-4/5"/>
                ))
              }
            </ul>
        }
      </div>
    </nav>
  )
};

export default NavBar;