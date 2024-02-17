import mongoose from "mongoose";
import { Product } from "../model/Product.js";

import { Order } from "../model/Orders.js";


export const createOrder =async (req, res) => {


    console.log(req.body)
    // return true

    try {
        const { fname, lname, userId, productId } = req.body

        
        if(!fname) {
            return res.status(400).json({ message: "fname is missing" })
        }
        if (!lname) {
            return res.status(400).json({ message: "lname is missing" })
        }
        if (!productId) {
            return res.status(400).json({ message: "productId is missing" })
        }
        if (!userId) {
            return res.status(400).json({ message: "userId is missing" })
        }

        const newOrder = new Order({
            fname,
            lname,
            productId,
            userId
        })

        const orderSaved = await newOrder.save() 
        
        return res.status(201).json({data:orderSaved,message: 'successfully ordered' });

    } catch (error) {
        return res.status(404).json({message: error.message || 'error' });      
    }
}

export const getOrders = async (req, res) => {

    const or = await Order.find()
    console.log(or)
    
    const orders= await Order.aggregate([
        {
            $lookup:{
                from:"products",
                localField:"productId",
                foreignField:"_id",
                as:"products"
            }
        }
    ])
    
    
    // return true
    // console.log(orders,'orders')
    const count= await Order.countDocuments();





    if (orders.length === 0) {
        return res.status(200).json({products:orders});
    } else {
        return res.status(200).json({ products: orders,count:count });
    }
}
