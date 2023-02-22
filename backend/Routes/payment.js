const PublicKey = process.env.Public_Key;
const PrivateKey = process.env.Private_Key;
const stripe = require("stripe")(PrivateKey);
const express = require("express");
const path = require("path")
const app = express.Router();
// const bodyParser =  require("body-parser");
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.get("/pay" ,(req,res)=>{
    res.send({key:PublicKey})
}  )

// app.post("/payment" , async (req,res)=>{
//     console.log("hii")
//     stripe.customers.create({
//         email: req.body.stripeEmail,
//         source: req.body.stripeToken,
//         name: 'Gautam Sharma',
//         address: {
//         line1: 'TC 9/4 Old MES colony',
//         postal_code: '110092',
//         city: 'New Delhi',
//         state: 'Delhi',
//         country: 'India',
//         }
//         })
//         .then((customer) => {
         
//         return stripe.charges.create({
//         amount: 7000, // Charing Rs 25
//         description: 'Web Development Product',
//         currency: 'inr',
//         customer: customer.id
//         });
//         })
//         .then((charge) => {
//             console.log(customer)
//         res.send("Success") // If no error occurs
//         })
//         .catch((err) => {
//         res.send(err) // If some error occurs
//         });
//         })
app.post('/create-checkout-session', async (req, res) => {
  const cart  =  req.body.cartitem;
  console.log("this is the cart",cart)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: cart.name,
              description :cart.description,
              metadata:{
                id : cart.id

              }
             
            },
            unit_amount: cart.price *100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/checkout-sucess`,
      cancel_url: `${process.env.URL}`,
    });
  
    res.json({url:session.url});
  });
  

     module.exports = app;