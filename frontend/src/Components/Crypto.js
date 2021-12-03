import React, { useEffect } from 'react';
import "./Crypto.css";
import Error from './Error';
import Result from './Result';
import Contact from './Contact';
import axios from 'axios';
import { useState } from 'react';


export default function Crypto() {
    
    /**
     * Set state hooks
     */

    //Set view, type string: can take values 'form', 'contact', 'result' 
    const [view, setView] = useState('form');
    //To check if loading, boolean
    const [loading, setLoading] = useState(false);
    //State for data from REST API
    const [data, setData] = useState(null);
    //State for From date
    const [startDate, setStartdate] = useState('');
    //State for End date
    const [endDate, setEnddate] = useState('');
    //for storing todays date
    const [today, setToday] = useState('');
    //check for the form input
    const [validInputStyle, setValidInputStyle] = useState("");
    //Array for errors, 0 index: message, 1 index: boolean
    const [error, setError] = useState(['', false]);
    
    /**
     * Immediately after load get todays date formatted 
     */

    useEffect(() => {
        let dd = new Date().getDate();
        let mm = new Date().getMonth() + 1;
        let yyyy = new Date().getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        } 

        setToday(yyyy + '-' + mm + '-' + dd)

    }, [])

    //Handles Submit

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        //Form validation, cannot be the same dates and enddate or startdate cant be empty
        
        if(startDate === endDate || endDate === '' || startDate === ''){
            setValidInputStyle('invalid')
        }else{

            setLoading(true)
            
            const dates = {
                    from: startDate,
                    to: endDate
            }

            //Using axios for API requests. Docs: https://axios-http.com/docs/intro

            axios.post('http://127.0.0.1:4000/', dates)
                .then((res) => {
                    setData(res.data)
                }).catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setView('result')
                    setLoading(false)
                })
            e.preventDefault();
        }
    }

    //function for handling the startdate
    //Purpose is to make sure that enddate is not bigger than startdate
    //Could be improved: when enddate is set, the startdate-input would automatically change its value to enddate - 1 day

    const handleStartDate = (value) =>{
        setStartdate(value)
        setEnddate('');
    }
    
    //One function to handle change in input

    const handleChange = (e) =>{
        e.preventDefault();
        e.target.name === "startdate"   ? handleStartDate(e.target.value)
                                        : e.target.name === "enddate"   ? setEnddate(e.target.value)
                                                                        : setError('Not a valid input, try again.')
    }

    /**
     * Navigation functions and warnings
     * 
     * Opted not to use React Router as per assigments request to minimize the libraries
     */

    const goBack = () => {        
        setView('form')
    }

    const goContact = () =>{
        setView('contact')
    }

    //When invalid input is made, clicking any input box will make it go away

    const handleClick = () =>{
        setValidInputStyle('')
    }

    const isValidInput = () =>{
        if(validInputStyle === 'invalid'){
            return(
            <div className="warning-container">
                <p class="invalid">Dates can't be the same or empty, try other dates</p>
            </div>
            )
        }else{
            return('')
        }
    }

    //rendering logic

    const checkView = () =>{
        if(view === 'result'){
            return (<div>
                        <Result data={data} dates={[startDate, endDate]} loading={loading} /> 
                        <button className="back-button" onClick={goBack}>Change dates</button>
                        <button className="back-button contact" onClick={goContact}>Contact info</button>
                    </div>)
        }else if(view==="contact"){
            return <Contact/>
        }else if(view==="form"){
            return(
            <div>
                <form className="animation-fade-in" onSubmit={handleSubmit}>
                    <div>
                        <label onClick={handleClick}>
                            <span className="label-text">From:</span>
                            <input type="date" className="calendar-date" onChange={handleChange} value={startDate} name="startdate" max={today} />
                        </label>
                        <label onClick={handleClick}>
                            <span className={`label-text`}>To:</span>
                            <input type="date" className={`calendar-date`} onChange={handleChange} value={endDate} name="enddate" min={startDate} max= {today}></input>
                        </label>
                        <input className="submit-button" type="submit" value="Submit"/>                   
                    </div>
                </form>
                {isValidInput()}                 {/*Will show warning, if invalid input*/}
            </div>
            )
        }
    }

    //Error handling

    if(error[1]){
        <Error error={error[0]}/>
    }

    //return render by using render logic

    return(
        <div className="form-wrapper">
            {checkView()}
        </div>
        )
}
