const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    
    abi=[
        {
          "inputs": [],
          "name": "whatIsTheMeaningOfLife",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        }
      ]

    bytecode="0x608060405234801561001057600080fd5b50600a8061001f6000396000f3fe602a60505260206050f3";
            //CODE FOR DEPLOYMENT.....................##......................CODE OF THE ACTUAL CONTRACT
                                                  //  ## is the byte for the size of the future contract
    //PUSH1 2a
    //PUSH1 50
    //MSTORE
    //PUSH1 20
    //PUSH1 50
    //RETURN -> 602a60505260206050f3
    const account = await hre.ethers.getSigner();
    console.log(`Working with account ${account.address}`);
    const Solver = await hre.ethers.getContractFactory(abi,bytecode,account);
    // const solver = await Solver.attach("0x0D04792Bdc93f4D5E888c8F501c40D908587fE99");
    const solver = await Solver.deploy();
    console.log(`Solver at address ${solver.address}`);
    
    result = await solver.whatIsTheMeaningOfLife();
    console.log(result);
    

    
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
