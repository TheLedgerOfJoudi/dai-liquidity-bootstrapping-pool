const {ethers} = require('hardhat')

async function main() {
    const Contract = await ethers.getContractFactory('SafeApprove');
    const contract = await Contract.deploy();
    console.log("SafeApprove deployed to " + contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });