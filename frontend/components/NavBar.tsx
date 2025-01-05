/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { TransactionsContext } from "@/context/TransactionContext";

type NavBarItemPropsType = {
  title : string,
  className?: string,
}
const NavBarItem: React.FC<NavBarItemPropsType> = ({title, className}) => {
  return (
    <li className={`mx-4 cursor-pointer font-bold hover:opacity-75 ${className}`}>
      {title}
    </li>
  )
};

const navList: string[] = ["Market", "Exchange", "Tutorials", "Wallets"];

const NavBar: React.FC = () => {
  const { 
    currentAccount, 
    connectToWallet, 
    disconnectWallet
  } : any = useContext(TransactionsContext);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  return (
    <nav className="flex justify-between items-center p-4 ">
      <div className="justify-center items-center ">
        <Image src={logo} alt="logo" className="w-32 cursor-pointer hover:opacity-75 duration-500" />
      </div>
      {/* Desktop menu */}
      <ul className="hidden flex-row flex-initial justify-between items-center md:flex">
        {
          navList.map((item, index) => (
            <NavBarItem key={index} title={item} className="hover:shadow-md rounded-md p-2 hover:shadow-pink-400 duration-500"/>
          ))
        }
        {/* <li className="py-1 px-5 rounded-xl bg-blue-600 hover:opacity-75 cursor-pointer transition-opacity duration-500">
          <button 
            className="" 
            onClick={!currentAccount ? connectToWallet : disconnectWallet}
          >
            {currentAccount ? "Logout" : "Login"}
          </button>
        </li> */}
      </ul>
      {/* Mobile menu */}
      <div className="flex relative md:hidden">
        <IoMdMenu className={`md:hidden cursor-pointer ${toggleMenu && "opacity-0"}`} fontSize={40} onClick={() => setToggleMenu(true)}/>
        {
          toggleMenu &&
            <ul className="blue-glassmorphism z-10 fixed top-0 right-0 p-3 w-full sm:w-1/2 h-screen shadow-2xl flex flex-col gap-5 justify-start items-center rounded-md md:hidden transition-all duration-1000">
              <li className="text-xl w-full flex justify-end">
                <IoMdClose className="md:hidden cursor-pointer mr-2" fontSize={40} onClick={() => setToggleMenu(false)}/>
              </li>
              {
                navList.map((item, index) => (
                  <NavBarItem key={index} title={item} className=" text-lg border text-center bg-gray-200 text-black rounded-md p-2 w-1/2"/>
                ))
              }
              <li className="text-center p-2 w-1/2 rounded-xl bg-blue-600 hover:opacity-75 cursor-pointer ">
                Login
              </li>
            </ul>
        }
      </div>
    </nav>
  )
};

export default NavBar;