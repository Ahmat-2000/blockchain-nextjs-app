/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, {useContext} from "react";
import { TransactionsContext } from "@/context/TransactionContext";
import dummyData from '@/utils/dummyData';
const Transactions = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentAccount } : any = useContext(TransactionsContext);
  return (
    <div className="">
      <div className="">
        { currentAccount ? (
          <h3 className="text-3xl text-center my-2">Latest Transactions</h3>
          ) 
          : (
          <h3 className="text-3xl text-center my-2">Connect your account to see the latest transactions</h3>
          )

        }
      </div>
    </div>
  )
};

export default Transactions;