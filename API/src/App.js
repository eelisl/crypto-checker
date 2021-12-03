import './App.css';
import Title from './Components/Title';
import Crypto from './Components/Crypto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react';

function App() {
  
  //State hooks for checking visibility
  const [contentVisible, setContentVisible] = useState(false)

  //Immediately set interval for 5 seconds, then change visibility to true
  useEffect(() => {
    setInterval(()=>{
      setContentVisible(true)
    }, 3000)
  }, [])

  //Check to see if visibility is set to true, otherwise show titlescreen
  //Makes it easy to implement other useEffect hooks if needed (for example fetching immediately)

  if(contentVisible){
    return(
    /**
     * All components can be found in ./Components
     */
      <div className="App">
        {/*Header (not the same as title screen)*/}
        <header className="App-header">
          <div className="logo-wrapper animation-fade-in">
            <FontAwesomeIcon className="bitcoin-icon" icon={faBitcoin}/>
            <h1>Crypto Checker</h1>
          </div>
        </header>
        {/*Main content*/}
        <main>
            <Crypto />
        </main>
      </div>
    )
  }else{
    return(
      <Title/>
    )
  }
}

export default App;
