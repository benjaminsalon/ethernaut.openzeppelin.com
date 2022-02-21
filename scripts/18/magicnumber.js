const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xa5103BD3928f8FaF5A10b1aea9807990FBC3348b"; // Address of the simple contract created CAN BE COMPUTED WITH keccak256(contractCreatorAddress, numberOfContractCreatedByContractCreator)
    contractName = "MagicNumber";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);

    solverAdress = "0x786a91b7cD40a863025287EE42C3050aA5F8D07E" //Deployed with solver.js

    let tx = await level.setSolver(solverAdress)
    let tr = await tx.wait()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
