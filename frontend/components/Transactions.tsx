/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useContext } from 'react';
import { TransactionsContext } from '@/context/TransactionContext';
import { sliceAddress } from '@/utils/constant';

const Transactions = () => {
  const { currentAccount, allTransactions }: any = useContext(TransactionsContext);

  return (
    <div className="p-5">
      {currentAccount && (
        <>
          <h3 className="text-3xl sm:text-5xl text-center my-10">Latest Transactions</h3>
          <div
            className="grid grid-cols-1 gap-5
                        md:grid-cols-2 sm:w-4/5 lg:w-auto
                       lg:grid-cols-3 
                       mx-auto">
            {allTransactions.map((item: any, index: number) => (
              <div
                className="flex flex-col p-3 gap-2 rounded-md border border-cyan-900 
                           shadow-md shadow-cyan-500 w-full "
                key={index}
              >
                <span>From: {sliceAddress(item.addressFrom)}</span>
                <span>To: {sliceAddress(item.addressTo)}</span>
                <span>Amount: {item.amount}</span>
                <span>Keyword: {item.keyword}</span>
                <span>Message: {item.message}</span>
                <span>Time: {item.timestamp}</span>
                <span>
                  <a
                    href={`https://sepolia.etherscan.io/address/${item.addressFrom}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Transaction
                  </a>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
