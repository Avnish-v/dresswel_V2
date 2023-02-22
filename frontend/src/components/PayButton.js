import React from 'react';
import axios from 'axios';


const PayButton = ({cartitem}) => {
    const handleCheckOut = ()=>{
        axios.post(`http://localhost:8080/api/Payment/create-checkout-session`,{
          cartitem,
          id :localStorage.getItem("token")
        }).then((res)=>{
          if(res.data.url){
            console.log(res.data.url)
            window.location.href = res.data.url

          }
        }).catch((err)=>{
          console.log(err.message);
        })

    }
  return (
    <button onClick={()=>{handleCheckOut()}}>checkout</button>
  )
}

export default PayButton