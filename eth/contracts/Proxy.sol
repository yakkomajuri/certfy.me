pragma solidity^0.5.0;

contract Owners {

    function getOwners(address _ad) public view returns(bool) {}

}

contract Proxy {

    constructor(address _ownerContract) public payable {
        assembly {
            sstore(0xfffffffffffffffffffffffffffffffffffffffe, _ownerContract)
        }
    }

    function setImplementation(address _impl) public {
        address cont;
        Owners ownerContract;
        assembly {
            cont := sload(0xfffffffffffffffffffffffffffffffffffffffe)
        }
        ownerContract = Owners(cont);
        require(ownerContract.getOwners(msg.sender));
        assembly {
            sstore(0xffffffffffffffffffffffffffffffffffffffff, _impl)
        }
    }

    function () external payable {
        address localImpl;
        assembly {
            localImpl := sload(0xffffffffffffffffffffffffffffffffffffffff)
        }
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)
            let result := delegatecall(gas, localImpl, ptr, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }

    function getImplementation() public view returns(address) {
        address implementation;
        assembly {
           implementation := sload(0xffffffffffffffffffffffffffffffffffffffff)
        }
        return implementation;
    }

}
