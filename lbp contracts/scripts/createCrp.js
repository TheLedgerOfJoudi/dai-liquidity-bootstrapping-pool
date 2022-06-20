const { ethers } = require('hardhat');
const fs = require('fs');
const web3 = require("web3");

async function createCrp() {
    const [signer] = await ethers.getSigners();
    let file = fs.readFileSync('../artifacts/contracts/CRPFactory.sol/CRPFactory.json');
    let abi = JSON.parse(file);
    abi = abi.abi;
    const factory = await new ethers.Contract(
        "0xcb5A8717c47359982d3576724bf8dC789DeccD21",
        abi,
        signer);

    const startWeights = [web3.utils.toWei('32'), web3.utils.toWei('8')];
    const startBalances = [web3.utils.toWei('4000'), web3.utils.toWei('1000')];
    const swapFee = 10 ** 15;

    const SYMBOL = 'LBP';
    const NAME = 'Balancer Pool Token';

    let TToken = await ethers.getContractFactory('TToken');

    xyz = await TToken.deploy('XYZ', 'Example Project Token', 18);
    dai = await TToken.deploy('DAI', 'Dai Stablecoin', 18);

    XYZ = xyz.address;
    DAI = dai.address;

    const permissions = {
        canPauseSwapping: false,
        canChangeSwapFee: false,
        canChangeWeights: true,
        canAddRemoveTokens: false,
        canWhitelistLPs: false,
        canChangeCap: false,
    };

    const poolParams = {
        poolTokenSymbol: SYMBOL,
        poolTokenName: NAME,
        constituentTokens: [XYZ, DAI],
        tokenBalances: startBalances,
        tokenWeights: startWeights,
        swapFee: swapFee,
    }

    const Pool = await ethers.getContractFactory('BPool');
    const pool = await Pool.deploy();

    await factory.newCrp(pool.address,
        poolParams,
        permissions
    );

    console.log("created!")
}


createCrp()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });