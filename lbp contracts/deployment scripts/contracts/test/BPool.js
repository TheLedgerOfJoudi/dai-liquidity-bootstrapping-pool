const {ethers} = require('hardhat')

async function main() {
    const Contract = await ethers.getContractFactory('BPool');
    const contract = await Contract.deploy();
    console.log("Bpool deployed to " + contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });