'use client';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import Loader from "./Loader";
const Welcome: React.FC = (): React.JSX.Element => {
  const marketList = ["Binance","CoinMarketCap","Blockchain","CoinBase","ECNCapital","Principal"];
  const connectToWallet = () => {
    // todo
  };
  return (

    <div className="flex flex-col py-5 px-2 md:py-20 md:flex-row lg:gap-x-40" >
      <div className="flex justify-start flex-col gap-5">

        <h1 className="text-3xl text-gradient py-1 sm:text-5xl">
          Buy and sell <br /> trusted Crypto
        </h1>

        <p className="w-4/5 text-left font-light md:w-9/12 text-base">
          Explore the world of crypto. Buy and sell crypto coins easily, trust Cryptoon to be your partner in the crypto market.
        </p>

        <button className="flex flex-row items-center gap-x-2 p-3 cursor-pointer w-max rounded-xl bg-blue-600 hover:opacity-75 transition-opacity duration-200" onClick={connectToWallet}>
          <AiFillPlayCircle fontSize={20} />
          <span className="text-base font-semibold">Let&apos;s get started</span>
        </button>

        <div className="grid grid-flow-row grid-cols-2 mt-10 border-l border-t border-gray-500 sm:w-4/5 md:w-full max-lg:w-4/5 sm:grid-cols-3 border-collapse">
          {
            marketList.map((item, index) => 
              <span 
                className={`text-center text-base font-light py-4 border-gray-500 border-r border-b `} 
                key={index}
              >
                {item}
              </span>)
          }
        </div>
      
      </div>

      <div className="flex flex-col w-full justify-start mt-5 md:mt-0 ">
        <div className="justify-end items-start flex-col rounded-xl my-5 w-[300px] h-[180px] lg:w-[400px] lg:h-[250px]  eth-card white-glassmorphism ">

        </div>
      </div>

    </div>
      
  )
}

export default Welcome;