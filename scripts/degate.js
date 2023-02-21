const {DEGATE_ABI, ERC20_ABI} = require("./utils");
const merkleProof = require("./merkleProof.json");

async function main() {
    const exchangeAddr = "0xdac304791b7f53593c701980aa52087ed7ec6649"; //check for curr degate exchange address
    const cDegate = await hre.ethers.getContractAt(DEGATE_ABI,exchangeAddr); //
    const signers = await hre.ethers.getSigners();
    console.log("Executing Exodus for account : %s", signers[0].address);
    const ethBalance = await hre.ethers.provider.getBalance(signers[0].address);
    console.log("ETH Balance before : " , ethBalance.toString());
    //--------- 
    const tx = await cDegate.withdrawFromMerkleTree(merkleProof)
    console.log("executing tx");
    const receipt = await tx.wait();
    console.log(receipt.transactionHash);
    //---------
    console.log("Succesfully excuted with hash : %s", receipt.transactionHash);
    const new_ethBalance = await hre.ethers.provider.getBalance(signers[0].address);
    console.log("ETH Balance after : " , new_ethBalance.toString());

    return;
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  