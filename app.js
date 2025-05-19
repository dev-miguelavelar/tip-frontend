let provider, signer, userAddress;

const USDC_ADDRESS = "0xd35cceeAD182dcee0F148EbaC9447DA2c4D449c4"; // USDC on Sepolia (keep for when ready)
const RECIPIENT = "yourWallet";    // Your wallet address

const output = document.getElementById("output");
const connectBtn = document.getElementById("connectBtn");
const tipBtn = document.getElementById("tipBtn");

connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    output.textContent = "❌ MetaMask not found!";
    return;
  }

  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    output.textContent = `✅ Connected as ${userAddress}`;
  } catch (err) {
    output.textContent = `❌ Error connecting: ${err.message}`;
  }
});

tipBtn.addEventListener("click", async () => {
  if (!signer) {
    output.textContent = "❌ Please connect MetaMask first.";
    return;
  }

  try {
    // Mock transfer behavior
    output.textContent = "⏳ (Mocked) Sending tip...";

    // TODO: Uncomment this when you have test ETH to pay gas
    /*
    const abi = ["function transfer(address to, uint256 amount) public returns (bool)"];
    const contract = new ethers.Contract(USDC_ADDRESS, abi, signer);
    const amount = ethers.BigNumber.from("1000000"); // 1 USDC (6 decimals)

    const tx = await contract.transfer(RECIPIENT, amount);
    await tx.wait();
    output.textContent = `✅ Tip sent! TX Hash: ${tx.hash}`;
    */

    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    output.textContent = "✅ (Mocked) Tip sent successfully!";
  } catch (err) {
    output.textContent = `❌ Error (mocked): ${err.message}`;
  }
});