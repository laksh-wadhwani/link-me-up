import React, { useEffect, useState } from "react";
import './cities.css';
import axios from "axios";
import { Link } from "react-router-dom";

const Lahore=()=>{

    const [ispDetails, setIspDetails] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:9002/renderIsps")
        .then(response => { 
            const filteredIsps = response.data.filter(isp => isp.cityName==='lahore')
            setIspDetails(filteredIsps); 
        })
        .catch(error => alert("Error in fetching ISP's Details", error))
    },[])

    return(
        <>
        <div className="cityLine-mainBox">
            <h1 className="cityLine">LAHORE'S BEST ISP'S</h1>
        </div>
        <div className="ISPBoxes">
            {ispDetails.map(isp => (
                <Link style={{textDecoration: 'none'}} to={`/Packages/${isp._id}`}><div key={isp._id} className="ispRender">
                    <img className="ispRender-picture" src={isp.ispProfile? `http://localhost:9002/${isp.ispName}/${isp.ispProfile}`:"../NoImage.jpg"}alt="ISP's Profile"/>
                    <h2 className="ispRender-name">{isp.ispName}</h2>
                </div></Link>
            ))}
        </div>
        </>
    );
}

export default Lahore