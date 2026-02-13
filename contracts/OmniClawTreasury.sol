// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address user) external view returns (uint256);
}

contract OmniClawTreasury {
    IERC20 public gmmcToken;
    address public treasury;

    constructor(address _token, address _treasury) {
        gmmcToken = IERC20(_token);
        treasury = _treasury;
    }

    function payTask(address user, uint256 amount) external {
        require(gmmcToken.balanceOf(user) >= amount, "Not enough GMMC");
        gmmcToken.transferFrom(user, treasury, amount);
    }
}
