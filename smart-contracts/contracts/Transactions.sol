// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

/** 
 * It's a class for the Transactions contract 
 * This contract is used to make a transfert and add the transaction to the block
*/
contract Transactions {
  /** A counter for transactions */
  uint256 transactionCount;

  /** 
   * Event that will be called to make transfer after adding it to the block
   * @param from The sender address
   * @param receiver The receiver address
   * @param amount The amount to send to the receiver
   * @param message The message to send to the receiver
   * @param timestamp The date of the transfer
  */
  event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
  /** structure forto a transfer object*/
  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  /** Array of transaction struc */
  TransferStruct[] transactions;

  /**
   * This function add new block to the blockchain
   * @param receiver It's a payable adress
   * @param amount It's the amount to add 
   * @param message It's a string memory
   * @param keyword It's a string memory
   */
  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
    transactionCount += 1;
    /**
     * msg is global varible containing the sender by default
     * block is global varible containing the timestamp for the block by default
     */
    transactions.push(TransferStruct(msg.sender, receiver,amount, message, block.timestamp,keyword));

    /** Calling our Transfer event */
    emit Transfer(msg.sender, receiver,amount, message, block.timestamp,keyword);
  }

  /**
   * This view function return a list of TransferStruct from memory
   * @return TransferStruct[]
   */
  function getAllTransactions() public view returns(TransferStruct[] memory) {
    return transactions;
  }
    
  /**
   * This view function return the number of transactions
   * @return uint256
   */
  function getAllTransactionCount() public view returns(uint256){
    return transactionCount;
  }
}