import identities from './identities.json';
import vaults from './vaults.json';
import caches from './caches.json';
import lands from './lands.json';
import ranks from './ranks.json';
import citizens from './citizens.json';
import { useState } from 'react';
import assets from './mixedMapping';

const ipfsMaleBaseUrl = 'https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/';
const ipfsFemaleBaseUrl = 'https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/';
const maleBaseUrl = './assets/male';
const femaleBaseUrl = './assets/female';
const idRate = {
  Low: 1,
  Mid: 3,
  High: 8,
}
const vaultRate = {
  Low: 1,
  Medium: 2,
  "Medium High": 3,
  High: 4,
  "Very High": 5,
  "?": 7,
}

function App() {
  const [citizen, setCitizen] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [vault, setVault] = useState(null);
  const [cache, setCache] = useState(null);
  const [land, setLand] = useState(null);

  const isValidCitizen = identity !== null && cache !== null && land !== null;
  const isMobile = window.innerWidth <= 1000;
  const attributes = {
    Race: identity?.race || null,
    Gender: identity?.gender || null,
    Class: identity?.class || null,
    Location: land?.location || null,
    Ability: identity?.ability || null,
    Eyes: identity?.eyes || null,
    Helm: cache?.helm || null,
    Apparel: cache?.apparel || null,
    Weapon: cache?.weapon || null,
    Vehicle: cache?.vehicle || null,
    "Additional Item": vault?.additionalItem || null,
    Yield: identity?.yield || null,
    "Multiplier": vault?.multiplier || null,
    "Reward Rate": (vault ? vaultRate[vault.multiplier] : 0) + (identity ? idRate[identity.yield] : 0),
    Cool: identity?.cool || null,
    Strength: identity?.strength || null,
    "Tech Skill": identity?.techSkill || null,
    Intelligence: identity?.intelligence || null,
    Attractiveness: identity?.attractiveness || null,
    "Trait Sum": identity?.sum || null,
  }
  function loadCitizen(id) {
    const ctzn = citizens[id];
    if (ctzn) {
      setCitizen(ctzn);
      setIdentity(identities[ctzn.identity]);
      setCache(caches[ctzn.cache]);
      setLand(lands[ctzn.land]);
      setVault(ctzn.vault ? vaults[ctzn.vault] : null);
    } else {
      setCitizen(null);
    }
  }

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

  let imageM, weapon1M, weapon2M, helmM1, helmM2, clothM1, clothM2;
  if (isValidCitizen) {
    let body = assets.male.bodies[identity.race];
    const helmMapping = assets.male.helms[cache.helm];
    const wpnMapping = assets.male.weapons[cache.weapon];
    let clothMapping = assets.male.clothing[cache.apparel];
    if (clothMapping === 32) {
      body = null;
      clothMapping = `32-${assets.male.bodies[identity.race]}`
    }
    if (Array.isArray(helmMapping)) {
      helmM1 = helmMapping[0];
      helmM2 = helmMapping[1];
    } else {
      helmM1 = helmMapping;
      helmM2 = null
    }
    if (Array.isArray(clothMapping)) {
      clothM1 = clothMapping[1];
      clothM2 = clothMapping[0];
    } else {
      clothM1 = clothMapping;
      clothM2 = null;
    }
    if (Array.isArray(wpnMapping)) {
      weapon2M = wpnMapping[0];
      weapon1M = wpnMapping[1];
    } else {
      weapon2M = wpnMapping;
      weapon1M = null;
    }
    const handType = assets.male.hands[weapon2M] || 'fist';
    imageM = (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 1200 1200">
          <image href={`${maleBaseUrl}/bg/${assets.male.backgrounds[land.location]}.png`}/>
          {weapon1M !== null && <image href={`${maleBaseUrl}/weapon/${weapon1M}.png`}/>}
          {body !== null && <image href={`${maleBaseUrl}/body/${body}.png`}/>}
          <image href={`${maleBaseUrl}/cloth/${clothM1}.png`}/>
          <image href={`${maleBaseUrl}/hand/${handType}/${assets.male.bodies[identity.race]}.png`}/>
          {weapon2M !== null && <image href={`${maleBaseUrl}/weapon/${weapon2M}.png`}/>}
          <image href={`${maleBaseUrl}/head/${assets.male.bodies[identity.race]}.png`}/>
          <image href={`${maleBaseUrl}/helm/${helmM1}.png`}/>
          {helmM2 !== null && <image href={`${maleBaseUrl}/helm/${helmM2}.png`}/>}
          {clothM2 && <image href={`${maleBaseUrl}/cloth/${clothM2}.png`}/>}
        </svg>
    );
  }

  return (
      <div>
        <h2 style={{textAlign: 'center'}}>Citizen Assembler</h2>
        <h4 style={{textAlign: 'center'}}>Load an uploaded citizen's components</h4>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row'}}>
          <span style={{marginRight: 5}}>Citizen</span>
          <select style={{minWidth: 100, marginRight: 10}} value={citizen?.id || ''} onChange={e => loadCitizen(e.target.value)}>
            <option value={''}>---</option>
            {Object.keys(citizens).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>
        </div>
        <h4 style={{textAlign: 'center'}}> Or choose components to get estimated points and ranking of an assembled citizen</h4>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row'}}>
          <span style={{marginRight: 5}}>Identity</span>
          <select style={{minWidth: 100, marginRight: 10}} value={identity?.id || ''} onChange={e => {
            setCitizen(null);
            setIdentity(identities[e.target.value] || null);
          }}>
            <option value={''}>---</option>
            {Object.keys(identities).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>

          <span style={{marginRight: 5}}>Vault</span>
          <select style={{minWidth: 100, marginRight: 10}} value={vault?.id || ''} onChange={e => {
            setCitizen(null);
            setVault(vaults[e.target.value] || null);
          }}>
            <option value={''}>---</option>
            {Object.keys(vaults).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>

          <span style={{marginRight: 5}}>Cache</span>
          <select style={{minWidth: 100, marginRight: 10}} value={cache?.id || ''} onChange={e => {
            setCitizen(null);
            setCache(caches[e.target.value] || null);
          }}>
            <option value={''}>---</option>
            {Object.keys(caches).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>

          <span style={{marginRight: 5}}>Land</span>
          <select style={{minWidth: 100, marginRight: 10}} value={land?.id || ''} onChange={e => {
            setCitizen(null);
            setLand(lands[e.target.value] || null);
          }}>
            <option value={''}>---</option>
            {Object.keys(lands).map(tokenId => <option key={tokenId} value={tokenId}>{tokenId}</option>)}
          </select>
        </div>
        {isValidCitizen && (
            <>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20,}}>

              </div>
              <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginRight: isMobile ? 0 : 50}}>
                  <h4 style={{marginTop: 10, marginBottom: 10}}>Estimated Rank: <b>{rank}</b></h4>
                  <h4 style={{marginTop: 10, marginBottom: 10}}>Estimated Points: <b>{componentScore}</b></h4>
                  <h4 style={{marginTop: 10, marginBottom: 10}}>Attributes</h4>
                  {Object.keys(attributes).map(attribute => (
                    <div key={attribute} style={{display: 'flex', width: 300, justifyContent: 'space-between'}}>
                      <span>{attribute}:</span>
                      <span>{attributes[attribute]}</span>
                    </div>
                  ))}
                </div>
                <div style={{display: 'flex', height: 450, width: 450, flexDirection: 'column', alignItems: 'center'}}>
                  <h4 style={{textAlign: 'center', marginTop: 5, marginBottom: 5}}>Male</h4>
                  {imageM}
                </div>
                <div style={{display: 'flex', height: 450, width: 450, marginLeft: isMobile ? 0 : 50, flexDirection: 'column', alignItems: 'center'}}>
                  <h4 style={{textAlign: 'center', marginTop: 5, marginBottom: 5}}>Female</h4>
                  {imageM}
                </div>
              </div>

            </>
        )}
      </div>
  );
}

export default App;
