'use client';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./Loader";

type inputType = {
  placeholder: string;
  value: string;
  name: string;
  type: string;
  handelChange: () => void
};

const Input: React.FC<inputType> = ({placeholder, name, type, handelChange, value}) => {
  return(
    <input 
      className="my-2 w-full rounded-md p-2 outline-none shadow-slate-600 bg-transparent shadow-sm border-none text-sm white-glassmorphism"
      name={name} value={value} 
      placeholder={placeholder} 
      type={type} 
      step="0.0001"
      onChange={handelChange}
    />
  );
};

const Welcome: React.FC = (): React.JSX.Element => {
  const marketList = ["Binance","CoinMarketCap","Blockchain","CoinBase","ECNCapital","Principal"];
  const connectToWallet = () => {
    // todo
  };
  const handleSubmit = () => {};
  return (

    <div className="flex flex-col gap-10 py-5 pl-4 pr-3 md:py-20 md:flex-row md:justify-between " >
      <div className="flex flex-col gap-10">

        <h1 className="text-4xl text-gradient py-1 sm:text-5xl">
          Buy and sell <br /> trusted Crypto
        </h1>

        <p className="w-full text-left font-light sm:w-9/12 text-base">
          Explore the world of crypto. Buy and sell crypto coins easily, trust Cryptoon to be your partner in the crypto market.
        </p>

        <button className="flex flex-row items-center gap-x-2 p-3 cursor-pointer w-max rounded-xl bg-blue-600 hover:opacity-75 transition-opacity duration-200" onClick={connectToWallet}>
          <AiFillPlayCircle fontSize={20} />
          <span className="text-base font-semibold">Let&apos;s get started</span>
        </button>

        <div className="grid grid-flow-row grid-cols-2 mt-10 border-l border-t border-gray-500 sm:w-[90%]  sm:grid-cols-3 border-collapse">
          {
            marketList.map((item, index) => 
              <span 
                className={`text-center text-sm font-light py-4 border-gray-500 border-r border-b `} 
                key={index}
              >
                {item}
              </span>)
          }
        </div>
      
      </div>

      <div className="flex flex-col w-full justify-start sm:w-auto sm:flex-row gap-5 md:flex-col">

        <div className="flex flex-col justify-between rounded-xl p-2 min-[480px]:max-w-[400px] sm:w-[80%] sm:order-2 md:order-1 md:w-96 h-[200px] eth-card shadow-teal-400 shadow-md ">
            <div className="flex justify-between items-center ">
              <SiEthereum fontSize={30} className="border-2 rounded-full p-1" color="white"/>
              <BsInfoCircle fontSize={17} color="white"/>
            </div>
            
            <div className=" flex flex-col gap-2 ">
              <p className="text-sm ">
                0x12adezd1scds3qsc2cqcD1ccez
              </p>
              <span className="font-semibold text-lg">Ethereum</span>
            </div>
        </div>

        <form className="flex flex-col justify-start items-center w-full rounded-lg blue-glassmorphism border p-5 md:w-96 md:order-2">
         <Input name="address" value="" placeholder="Address To" type="text" handelChange={() => {}}/>
         <Input name="amount" value="" placeholder="Amount (ETH)" type="number" handelChange={() => {}}/>
         <Input name="keyword" value="" placeholder="Keyword (GIFT)" type="text" handelChange={() => {}}/>
         <Input name="message" value="" placeholder="Enter Message" type="text" handelChange={() => {}}/>
         <div className="h-[1px] w-full bg-gray-600 my-2" />

         {
          false ? 
          <Loader /> 
          : 
          <button type="button" onClick={handleSubmit} className="w-full mt-2 border-[1px] p-2 border-gray-600 cursor-pointer rounded-lg hover:bg-slate-300 text-black transition-colors duration-500 bg-slate-400">
            Send Now
          </button>
         }
        </form>
      </div>

    </div>
      
  )
}

export default Welcome;