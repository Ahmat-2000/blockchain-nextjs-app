// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

/** 
 * It's a Contract for the Transactions contract 
 * This contract is used to make a transfert and add the transaction to the block
 * A contract is similar to class in c++ POO
*/
contract Transactions {
  /** A counter for transactions */
  uint256 transactionCount;

  /** 
   * An event that will be called to make transfer after adding it to the block
   * @param from The sender address
   * @param receiver The receiver address
   * @param amount The amount to send to the receiver
   * @param message The message to send to the receiver
   * @param timestamp The date of the transfer
  */
  event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
  /** structure for a transfer object */
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
/* Sources
  https://www.tutorialspoint.com/solidity/solidity_quick_guide.htm
  https://www.tutorialspoint.com/solidity/solidity_error_handling.htm
  https://www.youtube.com/watch?v=S370k61NJ0o&list=PLBV4f2pTYexqgdiVpLOWlF-E5sTLPimot&index=37
  https://www.youtube.com/watch?v=Wn_Kb3MR_cU
*/
 
/* Solidity - Contracts
  Contract in Solidity is similar to a Class in C++. A Contract have following properties.
  - Constructor − A special function declared with constructor keyword which will be executed once per contract and is invoked when a contract is created.
  - State Variables − Variables per Contract to store the state of the contract.
  - Functions − Functions per Contract which can modify the state variables to alter the state of a contract.

  Visibility Quantifiers
   Following are various visibility quantifiers for functions/state variables of a contract : 
    - external : External functions are meant to be called by other contracts. They cannot be used for internal call. To call external function within contract this.function_name() call is required. State variables cannot be marked as external.
    - public : Public functions/ Variables can be used both externally and internally. For public state variable, Solidity automatically creates a getter function.
    - internal : Internal functions/ Variables can only be used internally or by derived contracts.
    - private : Private functions/ Variables can only be used internally and not even by derived contracts.

  Solidity - Inheritance
   Inheritance is a way to extend functionality of a contract. Solidity supports both single as well as multiple inheritance. Following are the key highlighsts.

    A derived contract can access all non-private members including internal methods and state variables. But using this is not allowed.

    Function overriding is allowed provided function signature remains same. In case of difference of output parameters, compilation will fail.

    We can call a super contract's function using super keyword or using super contract name.

    In case of multiple inheritance, function call using super gives preference to most derived contract.

  Solidity - Abstract Contracts
   Abstract Contract is one which contains at least one function without any implementation. Such a contract is used as a base contract. Generally an abstract contract contains both implemented as well as abstract functions. Derived contract will implement the abstract function and use the existing functions as and when required.

   In case, a derived contract is not implementing the abstract function then this derived contract will be marked as abstract.

  Solidity - Interfaces
   Interfaces are similar to abstract contracts and are created using interface keyword. Following are the key characteristics of an interface.
    - Interface can not have any function with implementation.
    - Functions of an interface can be only of type external.
    - Interface can not have constructor.
    - Interface can not have state variables.
    - Interface can have enum, structs which can be accessed using interface name dot notation.

  Solidity - Libraries
   Libraries are similar to Contracts but are mainly intended for reuse. A Library contains functions which other contracts can call. Solidity have certain restrictions on use of a Library. Following are the key characteristics of a Solidity Library.
    - Library functions can be called directly if they do not modify the state. That means pure or view functions only can be called from outside the library.
    - Library can not be destroyed as it is assumed to be stateless.
    - A Library cannot have state variables.
    - A Library cannot inherit any element.
    - A Library cannot be inherited.

  Solidity - Events
   Event is an inheritable member of a contract. An event is emitted, it stores the arguments passed in transaction logs. These logs are stored on blockchain and are accessible using address of the contract till the contract is present on the blockchain. An event generated is not accessible from within contracts, not even the one which have created and emitted them.
   An event can be declared using event keyword.
   //Declare an Event
   event Deposit(address indexed _from, bytes32 indexed _id, uint _value);
   //Emit an event
   emit Deposit(msg.sender, _id, msg.value);
*/

/* Solidity - View Function 
 View functions ensure that they will not modify the state. A function can be declared as view. The following statements if present in the function are considered modifying the state and compiler will throw warning in such cases.

  - Modifying state variables.
  - Emitting events.
  - Creating other contracts.
  - Using selfdestruct.
  - Sending Ether via calls.
  - Calling any function which is not marked view or pure.
  - Using low-level calls.
  - Using inline assembly containing certain opcodes.

  Getter method are by default view functions.
 */

/* Solidity - Pure Functions 
 Pure functions ensure that they not read or modify the state. A function can be declared as pure. The following statements if present in the function are considered reading the state and compiler will throw warning in such cases.

  - Reading state variables.
  - Accessing address(this).balance or <address>.balance.
  - Accessing any of the special variable of block, tx, msg (msg.sig and msg.data can be read).
  - Calling any function not marked pure.
  - Using inline assembly that contains certain opcodes.

  Pure functions can use the revert() and require() functions to revert potential state changes if an error occurs.
 */

/* Solidity - Cryptographic Functions 
 Solidity provides inbuilt cryptographic functions as well. Following are important methods −
  - keccak256(bytes memory) returns (bytes32) − computes the Keccak-256 hash of the input.
  - ripemd160(bytes memory) returns (bytes20) − compute RIPEMD-160 hash of the input.
  - sha256(bytes memory) returns (bytes32) − computes the SHA-256 hash of the input.
  - ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address) − recover the address associated with the public key from elliptic curve signature or return zero on error. The function parameters correspond to ECDSA values of the signature: r - first 32 bytes of signature; s: second 32 bytes of signature; v: final 1 byte of signature. This method returns an address.
 */
