const {DEGATE_ABI, ERC20_ABI, merkleProof} = require("./utils");

async function main() {
    const exchangeAddr = "0xdac304791b7f53593c701980aa52087ed7ec6649";
    const USDCAddr = "0xeb8f08a975Ab53E34D8a0330E0D34de942C95926";
    const cDegate = await hre.ethers.getContractAt(DEGATE_ABI,exchangeAddr);
    const cUSDC = await hre.ethers.getContractAt(ERC20_ABI,USDCAddr);
    const signers = await hre.ethers.getSigners();
    console.log("Executing Exodus for account : %s", signers[0].address);
    const balance = await cUSDC.balanceOf(signers[0].address);
    const ethBalance = await hre.ethers.provider.getBalance(signers[0].address);
    console.log("USDC Balance before : " , balance.toString());
    console.log("ETH Balance before : " , ethBalance.toString());

    // //--------- 
    // const tx = await cDegate.withdrawFromMerkleTree(merkleProof) 
    // const receipt = await tx.wait();
    // //---------
    // console.log("Succesfully excuted with hash : %s", receipt.transactionHash);
    // const new_balance = await cUSDC.balanceOf(signers[0].address);
    // const new_ethBalance = await hre.ethers.provider.getBalance(signers[0].address);
    // console.log("USDC Balance after : " , new_balance.toString());
    // console.log("ETH Balance after : " , new_ethBalance.toString());
    return;
    const query = {
      schema: ethers.BigNumber.from(schemaEnd),
      slotIndex: 2,
      operator: 3,
      value: [22, ...new Array(63).fill(0).map(i => 0)],
      circuitId,
      };
  
      const query2 = {
        schema: ethers.BigNumber.from(schemaEnd),
        slotIndex: 2,
        operator: 3,
        value: [18, ...new Array(63).fill(0).map(i => 0)],
        circuitId,
        };
    // add the address of the contract just deployed
    ERC20VerifierAddress = "0xaede1B9c2a1c2d35a16ed8E0804bcbc7470Db3aC"
  
    let erc20Verifier = await hre.ethers.getContractAt("ERC20Verifier", ERC20VerifierAddress)
  
    // CHECK : IF MORE THAN ONE IS OK ?
    // try submitting proof to different requests id
  
    try {
      let tx =  await erc20Verifier.setZKPRequest(
        1,
        validatorAddress,
        query
      );
      await tx.wait()
      console.log("Request set");
    } catch (e) {
      console.log("error: ", e);
    }
    try {
      let tx = await erc20Verifier.setZKPRequest(
        2,
        validatorAddress,
        query2
      );
      await tx.wait();
      console.log("Request set");
    } catch (e) {
      console.log("error: ", e);
    }
    
  }
  
  function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  }
  
  function fromLittleEndian(bytes) {
    const n256 = BigInt(256);
    let result = BigInt(0);
    let base = BigInt(1);
    bytes.forEach((byte) => {
      result += base * BigInt(byte);
      base = base * n256;
    });
    return result;
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  