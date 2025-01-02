/**
 * ./Transactions.json it's a copy of smart-contracts/artifacts/contracts/Transactions.sol/Transactions.json
 */
import ABI from './Transactions.json';

/*
* The address of the deployed contract.
* We get address by deploying the contract with the command
* npx hardhat ignition deploy ./ignition/modules/Transactions.js --network sepolia
*/
export const contractAddress = '0x214346884e8dF3AF122d229C06ACF697fD9C9798';

/**
 * After the deployement hardhat create a folder called artifact/contract that contain the abi(application binary interface)
 * We use this abi to interact with the contract within the blockchain and outside the blockchain
 */
export const contractABI = ABI.abi;

/**
 * 
 * @param {*} item 
 * @returns 
 */
export const sliceAddress = (item ) => {
  return `${item.slice(0,8)}...${item.slice(item.length - 12, )}`
};