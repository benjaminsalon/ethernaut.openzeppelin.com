const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x97FAFA2b13b3B43C067AC03c4227C516167Ec67F"; // Address of the simple contract created CAN BE COMPUTED WITH keccak256(contractCreatorAddress, numberOfContractCreatedByContractCreator)
    contractName = "SimpleToken";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);
    let tx = await level.destroy(account.address)
    let tr = await tx.wait()


    // result = await level.balanceOf(account.address);
    // console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
