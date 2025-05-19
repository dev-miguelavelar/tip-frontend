let provider, signer, userAddress;

// 🔁 Dynamically use current domain (localhost or Railway)
const TIP_API_URL = `${window.location.origin}/tip`;

let latestTipRequest = null;

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
    output.textContent = "⏳ Fetching payment instructions...";
    const res = await fetch(TIP_API_URL);
    latestTipRequest = await res.json();

    const {
      price: { amount, currency },
      payment: { address },
      x_request_id
    } = latestTipRequest;

    output.textContent = `💡 Tip Details:\n- Amount: ${amount} ${currency}\n- To: ${address}\n- Request ID: ${x_request_id}\n\n⏳ (Mocked) Sending tip...`;

    // TODO: Uncomment this section for real USDC transfer when ready
    /*
    const abi = ["function transfer(address to, uint256 amount) public returns (bool)"];
    const contract = new ethers.Contract(USDC_ADDRESS, abi, signer);
    const amountInDecimals = ethers.BigNumber.from("1000000"); // 1 USDC (6 decimals)
    const tx = await contract.transfer(address, amountInDecimals);
    await tx.wait();
    output.textContent = `✅ Tip sent! TX Hash: ${tx.hash}`;
    */

    // Simulate success (mock)
    await new Promise(resolve => setTimeout(resolve, 1500));
    output.textContent = `✅ (Mocked) Tip sent to ${address} (${amount} ${currency})`;

  } catch (err) {
    output.textContent = `❌ Error: ${err.message}`;
  }
});