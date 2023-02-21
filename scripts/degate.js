const { DEGATE_ABI, ERC20_ABI, merkleProof } = require("./utils");
// const merkleProof = require("./merkleProof.json");
const { providers, Contract, Wallet, utils } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const provider = new providers.JsonRpcProvider(
    process.env.DEGATE_RINKEBY_URL
  );
  const exchangeAddr = "0xdac304791b7f53593c701980aa52087ed7ec6649"; //check for curr degate exchange address
  const tokenAddr = process.env.TOKEN_ADDR;
  const signer = new Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);
  const cDegate = new Contract(exchangeAddr, DEGATE_ABI, signer);
  const cToken = new Contract(tokenAddr, ERC20_ABI, signer);
  const accountToTest = process.env.TEST_ACCOUNT;
  console.log("Executing Exodus for account : %s", accountToTest);
  let ethBalance = await provider.getBalance(signer.address);
  console.log("ETH Balance before main account: ", ethBalance.toString());
  ethBalance = await provider.getBalance(accountToTest);
  console.log("ETH Balance before : ", ethBalance.toString());
  console.log(
    "%s Balance before : ",
    await cToken.symbol(),
    (await cToken.balanceOf(accountToTest)).toString());
  const tx = await cDegate.withdrawFromMerkleTree(merkleProof);
  console.log("Executing with receipt : ", tx.hash);
  const receipt = await tx.wait();
  console.log("Succesfully excuted with hash : %s", receipt.transactionHash);
  const new_ethBalance = await provider.getBalance(accountToTest);
  console.log("ETH Balance after : ", new_ethBalance.toString());
  console.log(
    "%s Balance after : ",
    await cToken.symbol(),
    (await cToken.balanceOf(accountToTest)).toString()
  );
  return;
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
