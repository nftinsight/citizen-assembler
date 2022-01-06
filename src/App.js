import identities from './identities.json';
import vaults from './vaults.json';
import caches from './caches.json';
import lands from './lands.json';
import ranks from './ranks.json';
import { useState } from 'react';

function App() {
  const [identity, setIdentity] = useState(null);
  const [vault, setVault] = useState(null);
  const [cache, setCache] = useState(null);
  const [land, setLand] = useState(null);
  const isValidCitizen = identity !== null && cache !== null && land !== null;
  let componentScore = 0;
  let rank = 'last';
  if (isValidCitizen) {
    componentScore = cache.componentScore + identity.componentScore + land.componentScore;
    if (vault) {
      componentScore += vault.componentScore;
    }

    componentScore = Math.round(componentScore * 100) / 100;
    for (let i = 0; i < ranks.length; i++) {
      if (componentScore > ranks[i]) {
        rank = i + 1;
        break;
      }
    }
  }

  return (
      <div>
        <h3 style={{textAlign: 'center'}}>Citizen Assembler</h3>
        <h5 style={{textAlign: 'center', marginTop: -10}}>Choose components to get estimated points and ranking of an assembled citizen</h5>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <span style={{marginRight: 5}}>Identity</span>
          <select style={{minWidth: 100, marginRight: 10}} onChange={e => setIdentity(identities[e.target.value] || null)}>
            <option value={''}>---</option>
            {Object.keys(identities).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>

          <span style={{marginRight: 5}}>Vault</span>
          <select style={{minWidth: 100, marginRight: 10}} onChange={e => setVault(vaults[e.target.value] || null)}>
            <option value={''}>---</option>
            {Object.keys(vaults).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>

          <span style={{marginRight: 5}}>Cache</span>
          <select style={{minWidth: 100, marginRight: 10}} onChange={e => setCache(caches[e.target.value] || null)}>
            <option value={''}>---</option>
            {Object.keys(caches).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>

          <span style={{marginRight: 5}}>Land</span>
          <select style={{minWidth: 100, marginRight: 10}} onChange={e => setLand(lands[e.target.value] || null)}>
            <option value={''}>---</option>
            {Object.keys(lands).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>
        </div>
        {isValidCitizen && (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 40, flexDirection: 'column', alignItems: 'center'}}>
              <span style={{display: 'block'}}>Estimated Points: {componentScore}</span>
              <span style={{display: 'block', marginTop: 20}}>Estimated Rank: {rank}</span>
            </div>
        )}
      </div>
  );
}

export default App;
