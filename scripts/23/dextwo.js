const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0xaB74E2f62742b382293B0eb023D5D00B92Ca5748";
    contractName = "DexTwo";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);
    const FakeToken = await hre.ethers.getContractFactory('FakeToken');
    const fakeToken = await FakeToken.deploy(level.address);
    console.log(`FakeToken at ${fakeToken.address}`);
    let token1address = await level.token1();
    let token2address = await level.token2();
    const token1 = await hre.ethers.getContractAt("IERC20",token1address);
    const token2 = await hre.ethers.getContractAt("IERC20",token2address);
    
    console.log(`Token1 at address ${token1.address}`);
    console.log(`Token2 at address ${token2.address}`);


    let balanceDexToken1 = await token1.balanceOf(level.address);
    let balanceDexToken2 = await token2.balanceOf(level.address);
    let balanceUserToken1 = await token1.balanceOf(account.address);
    let balanceUserToken2 = await token2.balanceOf(account.address);

    console.log(`BalanceDexToken1 ${balanceDexToken1}`);
    console.log(`BalanceDexToken2 ${balanceDexToken2}`);

    tx = await level.approve(level.address,5000);
    tr = await tx.wait();

    // tx = await fakeToken.approve(level.address,1000);
    // tr = await tx.wait();

    tx = await level.swap(fakeToken.address,token1.address,1);
    tr = await tx.wait()

    tx = await level.swap(fakeToken.address,token2.address,1);
    tr = await tx.wait()
    
    balanceDexToken1 = await token1.balanceOf(level.address);
    balanceDexToken2 = await token2.balanceOf(level.address);

    console.log(`BalanceDexToken1 ${balanceDexToken1}`);
    console.log(`BalanceDexToken2 ${balanceDexToken2}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
