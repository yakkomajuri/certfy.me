pragma solidity^0.5.0;

contract Owners {

    modifier onlyOwners() {
        require(isOwner[msg.sender]);
        _;
    }

    Owners ownerContract;

    constructor(address _owner1, address _owner2) public {
        isOwner[msg.sender] = true;
        isOwner[_owner1] = true;
        isOwner[_owner2] = true;
        numberOfVoters = 3;
    }

    mapping(address => bool) isOwner;
    mapping(address => mapping(address => bool)) hasVotedToAdd;
    mapping(address => mapping(address => bool)) hasVotedToRemove;
    mapping(address => uint8) public votesToAdd;
    mapping(address => uint8) public votesToRemove;

    uint8 public numberOfVoters;

    function voteToAdd(address _ad) public onlyOwners {
        require(hasVotedToAdd[msg.sender][_ad] == false,
        "this");
        require(isOwner[_ad] == false,
        "that");
        hasVotedToAdd[msg.sender][_ad] = true;
        votesToAdd[_ad]++;
        enoughVotesToAdd(_ad);
    }

    function voteToRemove(address _ad) public onlyOwners {
        require(hasVotedToRemove[msg.sender][_ad] == false);
        require(isOwner[_ad]);
        hasVotedToRemove[msg.sender][_ad] = true;
        votesToRemove[_ad]++;
        enoughVotesToRemove(_ad);
    }

    function removeMyVote(address _ad, uint8 _choice) public onlyOwners {
        if (_choice == 0) {
            require(hasVotedToAdd[msg.sender][_ad]);
            hasVotedToAdd[msg.sender][_ad] = false;
            votesToAdd[_ad]--;
        }
        if (_choice == 1) {
            require(hasVotedToRemove[msg.sender][_ad]);
            hasVotedToRemove[msg.sender][_ad] = false;
            votesToRemove[_ad]--;
        }
    }

    function enoughVotesToAdd(address _ad) internal {
        if (votesToAdd[_ad] * 2 > numberOfVoters) {
            numberOfVoters += 1;
            isOwner[_ad] = true;
        }
        else { }
    }

    function enoughVotesToRemove(address _ad) internal {
        if (votesToRemove[_ad] * 2 > numberOfVoters) {
            numberOfVoters -= 1;
            isOwner[_ad] = false;
        }
        else { }
    }

    function getOwners(address _ad) external view returns(bool) {
        return isOwner[_ad];
    }

}
