import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import contractABI from "./abi.json"; 

const abi=contractABI.abi

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ; 

function App() {
    const [clicks, setClicks] = useState(0);
    const [account, setAccount] = useState(null);
    const milestones = [500, 1000, 5000];
    const milestoneURIs = {
      500: import.meta.env.VITE_MILESTONE_500,
      1000: import.meta.env.VITE_MILESTONE_1000,
      5000: import.meta.env.VITE_MILESTONE_5000,
    }

    useEffect(() => {
        if (account) fetchClicks(account);
    }, [account]);

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            setAccount(userAddress);
            fetchClicks(userAddress);
        } else {
            alert("Please install MetaMask!");
        }
    };

    const fetchClicks = async (address) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/clicks/${address}`);
            setClicks(response.data.clicks);
        } catch (error) {
            console.error("Error fetching clicks:", error);
        }
    };

    const incrementClick = async () => {
        if (!account) return alert("Connect your wallet first!");

        try {
            const response = await axios.post(`${BACKEND_URL}/click`, { address: account });
            setClicks(response.data.clicks);
            if (milestones.includes(response.data.clicks)) {
                await mintNFT(response.data.clicks);
            }
        } catch (error) {
            console.error("Error updating clicks:", error);
        }
    };

    const mintNFT = async (ncliks) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

            const tx = await contract.mintNFT(account, milestoneURIs[ncliks]);
            await tx.wait();
            alert("🎉 NFT Minted Successfully!");
        } catch (error) {
            console.error("NFT Minting Failed:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">🎯 Click to Earn NFT</h1>

            {account ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                    <p className="text-lg font-semibold mb-2">
                        Clicks: <span className="text-yellow-400">{clicks}</span>
                    </p>
                    <button
                        onClick={incrementClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all cursor-pointer "
                    >
                        Click Me! 🚀
                    </button>
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all cursor-pointer"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default App;
