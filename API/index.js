/**
 * API for Crypto Checker
 */

const express = require('express');
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

app.use(bodyParser.json());
app.use(cors())

//Post Method to get the data from front
app.post('/', async (req, res, next) => {

    //handle date formatting
    const from = new Date(req.body.from).getTime() / 1000;
    const to = new Date(req.body.to).getTime() / 1000 + 3600;
    const currentdate = new Date();
    
    console.log(from + to)
    //Set variables
    var data = ''
    var array = []

    //Using axios for handling the requests, check docs https://axios-http.com/docs/intro
    //Getting crypto info from GeckoCoin API, docs https://www.coingecko.com/en/api/documentation

    await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`)
        .then(response => {
            
            data = response.data
            var idx = 0;

            /**
             * Cleaning the data: only one date per day
             * Requisite: near midnight
             */

            //for every entry in requested data object
            for (var key in data){
                //push a new empty array for easier datahandling
                array.push([])

                //loop through every index in current object key, 
                for(let i = 0; i<data[key].length; i++){

                    var currentDateInArray = new Date(data[key][i][0])
                    
                    //Check if current data entry date's hour is 0
                    if(currentDateInArray.getUTCHours() === 0){   
                        //are the requested date inputs under 90 days apart
                        if(to - from < 7776000 ){
                            //are the requested date inputs under 1 day apart
                            if(to - from < 86400 ){
                                array[idx].push(data[key][i])
                                i+=287
                            }else{
                                array[idx].push(data[key][i])
                                i+=23                            
                            }
                            
                        }else{
                        array[idx].push(data[key][i])
                        }
                    }
                }
                idx++
            }  
        })
        .catch(error => {
            console.log(error)
        })

    console.log(array)
        //A
    const bear = await longestBearingRange(array[0])
    //B
    const volume = await tradingVolume(array[1])
    //C
    const timemachine = await timeMachine(array[0])
    
    //Combine results

    funcresults = {
        ...bear,
        ...volume,
        ...timemachine
    }


    //Error handling and sending a response

    try{
        if(new Date(from) && new Date(to)){
            res.send(JSON.stringify(funcresults))
        }else{
            res.send(JSON.stringify({'error': 'Something went wrong. Try again another time.'}))
        }
    }catch(error){
        res.send(error)
    }
})


const longestBearingRange = (data) => {

    /*- Algoritmi, joka ottaa nykyisen hinnan ja vertaa sitä seuraavaan
    Jos seuraavan päivän hinta on pienempi kuin edellinen, lisää 1 päivä bear market days -muuttujaan
    Jos seuraavan päivän hinta on sama tai suurempi kuin eilen, tsekkaa onko currenBearMarket suurempi kuin maxBearMarket
    Jos on suurempi, muuta max arvo vastaamaan uutta
    Nollaa currentBearMarket
    palautetaan maxBearMarket */

    let maxBearMarket = 0
    let currentBearMarket = 0
    var log = []
    let index = 0

    while(index <= data.length){
        log.push(new Date(data[index][0]).toLocaleDateString);       
        let next = data[index+1]
        let now = data[index]
        
        if(index+1 >= data.length){
            return (
                {
                    "maxBearMarket": maxBearMarket,
                    "log": log
                }
            )
        }else{
            if(next[1] < now[1]){
                currentBearMarket++
            }else{
                currentBearMarket = 0
            }

            if(currentBearMarket > maxBearMarket){
                maxBearMarket = currentBearMarket
            }

            index++;
        }
    }
}

const tradingVolume = (data) => {

    /*
    - Ks. longest bearish range, muutamin muutoksin
    - siirretään objekti, jonka volume value on suurin, talteen
    - tsekataan tätä objektia vasten onko seuraavan päivän maxVolume suurempi
    - palautetaan kyseinen objekti
    */

    let maxVolume = data[0]

    for(let i=0; i<data.length; i++){
        if(data[i][1] > maxVolume[1]){
            maxVolume = data[i]
        }

    }

    return (
        {
            "maxVolume": maxVolume
        }
    )
}

const timeMachine = (data) => {
    
    var maxValueObject = data[0]
    var minValueObject = data[0]
    var maxprofit = 0
    var currentprofit = 0

    for(let i=0; i<data.length; i++){
        
        if(data[i][1] < minValueObject[1]){
            minValueObject = data[i]
            maxValueObject = data[i]
            currentprofit = 0
        }

        if(data[i][1] > minValueObject[1]){
            if(data[i][1] > maxValueObject[1]){
                maxValueObject = data[i]
                currentprofit = maxValueObject[1]-minValueObject[1]
                if(maxprofit < currentprofit){
                    maxprofit = currentprofit
                }
            }
        }
    }

    if(maxprofit === 0){
        minValueObject = null
        maxValueObject= null
    }

    return (
        {
            "maxProfit": maxprofit,
            "buy": minValueObject,
            "sell": maxValueObject
        }
    )
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})