import { useState } from 'react';
import   { web3instance }  from '../service/web3'; // import web3instance from '../service/web3';
import  ABI  from '../contracts/ABI';


export const ConnectButton = ({ setContractInstance, setSelectedAccount }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected");
        const accounts = await web3instance.eth.getAccounts();
        

        // select an account
        const selected = await promptUserToSelectAccount(accounts);
        if (selected) {
          setSelectedAccount(selected);
          setSelectedWallet(selected);
          console.log("Selected Account:", selected);
          setIsConnected(true);

          // Instantiate contract
          const contract = new web3instance.eth.Contract(ABI, '0x5FbDB2315678afecb367f032d93F642f64180aa3'); // address of deployed contract
          setContractInstance(contract);
        } else {
          setError("No account selected");
        }
      } else {
        setError("MetaMask not detected");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError(error.message || "Failed to connect to wallet");
    }
  };

  // Function to prompt user to select an account
  const promptUserToSelectAccount = async (accounts) => {
    return window.prompt("Select an account:", accounts[0]);
  };

  return (
    <div className="ConnectButtonContainer">
      <button onClick={connectWallet} className={isConnected ? "ConnectedButton" : "ConnectButton"}>
        {isConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
      {selectedWallet && (
        <div className="SelectedWallet">
          Chosen Wallet: {selectedWallet}
        </div>
      )}
      {error && <div className="ErrorMessage">{error}</div>}
    </div>
  );
};
