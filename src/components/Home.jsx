import React from "react";
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../App.css'


export default function Home(){
    const [latLng,setLatLng] =useState({})
    const [hospitals,setHospitals] = useState([])
    const navigate = useNavigate();

    const Api = import.meta.env.VITE_REACT_API 
    console.log(Api)
    useEffect(() =>{
      if('geolocation' in navigator ){
          navigator.geolocation.getCurrentPosition((position) =>{
              setLatLng({
                  lat : position.coords.latitude,
                  lng : position.coords.longitude
              });
          }  )
          
      } 
  } ,[] )


  useEffect(()=> {
  
    if(Object.keys(latLng).length > 0 ){
      const geoAPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latLng.lng},${latLng.lat},5000&bias=proximity:${latLng.lng},${latLng.lat}&limit=20&apiKey=${Api}`
      axios.get(geoAPI).then(res => 
       {

        const featuresArr =  res.data.features;
        const namesArr = []
        featuresArr.map((feature) => namesArr.push(feature.properties) )
        setHospitals(namesArr)        
    }
          )
    }
  },[latLng])



  const handleClick = (hospital) =>{
    navigate('/more/',{state:hospital});
   }

  
 
  // console.log(hospitals)
 

    return(
        <div style={{backgroundColor:'#024C76'}} >
        <div style={{margin:40}} >
        <Row xs={1} md={2} className="g-4">
        {hospitals.map((hospital,index) =>{
           return(
            <Col key={index}   >
            <Card className="card" style={{cursor:'pointer',height:'100%'}} onClick={() => handleClick(hospital)} >
            <Card.Body className="colum" >
            <Card.Title>{hospital.name}</Card.Title>
            <Card.Text>
            {hospital.address_line2}
             </Card.Text>
            </Card.Body>
            </Card>
            </Col>
                  )
            } )
          }      
        </Row>
        </div>        
        </div>
        )
}


