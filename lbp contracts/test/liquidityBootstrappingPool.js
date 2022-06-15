const { time } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');
const Decimal = require('decimal.js');
const web3 = require("web3");
const fs = require('fs');
const { utils } = require('web3');
// Refer to this article for background:
// https://medium.com/balancer-protocol/building-liquidity-into-token-distribution-a49d4286e0d4

describe('Liquidity Bootstrapping', () => {

    // describe('Factory_LBP (linear)', () => {
    //     let bFactory;
    //     let crpFactory;
    //     let controller;
    //     let CONTROLLER;
    //     let XYZ;
    //     let DAI;
    //     let dai;
    //     let xyz;
    //     let startBlock;

    //     /* A Liquidity Bootstrapping Pool normally has two tokens:
    //        A project token - here called XYZ, with initially no or low value
    //        And a collateral coin used to purchase it (usually a stable coin; DAI in this case)
    //        (It could theoretically have multiple collateral coins; see paper)
    //        We want to start by weighting it heavily toward the project token,
    //        to minimize the upfront capital required to create liquidity in the
    //        project token with low slippage. 
    //        Without this mechanism, a prohibitively large Dai starting balance would be 
    //        required to achieve acceptably low levels of price slippage. 
    //        Here we're starting with an 80/20% split. 
    //        The project token is at 80%: 32/(32 + 8) denormalized weights
    //        And Dai is 20%: 8/(32 + 8).
    //        This allows 4,000 project tokens (at $1), to be bootstrapped for $1,000 in DAI
    //        The total max denormalized weight is 50 - you could do 40/10, for instance
    //        However, if you're going to be updating weights manually, it's best to stay
    //        away from the "edges," and use a lower total, like 40. Otherwise it's possible
    //        the token transfers necessary to change the weights might fail due to ratio
    //        constraints, or having weights temporarily over the maximum.
    //     */

    //     const startWeights = [web3.utils.toWei('32'), web3.utils.toWei('8')];
    //     const startBalances = [web3.utils.toWei('4000'), web3.utils.toWei('1000')];
    //     const swapFee = 10 ** 15;
    //     let blockRange;

    //     before(async () => {
    //         let BFactory = await ethers.getContractFactory('BFactory');
    //         let BPool = await ethers.getContractFactory('BPool');
    //         let ConfigurableRightsPool = await ethers.getContractFactory('ConfigurableRightsPool', {
    //             libraries: {
    //                 BalancerSafeMath: "0xDFF2f28625Ef3fC6ae3b844149e00f33a90d5B45",
    //                 RightsManager: "0xd17E5BE419DB1B4459a27946993B636DA9957eDc",
    //                 SmartPoolManager: "0x51F6A3f6Bc0776719F1C5e6522c56B7A1968FbB0",
    //             },
    //         });
    //         let CRPFactory = await ethers.getContractFactory('CRPFactory', {
    //             libraries: {
    //                 BalancerSafeMath: "0xDFF2f28625Ef3fC6ae3b844149e00f33a90d5B45",
    //                 RightsManager: "0xd17E5BE419DB1B4459a27946993B636DA9957eDc",
    //                 SmartPoolManager: "0x51F6A3f6Bc0776719F1C5e6522c56B7A1968FbB0",
    //             },
    //         });
    //         let TToken = await ethers.getContractFactory('TToken');

    //         const accounts = await ethers.getSigners();

    //         const admin = accounts[0].address;
    //         const { toWei, fromWei } = web3.utils;

    //         const MAX = web3.utils.toTwosComplement(-1);
    //         const SYMBOL = 'LBP';
    //         const NAME = 'Balancer Pool Token';

    //         const permissions = {
    //             canPauseSwapping: false,
    //             canChangeSwapFee: false,
    //             canChangeWeights: true,
    //             canAddRemoveTokens: false,
    //             canWhitelistLPs: false,
    //             canChangeCap: false,
    //         };
    //         bFactory = await BFactory.deploy();
    //         crpFactory = await CRPFactory.deploy();
    //         xyz = await TToken.deploy('XYZ', 'Example Project Token', 18);
    //         dai = await TToken.deploy('Dai Stablecoin', 'DAI', 18);

    //         XYZ = xyz.address;
    //         DAI = dai.address;

    //         // admin balances
    //         // These should be higher than the initial amount supplied
    //         // Changing weights pushes/pulls tokens as necessary to keep the prices stable
    //         await dai.mint(admin, web3.utils.toWei('10000'));
    //         await xyz.mint(admin, web3.utils.toWei('40000'));

    //         const poolParams = {
    //             poolTokenSymbol: SYMBOL,
    //             poolTokenName: NAME,
    //             constituentTokens: [XYZ, DAI],
    //             tokenBalances: startBalances,
    //             tokenWeights: startWeights,
    //             swapFee: swapFee,
    //         }

    //         CONTROLLER = await crpFactory.callStatic.newCrp(
    //             bFactory.address,
    //             poolParams,
    //             permissions,
    //         );

    //         await crpFactory.newCrp(
    //             bFactory.address,
    //             poolParams,
    //             permissions,
    //         );

    //         controller = await ConfigurableRightsPool.at(CONTROLLER);

    //         const CONTROLLER_ADDRESS = controller.address;

    //         await dai.approve(CONTROLLER_ADDRESS, MAX);
    //         await xyz.approve(CONTROLLER_ADDRESS, MAX);

    //         await controller.createPool(web3.utils.toWei('1000'), 10, 10);
    //     });

    //     // Change weights linearly over the given block period
    //     // They "flip" from heavily favoring the project token, to heavily favoring the collateral coin
    //     describe('Linear LBP example', () => {
    //         it('Controller should be able to call updateWeightsGradually()', async () => {
    //             blockRange = 50;
    //             // get current block number
    //             const block = await web3.eth.getBlock('latest');
    //             console.log(`Block of updateWeightsGradually() called at ${block.number}`);
    //             startBlock = block.number;
    //             const endBlock = startBlock + blockRange;
    //             // "Flip" weights, from 80/20% to 20/80% by the end
    //             const endWeights = [web3.utils.toWei('8'), web3.utils.toWei('32')];
    //             console.log(`Start block for XYZ bootstrapping: ${startBlock}`);
    //             console.log(`End   block for XYZ bootstrapping: ${endBlock}`);

    //             await controller.updateWeightsGradually(endWeights, startBlock, endBlock);
    //         });

    //         it('Should be able to pokeWeights()', async () => {
    //             let i;
    //             let weightXYZ;
    //             let weightDAI;

    //             let block = await web3.eth.getBlock('latest');
    //             console.log(`Block: ${block.number}`);
    //             while (block.number < startBlock) {
    //                 // Wait for the start block, if necessary
    //                 block = await web3.eth.getBlock('latest');
    //                 console.log(`Still waiting. Block: ${block.number}`);
    //                 await time.advanceBlock();
    //             }

    //             for (i = 0; i < blockRange + 3; i++) {
    //                 weightXYZ = await controller.getDenormalizedWeight(XYZ);
    //                 weightDAI = await controller.getDenormalizedWeight(DAI);
    //                 block = await web3.eth.getBlock("latest");
    //                 console.log('Block: ' + block.number + '. Weights -> XYZ: ' +
    //                     (fromWei(weightXYZ) * 2.5).toFixed(4) + '%\tDAI: ' +
    //                     (fromWei(weightDAI) * 2.5).toFixed(4) + '%');

    //                 // Cause the weights to change
    //                 // Since a smart contract can do nothing on its own, an external caller
    //                 //   needs to poke it with a stick now and then for the weights to change
    //                 await controller.pokeWeights();
    //             }
    //         });
    //     });
    // });

    /* Here we want to implement a non-linear curve, as describe in the paper - 
       essentially "flipping" the weights faster.
       This could be done by calling updateWeightsGradually repeatedly, with short-term
       endpoints calculated so that the succession of linear trajectories coincides with
       tangents to the desired exponential curve.
       Or, as we do here, you can simply set the weights directly to points on the curve
       during the non-linear phase, then call updateWeightsGradually once after it flattens
       out.
    */
    describe('Factory_LBP (nonlinear)', function () {
        this.timeout(600000);
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        let controller;
        let CONTROLLER;
        let BPool;
        let XYZ;
        let DAI;
        let dai;
        let xyz;

        const startWeights = [web3.utils.toWei('32'), web3.utils.toWei('8')];
        const startBalances = [web3.utils.toWei('4000'), web3.utils.toWei('1000')];
        const swapFee = 10 ** 15;

        beforeEach(async () => {
            let BFactory = await ethers.getContractFactory('BFactory');
            BPool = await ethers.getContractFactory('BPool');

            let Contract = await ethers.getContractFactory('BalancerSafeMath');
            let bsm = await Contract.deploy();

            Contract = await ethers.getContractFactory('RightsManager');
            let rm = await Contract.deploy();
            Contract = await ethers.getContractFactory('SmartPoolManager');
            let spm = await Contract.deploy();

            let ConfigurableRightsPool = await ethers.getContractFactory('ConfigurableRightsPool', {
                libraries: {
                    BalancerSafeMath: bsm.address,
                    RightsManager: rm.address,
                    SmartPoolManager: spm.address,
                },
            });
            // let CRPFactory = await ethers.getContractFactory('CRPFactory', {
            //     libraries: {
            //         BalancerSafeMath: "0x045220633CcEb83867b076e4E71E3eA145Bb5B89",
            //         RightsManager: "0x79a948a9cd122EAD18E71DA6ed053F38968741ce",
            //         SmartPoolManager: "0x8fe06475FCDf7E5a4dBCcDB297C3Ff42A15EE238",
            //     },
            // });
            let TToken = await ethers.getContractFactory('TToken');

            const accounts = await ethers.getSigners();

            const admin = accounts[0].address;

            // const MAX = web3.utils.toTwosComplement(-1);
            const MAX = web3.utils.toWei('1000000');
            const SYMBOL = 'LBP';
            const NAME = 'Balancer Pool Token';

            const permissions = {
                canPauseSwapping: false,
                canChangeSwapFee: false,
                canChangeWeights: true,
                canAddRemoveTokens: false,
                canWhitelistLPs: false,
                canChangeCap: false,
            };
            bFactory = await BFactory.deploy();
            // crpFactory = await CRPFactory.deploy();
            xyz = await TToken.deploy('XYZ', 'Example Project Token', 18);
            dai = await TToken.deploy('Dai Stablecoin', 'DAI', 18);

            XYZ = xyz.address;
            DAI = dai.address;

            // admin balances
            // These should be higher than the initial amount supplied
            // Changing weights pushes/pulls tokens as necessary to keep the prices stable
            await dai.mint(admin, web3.utils.toWei('10000'));
            await xyz.mint(admin, web3.utils.toWei('40000'));

            const poolParams = {
                poolTokenSymbol: SYMBOL,
                poolTokenName: NAME,
                constituentTokens: [XYZ, DAI],
                tokenBalances: startBalances,
                tokenWeights: startWeights,
                swapFee: swapFee,
            }

            // CONTROLLER = await crpFactory.callStatic.newCrp(
            //     bFactory.address,
            //     poolParams,
            //     permissions,
            // );

            // const hash = await crpFactory.newCrp(
            //     bFactory.address,
            //     poolParams,
            //     permissions,
            // );

            let configurableRightsPool = await ConfigurableRightsPool.deploy(bFactory.address, poolParams, permissions);
            console.log(configurableRightsPool)
            // configurableRightsPool.wait();
            // let file = fs.readFileSync('../artifacts/contracts/ConfigurableRightsPool.sol/ConfigurableRightsPool.json');
            // let metadata = JSON.parse(file);
            // abi = metadata.abi;
            sleep(20000)
            controller = await new ethers.Contract(configurableRightsPool.address, ConfigurableRightsPool.interface, accounts[0]);
            sleep(20000)
            controller.deployTransaction = configurableRightsPool.deployTransaction;
            controller = await controller.deployed()
            // controller = ConfigurableRightsPool.attach(CONTROLLER);
            // console.log(ConfigurableRightsPool)
            const CONTROLLER_ADDRESS = controller.address;
            // console.log(controller)
            // console.log("----------")
            // console.log(ret)
            // const fil = await crpFactory.filters.LogNewCrp(accounts[0].address, CONTROLLER);
            // console.log(fil);
            // const res = await crpFactory.callStatic.isCrp(CONTROLLER);
            // console.log(res);
            // await controller.callStatic.getRightsManagerVersion();
            await dai.approve(CONTROLLER_ADDRESS, MAX);
            await xyz.approve(CONTROLLER_ADDRESS, MAX);
            console.log(CONTROLLER_ADDRESS)
            sleep(20000)
            let inf = new ethers.providers.InfuraProvider("rinkeby", "61e4f78a7e1249f89f01def30db4c551")
            let code = await inf.getCode(CONTROLLER_ADDRESS)
            console.log(code)
            // controller["deployTransaction"] = configurableRightsPool;
            let pool = await controller.functions.getBalancerSafeMathVersion();
            console.log(pool);
            const tx = await controller.createPool(web3.utils.toWei('1000'), 10, 10);
            // tx.wait();
            sleep(12000);
            let p = await controller.functions.getBalancerSafeMathVersion();
            console.log(p);
        });

        it('Should be able to update weights directly', async () => {
            let i;

            let weightXYZ = await controller.getDenormalizedWeight(XYZ);
            let weightDAI = await controller.getDenormalizedWeight(DAI);
            const startWeightXYZ = weightXYZ;
            const startWeightDAI = weightDAI;

            let total = Decimal(fromWei(weightXYZ)).plus(Decimal(fromWei(weightDAI)));
            let pctXYZ = Decimal(fromWei(weightXYZ)).div(total);
            let pctDAI = Decimal(fromWei(weightDAI)).div(total);
            assert.equal(pctXYZ.toString(), '0.8');
            assert.equal(pctDAI.toString(), '0.2');
            // Steepness parameter
            const b = 1;

            const bPoolAddr = await controller.bPool();
            const underlyingPool = await BPool.at(bPoolAddr);

            /* Exponential curve formula (for 80/20%)
               "b" parameterizes the "steepness" of the curve
               Higher values of b mean weights converge to the asymptotes faster
              
               pctXYZ = 0.2 + 0.6^(bx)
               pctDAI = 0.8 - 0.6^(bx)
             
               To generalize, HP=0.8, LP=0.2
               pctXYZ = LP + (HP-LP)^(bx)
               pctDAI = HP - (HP-LP)^(bx) */

            /* Follow it for 25 blocks/weight changes
               In a real example, weights might change every 1000 or 10000 blocks
               For the first 10 blocks, set the weights manually, since they're not linear
               For the last 15 blocks, the curve is close enough to the asymptote to be nearly linear,
               So make it easier and use the updateWeightsGradually call */

            for (i = 1; i <= 10; i++) {
                weightXYZ = await controller.getDenormalizedWeight(XYZ);
                weightDAI = await controller.getDenormalizedWeight(DAI);
                block = await web3.eth.getBlock("latest");
                console.log('Block: ' + block.number + '. Weights -> XYZ: ' +
                    (fromWei(weightXYZ) * 2.5).toFixed(4) + '%\tDAI: ' +
                    (fromWei(weightDAI) * 2.5).toFixed(4) + '%');
                await time.advanceBlock();

                // Calculate the percentages (rounded to 3 decimals to avoid numeric issues)
                pctXYZ = Math.floor((0.2 + 0.6 ** (b * i)) * 1000) / 1000;
                pctDAI = Math.floor((0.8 - 0.6 ** (b * i)) * 1000) / 1000;

                // Convert the percentages to denormalized weights
                normXYZ = Math.floor(pctXYZ * 40 * 1000) / 1000;
                normDAI = Math.floor(pctDAI * 40 * 1000) / 1000;

                console.log(`\nNew weights: XYZ weight: ${normXYZ}; DAI weight: ${normDAI}`);

                // Changing weights transfers tokens!         
                await controller.updateWeight(XYZ, web3.utils.toWei(normXYZ.toFixed(4)));
                await controller.updateWeight(DAI, web3.utils.toWei(normDAI.toFixed(4)));

                const adminXYZ = await xyz.balanceOf.call(admin);
                const adminDAI = await dai.balanceOf.call(admin);
                console.log(`Admin balances after: ${Decimal(fromWei(adminXYZ)).toFixed(2)} XYZ; ${Decimal(fromWei(adminDAI)).toFixed(2)} DAI`);
                const poolXYZ = await xyz.balanceOf.call(underlyingPool.address);
                const poolDAI = await dai.balanceOf.call(underlyingPool.address);
                console.log(`Pool balances after: ${Decimal(fromWei(poolXYZ)).toFixed(2)} XYZ; ${Decimal(fromWei(poolDAI)).toFixed(2)} DAI`);
            }

            // End weights are the reverse of the starting weights
            const endWeights = [startWeightDAI, startWeightXYZ]
            // Do linear for the rest of the curve
            await controller.updateWeightsGradually(endWeights, block.number, block.number + 15);

            for (i = 1; i <= 15; i++) {
                weightXYZ = await controller.getDenormalizedWeight(XYZ);
                weightDAI = await controller.getDenormalizedWeight(DAI);
                block = await web3.eth.getBlock("latest");
                console.log('Block: ' + block.number + '. Weights -> XYZ: ' +
                    (fromWei(weightXYZ) * 2.5).toFixed(4) + '%\tDAI: ' +
                    (fromWei(weightDAI) * 2.5).toFixed(4) + '%');

                await controller.pokeWeights();
            }
        });
    });
});