import React from 'react'
import AddToCart from './AddToCart'
import ProductDet from './ProductDet'
import WishList from './WishList'
const params = new URLSearchParams(window.location.search)
let data = params.get('id')
const GetId = () => {
  return (
    <>
    <WishList data= {data}/>
    <ProductDet data= {data}/>
    <AddToCart data= {data}/>
    </>
  )
}

export default GetId

