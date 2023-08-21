import express from "express";
import {
    handleUserSignup,
    getMyCourses,
    currentUserInfo,
    allCourses,
    handleUserLogin,
    purchaseCourse,
    purchaseStatus,
    getUserSpecificCourse
} from '../controllers/user.js';
import { verifyUserToken } from "../middleware/auth.js";

const router = express.Router();

/* GET ROUTES */
router.get('/me', verifyUserToken, currentUserInfo);
router.get('/myCourses', verifyUserToken, getMyCourses);
router.get('/courses', verifyUserToken, allCourses);
router.get('/status/:courseId', verifyUserToken, purchaseStatus)
router.get('/course/:courseId', verifyUserToken, getUserSpecificCourse);

/* POST ROUTES */
router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);
router.post('/purchase/:courseId', verifyUserToken, purchaseCourse);


export default router;
