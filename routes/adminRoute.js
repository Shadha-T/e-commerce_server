import express, { Router } from "express";
import { register, login,getAdmin,getAllAdmin } from "../controller/adminController.js";
import { verifyAdminToken } from "../middleware/AdminTokenVerify.js";


const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/:id', getAdmin);
router.get('/', getAllAdmin);
// router.put('/:id', getAdmin);

export default router;

