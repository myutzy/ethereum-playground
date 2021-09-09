//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GM {
    string private lastGreeterNickname;

    constructor(string memory _greeterNickname) {
        console.log("Deploying GM with greeter nickname:", _greeterNickname);
        lastGreeterNickname = _greeterNickname;
    }

    function greeter() public view returns (string memory) {
        return lastGreeterNickname;
    }

    function greet(string memory _greeterNickname) public {
        console.log("Changing lastGreeterNickname from '%s' to '%s'", lastGreeterNickname, _greeterNickname);
        lastGreeterNickname = _greeterNickname;
    }
}
