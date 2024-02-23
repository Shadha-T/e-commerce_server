import express, { Router } from "express";
import { register, login, getUser,getTransactions } from "../controller/userController.js";
import { addToCart, listCart } from "../controller/OrderController.js";


const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/transactions', getTransactions);
router.post('/addtocart',addToCart)
router.get('/listCart',listCart)
router.get('/:id', getUser);
// router.put('/:id', getAdmin);

export default router;

