const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xCa1d7F88C2e705D3f9308cF89F878EA075Ef673c";
    contractName = "Shop";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    // const level = await Level.attach(levelAddress);
    const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);
    const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    const attacker = await Attacker.deploy(level.address);
    console.log(`Attacker at ${attacker.address}`);

    
    tx = await attacker.attack();
    tr = await tx.wait();
    price = await level.price();
    console.log(price);
    //the instructions 
    // if (_buyer.price() >= price && !isSold) {
    //  isSold = true;
    // takes about 1075033 - (1077893 - 1075033) - 1049474 = 22699
    

    
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
