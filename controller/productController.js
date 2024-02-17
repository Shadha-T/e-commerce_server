import mongoose from "mongoose";
import { Product } from "../model/Product.js";


export const createProduct =async (req, res) => {



    try {
        const { profile,name, price, details } = req.body
mongoose.connection.collection("product").insertOne({...req.body,profile:req.file?.filename})
res.json({message:"uploaded"})
        
       

        
     
        if (!name) {
            return res.status(400).json({ message: "name is missing" })
        }
        if (!price) {
            return res.status(400).json({ message: "price is missing" })
        }
        if (!details) {
            return res.status(400).json({ message: "details is missing" })
        }

        const isProductExist = await Product.findOne({name:name})


      
        if(!!isProductExist){
            return res.status(400).json({ message: "product name is exising , please enter another one" })
        }
        

        const newProduct = new Product({
            profile:profile,
            name:name,
            details:details,
            price:price
        })
        
        
        const createdProduct = await newProduct.save();
        return res.status(201).json({data:createdProduct,message: 'successfully inserted product into db' });

    } catch (error) {
        return res.status(404).json({message: error.message || 'error' });      
    }
}

export const getProducts = async (req, res) => {
    const Products= await Product.find()


    if (Products.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ products: Products });
    }
}


export const getProductById = async (req, res) => {

    const response = await mongoose.connection.collection("product").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if (response) {
        return res.status(200).json({ product: response });
    } else {
        return res.status(404).json("no entries yet");
    }
}

export const deleteProductById = async (req, res) => {

    try {
        
        if(!req.params.id){
            return res.status(400).json({ message: "error while deleting!" });
        }
    
        await Product.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "deleted" });
        
    } catch (error) {
        return res.status(200).json({ message: error.message || "deleted" });
        
    }
}


export const updateProductById = async (req, res) => {

    console.log(req.params.id);

    // return true

    // const response = await mongoose.connection.collection("product").findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) },{$set:req.body})
    try {
        
        if(!req.params.id){
            return res.status(400).json({ message: "error while deleting!" });
        }
    
        await Product.findByIdAndUpdate(req.params.id,{$set:req.body})
            return res.status(200).json({ message: "updated" });
        
    } catch (error) {
        return res.status(400).json({ message: error.message || "updated" });
        
    }
   
}

