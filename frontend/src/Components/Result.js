import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'

export default function Result(props) {
   
    //taking props

    const dates = props.dates
    const bearDays = props.data.maxBearMarket
    const maxVolume = props.data.maxVolume
    const maxProfit = props.data.maxProfit
    const buy = props.data.buy
    const sell = props.data.sell

    //function to handle the unfortunate case that people can't use their time machine (check assignment from read.me)

    const checkProfit = () => {
        if(maxProfit === 0){
            return(
                <div className="result-container timemachine sad">
                    <p>Don't fire up the time machine. Between the time frame, the price only goes down :/</p>
                </div>
            )
        }else{
            return(
                <div className="result-container timemachine happy">
                    <h1>Fire up the time machine!</h1>
                    <div className="buy-sell-container">
                        <div className= "result-text">
                        <p>Best day to buy bitcoin was </p><p>{new Date(buy[0]).toLocaleDateString()},</p><p> one coin was worth<br/>{Math.round(buy[1]*100) / 100} euros</p>
                        </div>
                        <div className="result-text">
                        <p>Best day to sell Bitcoin was </p><p>{new Date(sell[0]).toLocaleDateString()},</p><p>one coin was worth<br/>{Math.round(sell[1]*100) / 100} euros</p>
                        </div>
                        <div className="result-text">
                        <p>The total profit would have been</p><p><span className="bold-text">{Math.round(maxProfit/buy[1]*100*100) / 100}%</span></p>
                        </div>
                    </div>
                </div>
            )
        }
    }
    //Fancy loading screen
    if(props.loading){
        return(<div className="loading-container">
                <h2>Fetching data<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span></h2>
                <FontAwesomeIcon className="loading-icon" icon={faBitcoin}/>
            </div>)
    }else{
        //Main logic for rendering
        return (
            <div>
                <h1 className="result-title">{`You chose days between `}<br/>{`${new Date(dates[0]).toLocaleDateString()} and ${new Date(dates[1]).toLocaleDateString()}`}</h1>
                <div className="result-wrapper">
                    <div className="result-container"><p>{`Between your chosen days, there ${bearDays === 1 ? ' was ' : ' were '}`}</p><p><span className="bold-text">{`${bearDays} day${bearDays === 1 ? ' ' : 's '}`}</span></p><p>{` long downward trend`} <br/>(aka. Bear Market.)</p></div>
                    <div className="result-container"><p>{new Date(maxVolume[0]).toLocaleDateString()} was the day of maximum volume, Bitcoin was traded for </p><p><span className="bold-text">{Math.round(maxVolume[1]*100) / 100} euros</span></p><p>That is roughly {Math.round(maxVolume[1]/10000000) / 100} billion dollars.</p></div>
                    {checkProfit()}
                </div>
            </div>
        )
    }
}
