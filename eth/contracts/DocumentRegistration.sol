pragma solidity ^ 0.5 .0;


contract Owners {

    function getOwners(address _ad) public view returns(bool) {}

}


contract Storage {

       Owners ownerContract;

        modifier onlyOwners() {
            require(ownerContract.getOwners(msg.sender));
                _;
        }



        struct Document {
                string name;
                string metadata;
                uint timestamp;
                address registrant;
                address signee;
                bytes32 hash;
                bool isEntity;
        }

        struct Registrant {
                string name;
                string description;
                address user;
                bool isEntity;
        }


        address payable public current;

        uint128[] public prices;

        Document[] public temporaryDocs;
        Document[] public documents;
        Registrant[] public registrants;

        mapping(bytes32 => Document) public temporaryRegistry;
        mapping(bytes32 => Document) public registry;

        mapping(address => Registrant) public verifiedAddress;

        mapping(address => mapping(uint32 => Document)) public userDocs;
        mapping(address => uint32) public docsPerUser;

        mapping(string => uint32) temporaryIndex;
        mapping(string => uint32) nameIndex;

        bool ownersSet;

        event DocumentIndex(uint index);
}


contract DocumentRegistration is Storage {



        function setOwnerContract(address _ownerContract) public {
                require(ownersSet == false);
                ownerContract = Owners(_ownerContract);
                ownersSet = true;
        }


        function setPrices(uint128 _price1, uint128 _price2, uint128 _price3, uint128 _price4) public onlyOwners {
                uint64 p = 1 ether/10000;
                prices.push(_price1 * p);
                prices.push(_price2 * p);
                prices.push(_price3 * p);
                prices.push(_price4 * p);
        }

        function setPrice(uint8 _index, uint128 _price) public onlyOwners {
                prices[_index] = _price * 1 ether;
        }

        function setCurrent(address payable _current) public onlyOwners {
                current = _current;
        }

        function registerDocument(
                string memory _name,
                string memory _metadata,
                bytes32 _fileHash
        )
        public
        payable {
                require(msg.value == prices[1]);
                current.transfer(msg.value);
                bytes32 hash = keccak256(abi.encodePacked(_name, nameIndex[_name]));
                userDocs[msg.sender][docsPerUser[msg.sender]] = registry[hash] = Document(
                        _name,
                        _metadata,
                        block.timestamp,
                        msg.sender,
                        address(0),
                        _fileHash,
                        true
                );
                documents.push(Document(
                        _name,
                        _metadata,
                        block.timestamp,
                        msg.sender,
                        address(0),
                        _fileHash,
                        true
                ));
                nameIndex[_name]++;
                docsPerUser[msg.sender]++;
                emit DocumentIndex(nameIndex[_name] - 1);
        }

        function registerMultiSig(
                string memory _name,
                string memory _metadata,
                bytes32 _fileHash,
                address _signee
        )
        public
        payable {
                require(msg.value == prices[2] / 2);
                current.transfer(msg.value);
                bytes32 hash = keccak256(abi.encodePacked(_name, temporaryIndex[_name])); // temporaryIndex is separate from nameIndex
                temporaryRegistry[hash] = Document(
                        _name,
                        _metadata,
                        block.timestamp,
                        msg.sender,
                        _signee,
                        _fileHash,
                        true
                );
                temporaryDocs.push(Document(
                        _name,
                        _metadata,
                        block.timestamp,
                        msg.sender,
                        _signee,
                        _fileHash,
                        true
                ));
                temporaryIndex[_name]++; // Allow temporary registrations under the same name
                emit DocumentIndex(temporaryIndex[_name] - 1);
        }

        function signDocument(string memory _name, uint32 _temporaryIndex) public payable returns(uint) {
                require(msg.value == prices[2] / 2);
                current.transfer(msg.value);
                bytes32 temporaryHash = keccak256(abi.encodePacked(_name, _temporaryIndex));
                bytes32 permanentHash = keccak256(abi.encodePacked(_name, nameIndex[_name]));
                require(registry[permanentHash].isEntity == false);
                require(temporaryRegistry[temporaryHash].isEntity);
                address signee = temporaryRegistry[temporaryHash].signee;
                require(signee == msg.sender);
                // Next line could be flawed - not registering for one
                userDocs[signee][docsPerUser[signee]] = userDocs[msg.sender][docsPerUser[msg.sender]] = registry[permanentHash] = Document(
                        temporaryRegistry[temporaryHash].name,
                        temporaryRegistry[temporaryHash].metadata,
                        block.timestamp,
                        temporaryRegistry[temporaryHash].registrant,
                        signee,
                        temporaryRegistry[temporaryHash].hash,
                        true
                );
                documents.push(Document(
                        temporaryRegistry[temporaryHash].name,
                        temporaryRegistry[temporaryHash].metadata,
                        block.timestamp,
                        temporaryRegistry[temporaryHash].registrant,
                        signee,
                        temporaryRegistry[temporaryHash].hash,
                        true
                ));
                nameIndex[_name]++;
                docsPerUser[signee]++;
                docsPerUser[msg.sender]++;
                emit DocumentIndex(nameIndex[_name] - 1);
        }

        function registerAddress(
                string memory _name,
                string memory _description
        )
        public
        payable {
                require(msg.value == prices[1]);
                current.transfer(msg.value);
                verifiedAddress[msg.sender] = Registrant(
                        _name,
                        _description,
                        msg.sender,
                        true);
                registrants.push(Registrant(_name, _description, msg.sender, true));
        }

        function updateInfo(
                string memory _name,
                string memory _description
        )
        public
        payable {
                require(msg.value == prices[3]);
                require(verifiedAddress[msg.sender].isEntity);
                current.transfer(msg.value);
                verifiedAddress[msg.sender].name = _name;
                verifiedAddress[msg.sender].description = _description;
                registrants.push(Registrant(_name, _description, msg.sender, true));
        }

        function verifyDocument(string memory _name, uint32 _nameIndex, bytes32 _fileHash) public view returns(bool) {
                bytes32 hash = keccak256(abi.encodePacked(_name, _nameIndex));
                if (registry[hash].hash == _fileHash) {
                        return true;
                } else {
                        return false;
                }
        }


}
