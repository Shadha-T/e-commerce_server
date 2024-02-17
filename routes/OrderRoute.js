import express, { Router } from "express";
import { verifyAdminToken } from "../middleware/AdminTokenVerify.js";
import { createOrder, getOrders } from "../controller/orderController.js";


const router = Router()

router.post('/', createOrder);
router.get('/', getOrders);
// router.get('/:id',verifyAdminToken, getAdmin);
// router.get('/',verifyAdminToken, getAllAdmin);
// router.put('/:id', getAdmin);

export default router;