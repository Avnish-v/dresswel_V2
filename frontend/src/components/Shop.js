import {React,useEffect,useState} from 'react'
import Item from './Item'

const Shop = (props) => {
  
  const [pro, setpro] = useState(0)
    const [data, setdata] = useState([])
   
    
    const fetchdata = async()=>{
let response  = await fetch(`http://localhost:8080/api/shop/${props.link}`)
setpro(30)
response =  await response.json()
setpro(50)
setdata(response.data)
setpro(100)
    }
useEffect(() => {

//  fetchdata();

 if(!localStorage.getItem("token")){
  window.onload = function (e) {
    window.location.reload(e)
  }
}
else{
  window.onload = function () {window.location.reload()}

}
//  reloads();

}, [])

    
  return ( <> 
  
    <div className="container" >

						<div className="row">
              <h2>

              </h2>
              
  {data.map((element)=>{
    
    return <div className="col-md-3 mx-4 my-3" key={element._id}>
      {/* {element.img.array.forEach(element => {
        
        console.log(element)
      })} */}
      {/* {console.log(element.img[0])} */}
      <Item 
    name = {element.name}
    price = {element.price}
    img = {element.img[0]}
    description = {element.description}
    id = {element._id}
    brand={element.brand}
    alt = 'internal server issue'
    />
    </div>
  })}
</div>
</div>

    </>
  )
}
export default Shop