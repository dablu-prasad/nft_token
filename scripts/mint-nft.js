require("dotenv").config();

const API_URL="https://eth-ropsten.alchemyapi.io/v2/oHgF5L-nRZw9gkMBmqQQDZ9h_hthR2YO";
const PRIVATE_KEY="615a1eb9b6f7ac0a980ea60bbf6cc24e56b2fe96b665c0e8113ac5a89ee8ef2f";
const PUBLIC_KEY="0x0746E1E26875BE0E606BD01e2F53E4E58049f307";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "0x0Afa315339eDfaA6BcC1A2C742fb1A34b3cF806E";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is: ",hash,"\nCheck Alchemy's Mempool to view the status of your transaction!");
          } else {
            console.log("Something went wrong when submitting your transaction:",err);
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT("https://gateway.pinata.cloud/ipfs/QmRgKfYVKuAgF1ZBuds6Z6ofd4qDSgeKwWUaBzxY349eHU?preview=1");
