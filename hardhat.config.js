
 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
 //const { API_URL, PRIVATE_KEY } = process.env;
 module.exports = {
   solidity: "0.8.7",
   defaultNetwork: "ropsten",
   networks: {
     hardhat: {},
     ropsten: {
       url: 'https://eth-ropsten.alchemyapi.io/v2/oHgF5L-nRZw9gkMBmqQQDZ9h_hthR2YO',
       accounts: [`615a1eb9b6f7ac0a980ea60bbf6cc24e56b2fe96b665c0e8113ac5a89ee8ef2f`],
     },
   },
 };
 