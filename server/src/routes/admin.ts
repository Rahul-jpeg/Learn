import express from 'express';
import {
    getAllCourses,
    getCreatedCourses,
    createCourse,
    getSpecificCourse,
    handleAdminSignup,
    handleAdminLogin,
    editCourse,
    publishCourse,
    deleteCourse,
    currentAdmin
} from "../controllers/admin.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

/* GET ROUTES */
router.get("/findme", verifyAdminToken, currentAdmin);
router.get("/allCourses", verifyAdminToken, getAllCourses);
router.get("/courses", verifyAdminToken, getCreatedCourses);
router.get("/getCourse/:courseId", verifyAdminToken, getSpecificCourse);

/* POST ROUTES */
router.post("/courses/new", verifyAdminToken, createCourse);
router.post("/signup", handleAdminSignup);
router.post("/login", handleAdminLogin);

// /* PUT/PATCH ROUTES */
router.put("/courses/:courseId", verifyAdminToken, editCourse);
router.patch("/courses/:courseId", verifyAdminToken, publishCourse);

// /* DELETE ROUTES */
router.delete("/courses/:courseId", verifyAdminToken, deleteCourse);

export default router;