const { ethers } = require('hardhat')

async function main() {
    const Contract = await ethers.getContractFactory('CRPFactory', {
        libraries: {
            BalancerSafeMath: "0xcCB0de80FcDaFA8e7538734372fe6dA73ecFe0eb",
            RightsManager: "0x102B314B6E4641438Df11a4C3696AECf4a8bD227",
            SmartPoolManager: "0x6EE05C8D26807e7CEF92637d8CB123a934D04B4D",
        }
    });
    const contract = await Contract.deploy();
    console.log("CRPFactory deployed to " + contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });