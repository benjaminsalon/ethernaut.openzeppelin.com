// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IPrivacy{

  function unlock(bytes16 _key) external;
}


contract AttackerPrivacy{

    IPrivacy victim;
    bytes16 key;

    constructor(address _victim, bytes32 _key) payable {
        victim = IPrivacy(_victim);
        key = bytes16(_key);
    }


    function attack() public {
        victim.unlock(key);
    }
}