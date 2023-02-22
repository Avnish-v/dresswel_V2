const express = require("express");
const app = express.Router();
const user = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const jwt_sc = "Avnskihbsdkjdmmnm";
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/FetchUser");
const bcryptjs = require("bcryptjs");
const productModel = require("../models/ShopingModel");
app.post("/create", async (req, res) => {
    let result = false;
    const { username, password, address, phone, email } = req.body;
    try {
        let data = await user.findOne({ email });
        if (data !== null) {
            return res.status(200).json({ result, error: "User exist " });
        }
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);
        data = await user.create({
            username: username,
            password: newpassword,
            address: address,
            phone: phone,
            email: email,
        });
        let ID = {
            id: data.id,
        };
        const AuthToken = jwt.sign(ID, jwt_sc);
        result = true;
        res.status(201).json({ result, AuthToken });
    } catch (error) {
        result = false;
        res.json({ result, error });
    }
});
//!login ---->
app.post("/login", async (req, res) => {
    let result = false;
    const { password, email } = req.body;
    try {
        let response = await user.findOne({ email });
        const compare = await bcrypt.compare(password, response.password);
        if (!compare) {
            res
                .status(400)
                .json({ result, error: "please enter correct cardential" });
        } else {
            result = true;
            let ID = {
                id: response.id,
            };
            const AuthToken = jwt.sign(ID, jwt_sc);
            res.json({ result, AuthToken });
        }
    } catch (error) {
        result = false;
        res.status(400).json({ result, error: "please enter correct cardential" });
    }
});
//! change password ---->  but there is the issue this service is only valid when the user is logged in ....>
app.put("/change", fetchUser, async (req, res) => {
    try {
        const { password, email } = req.body;
        const check = await user.findOne({ email });
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);
        const update = await user.updateOne(
            { email },
            { $set: { password: secpass } }
        );
        if (update) {
            result = true;
            res.status(201).json({ msg: "updation is done successfully", result });
        } else {
            result = false;
            res.status(400).json({ result });
        }
    } catch (error) {
        res.status(404).json({ error });
    }
});
// app.get("/setAddToCart", async (req, res) => {
//     try {
//         const Pid = req.query.id; // id hai woh indicate kar raha h product id
//         const tk = req.query.tk; //  tk indicate kar raha tha user jisne add kiya h uska token
//         let check = req.query.check; //  check agar true h toh wo addcart invoke kar raha h false h toh wishlist
//         let decode = jwt.decode(tk); // decode kar raha h tk ko toh user id milega5ds4f
//         // console.log(id,"            and        ",tk);
//         if (id === null && tk == null) {
//             res.json({ error: "please first login" });
//         } else {
//             let response = await productModel.findById(Pid); //  idhar we get the object of the product  ye product h jiska id add hoga
//             // console.log(response)
//             const ToFixDupliacte = await user.findById(decode.id); // ye jo id h wo user ka h isme db me cart add hoga
//             let arr = new Array();
//             if (check) {
//                 arr = ToFixDupliacte.cart;
//             } else if (check === false) {
//                 console.log("check is false ");
//                 arr = ToFixDupliacte.wishlist;
//                 // console.log("hey");
//             }
//             let isFlag; // flag liya h inital false h
//             console.log(arr); //! this where we check the cart is already there or not
//             if (!arr.length === 0) {
//                 arr.forEach(async (element) => {
//                     // console.log(element)
//                     if (element == response.id) {
//                         isFlag = true;
//                     } else {
//                         isFlag = false;
//                     }
//                 });
//             }
//             console.log("this is checking the flag ", isFlag);
//             console.log("hey");
//             if (isFlag) {
//                 res.json({ error: "the product is altready in the cart  " });
//                 //   console.log("hey already",decode.id)
//             } else {
//                 let update;
//                 if (check) {
//                     update = await user.updateOne(
//                         { _id: decode.id },
//                         { $push: { cart: response.id } }
//                     );
//                 } else if (check === false) {
//                     update = await user.updateOne(
//                         { _id: decode.id },
//                         { $push: { wishlist: response.id } }
//                     );
//                 }
//                 console.log(update);
//             }
//         }
//     } catch (error) {
//         res.json({ error: "the server is down" });
//     }
// });

app.get("/cart", async (req, res) => {
    try {
        const PID = req.query.id;
        const UID = req.query.tk;
        let check = req.query.check;
        let code  =  req.query.code;
        console.log("this is the " , code)
        //! this all the input  we get from the  url  product , user , and check wheather the cart or wishlist
        //* now we have to decode the UID
        let DecodeUID = jwt.decode(UID);
        let DetailedUID = await user.findById(DecodeUID.id);
        let DetailedPID = await productModel.findById(PID);
        //! now we have the object pof both product and the user...
        let Earray = new Array();
        //* now creating an empty arr and which dynamic
        //! now giving the value of array to cart and wishlist according to check
        let isCart;
        let update;
        if (check) {
          Earray = DetailedUID.cart;
          isCart = true;
        }     
    if(!check){
          Earray = DetailedUID.wishlist;
          isCart = false;
        }
        //* now creating the flag which give the cart is present in the cart or wishlist ;
        var Flag = true;
        if (Earray.length != 0) {
            Earray.forEach((element) => {
                if (element === PID) {
                    return (Flag = false);
                }
            });
        }
        if (Flag ===  true) {
            if (isCart  === true) {
                update = await user.updateOne(
                    { _id: DecodeUID.id },
                    { $push: { cart: DetailedPID.id } }
                );
                } else if(isCart ===  false) {
                update = await user.updateOne(
                    { _id: DecodeUID.id },
                    { $push: { wishlist: DetailedPID.id } }
                );
            }
            res.json({ "sucess" : "cart is inserted"});
        } else {
            res.json({ error: "the product is already there" });
        }
let remove; 
        if(isCart === true && code){
            remove  =  await user.updateOne({ _id: DecodeUID.id},{ $pull: { cart: PID }})  
        }else if (isCart === false && code){
            remove  =  await user.updateOne({ _id: DecodeUID.id},{ $pull: { wishlist: PID }})  
        }
    } catch (error) {
        res.json(error);
    }
});
app.get("/updatedCart", async (req, res) => {
    try {
        let token = req.query.token;
        let check = req.query.check;
        //! here we get the token and now we have to decode the token using the jwt;
        let deToken = jwt.decode(token);
        let retive = await user.find(deToken);
        let cart = new Array();
        retive.forEach(async (element) => {
            if (element.cart.length != 0) {
                if (check) {
                    cart = element.cart;
                } else if (!check) {
                    cart = element.wishlist;
                }
            }
        });
        let objectCart = new Array();
        for (let i = 0; i <= cart.length; i++) {
            let a = cart[i];
            let retrive = await productModel.findById(a);
            if (retrive != null) {
                objectCart[i] = retrive;
            }
        }
        res.send(objectCart);
    } catch (error) {
        res.error({ error });
    }
});

module.exports = app;
