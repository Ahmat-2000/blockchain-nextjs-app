'use client';

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from '@/utils/constant.js';

export const TransactionsContext = React.createContext({});

/**
 * Get the Ethereum contract instance
 */
const getEthereumContract = async () => {
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

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(null);

  /**
   * Handle form input changes.
   */
  const handleformChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  /**
   * Check if a wallet is connected and retrieve the current account.
   */
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please install MetaMask");
      }
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // TODO: Fetch transactions
        window.localStorage.setItem("transactionCount", "0"); //todo
        setTransactionCount(window.localStorage?.getItem('transactionCount'));
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

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
      throw new Error("No Ethereum object.");
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
      const transactionContract = await getEthereumContract();
      const parseAmount = '0x' + ethers.parseEther(amount).toString(16);

      /**
       * Create the transaction on Ethereum.
       */
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 Gwei
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
      throw new Error("No Ethereum object.");
    }
  };

  /**
   * Check wallet connection on mount.
   */
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionsContext.Provider value={{
      currentAccount,
      formData,
      isLoading,
      connectToWallet,
      setFormData,
      handleformChange,
      sentTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};
