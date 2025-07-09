# 🎓 Blockchain Certificate Generator & Verifier dApp

> A full-stack decentralized application to issue and verify blockchain-backed certificates using Ethereum/Polygon smart contracts.

---

## 🚀 Live Demo

🌐 [Visit the App](https://vighneshb04.github.io/blockchain-certificate/)  


---

## 💡 What It Does

- ✅ Issue tamper-proof certificates on-chain  
- 🔐 Each certificate has a unique credential hash  
- 🌍 Anyone can verify a certificate using its hash  
- 📄 Downloadable PDF certificates with embedded credential IDs  
- 🦊 MetaMask wallet integration  

---

## 🛠️ Tech Stack

| Layer        | Tech                                       |
|--------------|--------------------------------------------|
| Smart Contract | Solidity, Ethereum/Polygon Mainnet      |
| Frontend     | React.js, Material UI, Web3.js             |
| PDF          | @react-pdf/renderer                        |
| Backend      | Firebase Firestore (for student metadata)  |
| Hosting      | GitHub Pages / Vercel / Netlify            |

---

## 📦 Features

- 👨‍🎓 **Generate Certificate**:
  - Connect wallet (MetaMask)
  - Enter student ID & course
  - Hash is generated and stored on-chain

- 🔍 **Verify Certificate**:
  - Paste the certificate hash
  - Pulls data from blockchain
  - Shows student name, course, date
  - Option to download PDF version

- 🛡️ **Immutable Credential ID**:
  - Generated using SHA3 with timestamp + Firebase ID
  - Cannot be faked or altered

---

## 🧱 Smart Contract

```solidity
struct CertData {
  string studentName;
  string course;
  uint256 issueDate;
  string firebaseId;
}
mapping(string => CertData) private certificates;
```

- `generateCertificate()` → Owner-only function to register certificates  
- `verifyCertificate(hash)` → Public function to validate any certificate  

✅ [View Full Contract Code](contracts/Certificate.sol)

---

## 🔧 Local Development Setup

```bash
git clone https://github.com/vighneshb04/blockchain-certificate.git
cd blockchain_certificate/frontend
npm install
```

Create `.env`:

```bash
REACT_APP_CONTRACT_ADDRESS=
```

Run the app locally:

```bash
npm start
```

---

## 📤 Deploy Smart Contract (Mainnet / Polygon)

Using **Hardhat** (optional, if you redeploy on chain):

```bash
npx hardhat run scripts/deploy.js --network polygon
```

Update the deployed address in `.env`:

```bash
REACT_APP_CONTRACT_ADDRESS=0xNewDeployedContract
```

Then rebuild frontend:

```bash
npm run build
```

Push to GitHub or deploy on Vercel / Netlify.

---

## 🌍 Global Verification Support

✅ The smart contract is deployed on a public chain (Polygon).  
✅ Anyone with any MetaMask account can verify any credential hash.  
✅ No login or centralized backend is required to verify certificates.

---



## 🔐 Security & Notes

- Only the contract **owner** can generate certificates  
- Credential hash is **SHA3-based** and timestamped  
- Data stored on-chain is immutable

---

## 🧠 Future Upgrades

- Certificate dashboard & filtering  
- Revocation support  
- IPFS PDF anchoring  
- ERC-721 NFT-based certificates  
- ENS domain integration  

---

## 👨‍💻 Author

**Vighnesh B**  
💼 Blockchain/Web Developer   
🔗 [LinkedIn](https://www.linkedin.com/in/vighnesh-b-b9391b291/) • [GitHub](https://github.com/vighneshb04)

**Keerthana Sai Gazula**  
💼 Blockchain/Web Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/keerthana-sai-gazula-4013b927a/) • [GitHub](https://github.com/KeerthanaG2)

---

## 📜 License

MIT License – free to use, modify, and distribute for educational and commercial purposes.

---
