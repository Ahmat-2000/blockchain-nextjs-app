'use client';

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from '@/utils/constant.js';

export const TransactionsContext = React.createContext({});

/**
 * Create the Ethereum contract instance
 */
const createEthereumContract = async () => {
  try {
    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults");
      return ethers.getDefaultProvider();
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } catch (error) {
    console.error("Error creating Ethereum contract:", error);
    throw new Error("Failed to create Ethereum contract");
  }
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);

  /**
   * Handle form input changes.
   */
  const handleFormChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  /**
   * Fetch all transactions from the contract.
   */
  const getAllTransactions = async (contract) => {
    try {
      const transactions = await contract.getAllTransactions();
      setAllTransactions(transactions.map((tx) => ({
        addressFrom: tx[0],
        addressTo: tx[1],
        amount: parseInt(tx[2]) / 10 ** 18,
        message: tx[3],
        timestamp: new Date(parseInt(tx[4]) * 1000).toLocaleString(),
        keyword: tx[5],
      })));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  /**
   * Fetch the total number of transactions from the contract.
   */
  const getTransactionCount = async (contract) => {
    try {
      const count = await contract.getAllTransactionCount();
      setTransactionCount(count);
      window.localStorage.setItem("transactionCount", count);
    } catch (error) {
      console.error("Error fetching transaction count:", error);
    }
  };

  /**
   * Check if a wallet is connected and setup listeners for account changes.
   */
  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        const contract = await createEthereumContract();
        await getAllTransactions(contract);
        await getTransactionCount(contract);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }

    window.ethereum.on("accountsChanged", handleAccountChange);
  };

  /**
   * Handle account changes in MetaMask.
   */
  const handleAccountChange = (accounts) => {
    if (!accounts.length) {
      setCurrentAccount(null);
      console.log("Wallet disconnected");
    } else {
      setCurrentAccount(accounts[0]);
      console.log(`Switched to account: ${accounts[0]}`);
    }
  };

  /**
   * Connect to MetaMask wallet.
   */
  const connectToWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        const contract = await createEthereumContract();
        await getAllTransactions(contract);
        await getTransactionCount(contract);
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  /**
   * Send a transaction to the Ethereum blockchain.
   */
  const sendTransaction = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      const { addressTo, amount, keyword, message } = formData;
      const contract = await createEthereumContract();
      const parsedAmount = ethers.parseEther(amount);

      setIsLoading(true);

      // Send transaction
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208',
          value: parsedAmount.toHexString(),
        }],
      });

      // Add to blockchain
      const txHash = await contract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      console.log(`Transaction Hash: ${txHash.hash}`);
      await txHash.wait();

      // Update transaction count and reload
      const count = await contract.getAllTransactionCount();
      setTransactionCount(count);
      window.location.reload();
    } catch (error) {
      console.error("Error sending transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  }, []);

  return (
    <TransactionsContext.Provider value={{
      currentAccount,
      formData,
      isLoading,
      transactionCount,
      allTransactions,
      connectToWallet,
      setFormData,
      handleFormChange,
      sendTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};
