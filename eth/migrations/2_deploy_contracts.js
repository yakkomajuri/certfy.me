var Contract1 = artifacts.require("./Proxy.sol");
var Contract2 = artifacts.require("./Owners.sol");
var Contract3 = artifacts.require("./DocumentRegistration.sol");

module.exports = function(deployer) {
    deployer.deploy(Contract1).then(function(instance) {
        deployer.deploy(Contract2, "web3.eth.accounts[1]", "web3.eth.accounts[2]");
    }).then(function(instance) {
        return deployer.deploy(Contract3);
    });
}
