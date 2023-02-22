import {React,useEffect,useState} from 'react'

const AddToCart = () => {
 
  const params = new URLSearchParams(window.location.search)
  let datas = params.get('id')

  const [saveData, setsaveData] = useState([]);
  
  const  productdata =  async ()=>{
    if(datas){
      let localstorage = localStorage.getItem("token");
      let response  =  await fetch(`http://localhost:8080/api/auth/cart?id=${datas}&tk=${localstorage}&check=${true}`,{method : "GET" }) 
      response  =  await response.json();
      // console.log(response)
      // setID(response.data);
      // setsuggestion(response.Suggestion);
      // saveData(response.data);
      // console.log("resp",response.data)

    }
      }

      const SendData =  async ()=>{
        let localstorage = localStorage.getItem("token");
      let send =  await fetch(`http://localhost:8080/api/auth/updatedCart/?token=${localstorage}&check=${true} `,{method :"GET",});
      
     let response =  await send.json();
  console.log("this is the response we will get ",  response);

      }
     useEffect(() => {
  productdata();
  SendData();
     }, [])

  return (
   <>
   <h1>hello world</h1>
   
   </>
  )
}

export default AddToCart