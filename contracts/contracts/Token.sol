pragma solidity 0.8.12;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./GovernanceBadgeNFT.sol";
contract Token is ERC20Upgradeable, OwnableUpgradeable {

    uint public constant MAX_SUPPLY = 1000000000 ether;
    uint public constant GRANT_SUPPLY = 15000000 ether;
    uint public constant REWARD_SUPPLY = 85000000 ether;
    uint public minted_reward_tokens;
    uint public minted_grant_tokens;



    function initialize(string memory _name,string memory _symbol) initializer public {
        __ERC20_init(_name, _symbol);
        __Ownable_init();
    }

    
    function rewardContributors(address _to, uint _amount) public onlyOwner {
        require(minted_grant_tokens + _amount <= GRANT_SUPPLY, "Max supply reached");
        minted_grant_tokens += _amount;
        _mint(_to, _amount);
    }

    function reward(address to,uint _amount) public onlyOwner{
        require(minted_reward_tokens + _amount <= REWARD_SUPPLY, "Exceeding REWARD supply");
        minted_reward_tokens += _amount;
        _mint(to, _amount);
    }

}