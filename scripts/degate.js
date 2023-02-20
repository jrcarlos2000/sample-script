const {DEGATE_ABI, ERC20_ABI} = require("./utils");
const merkleProof = require("./merkleProof.json");

async function main() {
    const exchangeAddr = "0xdac304791b7f53593c701980aa52087ed7ec6649"; //check for curr degate exchange address
    const USDCAddr = "0x953873a4E0B57179D88A9275Cfb5243D3e631f1B"; // change to the token addr in the network you are in
    const cDegate = await hre.ethers.getContractAt(DEGATE_ABI,exchangeAddr); //
    const cUSDC = await hre.ethers.getContractAt(ERC20_ABI,USDCAddr);
    const signers = await hre.ethers.getSigners();
    console.log("Executing Exodus for account : %s", signers[0].address);
    const balance = await cUSDC.balanceOf(signers[0].address);
    const ethBalance = await hre.ethers.provider.getBalance(signers[0].address);
    console.log("USDC Balance before : " , balance.toString());
    console.log("ETH Balance before : " , ethBalance.toString());
    //--------- 
    const tx = await cDegate.withdrawFromMerkleTree(merkleProof) 
    const receipt = await tx.wait();
    //---------
    console.log("Succesfully excuted with hash : %s", receipt.transactionHash);
    const new_balance = await cUSDC.balanceOf(signers[0].address);
    const new_ethBalance = await hre.ethers.provider.getBalance(signers[0].address);
    console.log("USDC Balance after : " , new_balance.toString());
    console.log("ETH Balance after : " , new_ethBalance.toString());

    return;
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  