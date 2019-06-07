pragma solidity^0.5.0;


// Owners contract coordinates who can upgrade the implementation
contract Owners {

    function getOwners(address _ad) public view returns(bool) {}

}

// Delegates all calls to the application smart contract
contract Proxy {

    // Determines address of Owners Contract
    constructor(address _ownerContract) public payable {
        assembly {
            // Store address at penultimate slot of storage stack to prevent collisions
            sstore(0xfffffffffffffffffffffffffffffffffffffffe, _ownerContract)
        }
    }
    
    // Set the contract to receive the delegated call
    function setImplementation(address _impl) public {
        address cont;
        Owners ownerContract;
        assembly {
            // Loads address of Owners contract from storage
            cont := sload(0xfffffffffffffffffffffffffffffffffffffffe)
        }
        ownerContract = Owners(cont);
        // Checks that the msg.sender is a desginated owner in Owners contract
        require(ownerContract.getOwners(msg.sender));
        assembly {
            // Store implementation at last slot of storage stack
            sstore(0xffffffffffffffffffffffffffffffffffffffff, _impl)
        }
    }

    // Fallback function - Delegates call
    function () external payable {
        address localImpl;
        assembly {
            // Loads implementation address from storage
            localImpl := sload(0xffffffffffffffffffffffffffffffffffffffff)
        }
        assembly {
            let ptr := mload(0x40)
            // Copies all data used to call the contract
            calldatacopy(ptr, 0, calldatasize)
            // Calls implementation contract and assigns the result to var 'result'
            let result := delegatecall(gas, localImpl, ptr, calldatasize, 0, 0)
            let size := returndatasize
            
            // Copies return data and stores it in Proxy contract
            returndatacopy(ptr, 0, size)
            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }

    // Informs what the current implementation address is
    function getImplementation() public view returns(address) {
        address implementation;
        assembly {
           implementation := sload(0xffffffffffffffffffffffffffffffffffffffff)
        }
        return implementation;
    }

}
