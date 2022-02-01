// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract AttackerPreservation{

    uint address1;
    uint address2;
    uint toChangeForOwnerShip;

    constructor() {
        address1 = 0;
        address2 = 0;
        toChangeForOwnerShip = 0;
    }

    function setTime(uint _time) public {
    toChangeForOwnerShip = _time;
    }
}