import React, { useState, useEffect } from "react";
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
import "./InsuranceForm.css";

const InsuranceForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isInsured, setIsInsured] = useState(false);
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getInsurancePrice();
        await getwithdrawAmount();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.log(error);
      }
      setIsConnected(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setWalletAddress(accounts[0]);
      console.log(accounts);
    } else {
      console.log("Please install MetaMask");
    }
  };

  const handleGetInsured = async (e) => {
    e.preventDefault();
    const ethAmountInGwei = 1;
    console.log(`Funding with ${ethAmountInGwei} gwei...`);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const selectedAccount = accounts[0];
        const signer = provider.getSigner(selectedAccount);
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const transactionResponse = await contract.getInsured({
          value: ethers.utils.parseUnits(ethAmountInGwei.toString(), "gwei"),
        });
        await listenForTransactionMine(transactionResponse, provider);
        await getInsurancePrice();
        await getwithdrawAmount(selectedAccount);
        setIsInsured(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const getInsurancePrice = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
      const price = await contract.insurancePrice();
      setInsurancePrice(ethers.utils.formatUnits(price, "gwei"));
    } catch (error) {
      console.log(error);
    }
  };

  const getwithdrawAmount = async (selectedAccount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
      const amount = await contract.addressToAmount(selectedAccount);
      setWithdrawAmount(ethers.utils.formatUnits(amount, "gwei"));
      console.log("Insurance received");
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const selectedAccount = accounts[0];
        const signer = provider.getSigner(selectedAccount);
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const transactionResponse = await contract.withdrawInsuranceMoney();
        await listenForTransactionMine(transactionResponse, provider);
        await getwithdrawAmount(selectedAccount);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const listenForTransactionMine = async (transactionResponse, provider) => {
    try {
      await transactionResponse.wait();
      console.log("Transaction confirmed");
      await provider.waitForTransaction(transactionResponse.hash);
      console.log("Transaction mined");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="create" onSubmit={(e) => e.preventDefault()}>
        <h3>Insurance Price : {insurancePrice}</h3>

        <button onClick={handleConnect}>
          {isConnected ? "Connected" : "Connect to Metamask"}
        </button>

        <p>
          Wallet Address :{" "}
          {walletAddress ? (
            <div style={{ color: "green", display: "inline" }}>
              {walletAddress}
            </div>
          ) : (
            <div style={{ color: "red", display: "inline" }}>
              Connect to Metamask
            </div>
          )}
        </p>
        <p>
          Is Insured :{" "}
          {isInsured ? (
            <div style={{ color: "green", display: "inline" }}>Insure</div>
          ) : (
            <div style={{ color: "red", display: "inline" }}>Not Insured</div>
          )}
        </p>
        {/* <p>Amount that can be withdrawn : {withdrawAmount}</p> */}

        <br />

        <div className="output-buttons">
          <button onClick={handleGetInsured}>Get Insured</button>
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      </form>
    </>
  );
};

export default InsuranceForm;
