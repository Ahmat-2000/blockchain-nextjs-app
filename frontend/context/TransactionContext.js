'use client';

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from '@/utils/constant.js';

export const TransactionsContext = React.createContext({});

/**
 * Create the Ethereum contract instance
 */
const createEthereumContract = async () => {
  let signer = null;
  let provider;

  if (window.ethereum == null) {
    /**
     * If MetaMask is not installed, use the default provider.
     * This provides read-only access to the blockchain.
     */
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    /**
     * Connect to the MetaMask provider.
     * This allows read and write operations via MetaMask.
     */
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }

  /**
   * Create a contract instance to interact with the Ethereum network.
   */
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionContract;
};

/**
 * This file should be .tsx
 * @param {*} param0 
 * @returns 
 */
export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);

  /**
   * Handle form input changes.
   */
  const handleformChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please install MetaMask");
      }
      const transactionContract = await createEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();
      setAllTransactions(availableTransactions.map((transaction) => ({
        addressFrom : transaction[0],
        addressTo : transaction[1],
        amount : parseInt(transaction[2]) / 10**18,
        message : transaction[3],
        timestamp : new Date(parseInt(transaction[4]) * 1000).toLocaleString(),
        keyword : transaction[5],
      })));
      
      console.log(availableTransactions);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  /**
   * Check if a wallet is connected and retrieve the current account.
   */
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please install MetaMask");
      }
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts);
      
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions()
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await createEthereumContract();
      const count = await transactionContract.getAllTransactionCount();

      window.localStorage.setItem("transactionCount",count)
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Connect to the wallet.
   */
  const connectToWallet = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please install MetaMask");
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Send a transaction to the Ethereum blockchain.
   */
  const sentTransaction = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please install MetaMask");
      }

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = await createEthereumContract();
      const parseAmount = '0x' + ethers.parseEther(amount).toString(16);

      /**
       * Create the transaction on Ethereum.
       */
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 Gwei = 0.00001 ether
          value: parseAmount, // Amount in hexadecimal format
        }],
      });

      /**
       * Store the transaction on the blockchain.
       */
      const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const count = await transactionContract.getAllTransactionCount();
      setTransactionCount(count);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Check wallet connection on mount.
   */
  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionsExist();
  }, []);

/**
 * Handle account changes in MetaMask
 */
useEffect(() => {
  ethereum?.on("accountsChanged", handleAccountChange);
  return () => {
    ethereum?.removeListener("accountsChanged", handleAccountChange);
  };
}, []);

const handleAccountChange = (accounts) => {
  // Check if accounts array is passed
  if (!accounts || accounts.length === 0) {
    console.log("Please connect to MetaMask");
    // Handle disconnection logic, if needed
    setCurrentAccount(null); // Clear current account
  } else if (accounts[0] !== currentAccount) {
    // Update the current account if it has changed
    setCurrentAccount(accounts[0]); // Update state
    console.log(`Switched to account: ${accounts[0]}`);
  }
};

  return (
    <TransactionsContext.Provider value={{
      currentAccount,
      formData,
      isLoading,
      transactionCount,
      allTransactions,
      connectToWallet,
      setFormData,
      handleformChange,
      sentTransaction,
      setAllTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};
