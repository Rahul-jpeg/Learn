var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Admin from "../models/admin.js";
import Course from "../models/course.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
/* GET */
export const currentAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin.findById(req.headers.user);
        if (admin === null) {
            return res.status(404).json({ Error: "Admin not found. Possibly logged out" });
        }
        const outputDetails = {
            id: req.headers.user,
            username: admin.username,
            createdCourses: admin.createdCourses,
        };
        res.status(200).json({ Admin: outputDetails });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json(error);
        }
    }
});
export const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course.find();
        res.json({ courses });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ Error: err.message });
        }
    }
});
export const getCreatedCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.headers.user;
        const courses = yield Course.find({ author: adminId });
        res.json({ courses });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ Error: err.message });
        }
    }
});
export const getSpecificCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const course = yield Course.findById(courseId);
        if (!course)
            return res.status(404).json({ Message: "Course not found" });
        return res.json({ course });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ Error: err.message });
        }
    }
});
/* POST */
export const handleAdminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const inputAdmin = yield Admin.find({ username: username });
        console.log(inputAdmin);
        if (!inputAdmin) {
            return res.status(400).json({ Error: "Username already exists" });
        }
        const salt = yield bcrypt.genSalt();
        const passwordHash = yield bcrypt.hash(password, salt);
        const admin = new Admin({
            username,
            password: passwordHash,
            createdCourses: []
        });
        const savedAdmin = yield admin.save();
        const outputAdmin = {
            _id: savedAdmin._id,
            username: savedAdmin.username,
            createdCourses: savedAdmin.createdCourses
        };
        const secret = process.env.ADMIN_SECRET_KEY;
        if (secret) {
            const token = jwt.sign({ id: admin._id, role: "ADMIN" }, secret);
            res.status(201).json({ token, outputAdmin });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
export const handleAdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        let admin = yield Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ Message: "User does not exist" });
        }
        const isMatch = yield bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(500).json({ Message: "Invalid Credentials" });
        }
        const secret = process.env.ADMIN_SECRET_KEY;
        if (secret) {
            const token = jwt.sign({ id: admin._id, role: "ADMIN" }, secret);
            const outputAdmin = {
                _id: admin._id,
                username: admin.username,
                createdCourses: admin.createdCourses
            };
            res.json({ token, "admin": outputAdmin });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
export const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price, imageLink, } = req.body;
        const adminId = req.headers.user;
        const course = new Course({
            title,
            description,
            imageLink,
            price,
            published: false,
            author: adminId
        });
        const savedCourse = yield course.save();
        yield Admin.findByIdAndUpdate(adminId, { $push: { createdCourses: course._id } });
        res.status(201).json({ Message: "Course created successfully", savedCourse });
    }
    catch (err) {
        if (err instanceof Error) {
            res.json({ Error: err.message });
        }
    }
});
/* PUT/PATCH */
export const editCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, imageLink, price } = req.body;
        const courseId = req.params.courseId;
        yield Course.findByIdAndUpdate(courseId, { title, description, imageLink, price });
        res.status(200).json({ Message: "Successfully updated" });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
export const publishCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const course = yield Course.findById(req.params.courseId);
        const pubParam = req.query.pub;
        if (course) {
            let status = course.published;
            if (pubParam === 'true') {
                status = true;
            }
            else if (pubParam === 'false') {
                status = false;
            }
            const updatedCourse = yield Course.findByIdAndUpdate(courseId, { published: status });
            res.status(200).json({ updatedCourse, Message: "Successfully updated" });
        }
        else {
            res.status(404).json({ Message: "Course not found" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
/* DELETE */
export const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const courseId = req.params.courseId;
        const course = yield Course.findById(courseId);
        const admin = yield Admin.findById(req.headers.user);
        if (course === null) {
            return res.status(404).json({ Error: "course not found" });
        }
        if (!admin) {
            return res.status(500).json({ Error: "Cannot find the adminUser" });
        }
        if (title === course.title) {
            yield Course.findByIdAndDelete(courseId);
            const courseIdToRemove = new mongoose.Types.ObjectId(courseId);
            if (admin.createdCourses.includes(courseIdToRemove)) {
                const result = yield Admin.findByIdAndUpdate(req.headers.user, { $pull: { createdCourses: courseIdToRemove } });
                if (result) {
                    return res.status(200).json({ Message: "Course successfully deleted" });
                }
                else {
                    return res.status(500).json({ Message: "Failed to update" });
                }
            }
        }
        else {
            res.status(400).json({ Error: "The provided Course Name does not match the actual course name" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
