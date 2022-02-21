const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x336Bd06C0e51c9e508081bA9961fAE3aD2e5eBf4";
    contractName = "GatekeeperTwo";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);

    let result = await level.entrant();
    console.log(result);
    const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    const attacker = await Attacker.deploy(level.address);
    // const attacker = await Attacker.attach("0x0B6f113d2EF95832f498a45E1273d4E5542AC13F");
    console.log(`Attacker at ${attacker.address}`);

    result = await level.entrant();
    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
