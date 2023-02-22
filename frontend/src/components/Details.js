import React from 'react'
import { Link } from 'react-router-dom'
const Details = (props) => {
    const {img,description,id,brand, price,name ,sname ,salt , simg , sprice, sid} =  props
  return (
    <>
    <div className='mx-4  my-3'>
 <img src={img.slice(18)}  width = "400" height = "450"alt="error"/>
 <h2>{name}</h2>
 <h2><b>{brand}</b></h2>{price}*inr
 <p>{description}</p>
 </div>
        </>
  )
}

export default Details