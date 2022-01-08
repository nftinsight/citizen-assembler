import identities from './identities.json';
import vaults from './vaults.json';
import caches from './caches.json';
import lands from './lands.json';
import ranks from './ranks.json';
import { useState } from 'react';
import assets from './mapping';

function App() {
  const [identity, setIdentity] = useState(null);
  const [vault, setVault] = useState(null);
  const [cache, setCache] = useState(null);
  const [land, setLand] = useState(null);
  const isValidCitizen = identity !== null && cache !== null && land !== null;
  let componentScore = 0;
  let rank = 'last';
  // console.log(vault, cache, identity, land);
  console.log(cache);
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

  // const image = (
  //     <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 1200 1200">
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/background/10.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/weapon/20-0.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/helm/51-0.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/body/8.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/cloth/51.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/hand/melee/8.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/weapon/20.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/head/8.png"/>
  //       <image href="https://neotokyo.mypinata.cloud/ipfs/QmPLW6u5MRut1b8iyVc47ET5zAj9VaG2GwyjcuKLoetWsT/helm/51.png"/>
  //     </svg>
  // );


  let imageM, imageF, bg, weapon1M, weapon2M, weapon1F, weapon2F, helmM1, helmM2, helmF1, helmF2, bodyM, bodyF, clothM, clothF, handM, handF, headM, headF;
  if (isValidCitizen) {
    bg = assets.male.backgrounds[land.location];
    helmM1 = assets.male.helms[cache.helm];
    helmM2 = assets.male.helms[cache.helm];
    helmF1 = assets.male.helms[cache.helm];
    helmF2 = assets.male.helms[cache.helm];
    clothM = assets.male.clothing[cache.apparel];
    clothF = assets.male.clothing[cache.apparel];
    weapon1M = assets.male.weapons[cache.weapon];
    weapon2M = assets.male.weapons[cache.weapon];
    weapon1F = assets.male.weapons[cache.weapon];
    weapon2F = assets.male.weapons[cache.weapon];
    bodyM = assets.male.bodies[identity.race].body;
    bodyF = assets.male.bodies[identity.race].body;
    headM = assets.male.bodies[identity.race].head;
    headF = assets.male.bodies[identity.race].head;
    handM = assets.male.bodies[identity.race].handMelee;
    handF = assets.male.bodies[identity.race].handMelee;
    imageM = (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 1200 1200">
          <image href={bg}/>
          <image href={weapon1M}/>
          <image href={helmM1}/>
          <image href={bodyM}/>
          <image href={clothM}/>
          <image href={handM}/>
          <image href={weapon2M}/>
          <image href={headM}/>
          <image href={helmM2}/>
        </svg>
    );
    imageF = (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 1200 1200">
          <image href={bg}/>
          <image href={weapon1F}/>
          <image href={helmF1}/>
          <image href={bodyF}/>
          <image href={clothF}/>
          <image href={handF}/>
          <image href={weapon2F}/>
          <image href={headF}/>
          <image href={helmF2}/>
        </svg>
    );
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
            <>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: 40, flexDirection: 'column', alignItems: 'center'}}>
                <span style={{display: 'block'}}>Estimated Points: {componentScore}</span>
                <span style={{display: 'block', marginTop: 20}}>Estimated Rank: {rank}</span>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <div style={{height: 450, width: 450}}>
                  <h4 style={{textAlign: 'center', marginTop: 5, marginBottom: 5}}>Male</h4>
                  {imageM}
                </div>
                <div style={{height: 450, width: 450, marginLeft: 50}}>
                  <h4 style={{textAlign: 'center', marginTop: 5, marginBottom: 5}}>Female</h4>
                  {imageF}
                </div>
              </div>
            </>
        )}
      </div>
  );
}

export default App;
