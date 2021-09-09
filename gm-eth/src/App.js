import './App.css';
import { useState } from 'react'
import { ethers } from 'ethers'
import GM from './artifacts/contracts/GM.sol/GM.json'

const gmAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

function App() {
  const [nickname, setNicknameValue] = useState()
  const [lastNickname, setLastNicknameValue] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchNickname() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(gmAddress, GM.abi, provider)
      try {
        const data = await contract.greeter()
        console.log('data: ', data)
        setLastNicknameValue(data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function setNickname() {
    if (!nickname) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(gmAddress, GM.abi, signer)
      const transaction = await contract.greet(nickname)
      await transaction.wait()
      fetchNickname()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchNickname}>Fetch Latest Greeting</button>
        <input onChange={e => setNicknameValue(e.target.value)} placeholder="Nickname" />
        <button onClick={setNickname}>gm</button>
        <p>{!!(lastNickname) ? lastNickname + " says 'gm'" : ''}</p>
      </header>
    </div>
  );
}

export default App;
