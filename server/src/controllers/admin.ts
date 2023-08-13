import Admin from "../models/admin.js";
import Course from "../models/course.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AdminDetails } from "../types/index.js"
import mongoose, { ObjectId } from "mongoose";

/* GET */

export const currentAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findById(req.headers.user);
        if (admin === null) {
            return res.status(404).json({ Error: "Admin not found. Possibly logged out" });
        }
        const outputDetails: AdminDetails = {
            id: req.headers.user,
            username: admin.username,
            createdCourses: admin.createdCourses,
        }

        res.status(200).json({ Admin: outputDetails });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json(error)
        }
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ Error: err.message })
        }
    }
}

export const getCreatedCourses = async (req: Request, res: Response) => {
    try {
        const adminId = req.headers.user;
        const courses = await Course.find({ author: adminId })
        res.json({ courses });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ Error: err.message })
        }
    }
}

export const getSpecificCourse = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);

        if (!course) return res.status(404).json({ Message: "Course not found" });

        return res.json({ course });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ Error: err.message });
        }
    }
};


/* POST */

export const handleAdminSignup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const inputAdmin = await Admin.find({ username: username })
        console.log(inputAdmin)
        if (!inputAdmin) {
            return res.status(400).json({ Error: "Username already exists" });
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const admin = new Admin({
            username,
            password: passwordHash,
            createdCourses: []
        })
        const savedAdmin = await admin.save();

        const outputAdmin: AdminDetails = {
            _id: savedAdmin._id,
            username: savedAdmin.username,
            createdCourses: savedAdmin.createdCourses

        }
        const secret = process.env.ADMIN_SECRET_KEY;
        if (secret) {
            const token = jwt.sign({ id: admin._id, role: "ADMIN" }, secret);
            res.status(201).json({ token, outputAdmin });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
}

export const handleAdminLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        let admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(400).json({ Message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(500).json({ Message: "Invalid Credentials" });
        }
        const secret = process.env.ADMIN_SECRET_KEY;

        if (secret) {
            const token = jwt.sign({ id: admin._id, role: "ADMIN" }, secret);
            const outputAdmin: AdminDetails = {
                _id: admin._id,
                username: admin.username,
                createdCourses: admin.createdCourses
            }
            res.json({ token, "admin": outputAdmin });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message })
        }
    }
}


export const createCourse = async (req: Request, res: Response) => {
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
        const savedCourse = await course.save();
        await Admin.findByIdAndUpdate(adminId, { $push: { createdCourses: course._id } });
        res.status(201).json({ Message: "Course created successfully", savedCourse });
    } catch (err) {
        if (err instanceof Error) {
            res.json({ Error: err.message })
        }
    }
}

/* PUT/PATCH */

export const editCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, imageLink, price } = req.body;
        const courseId = req.params.courseId;
        await Course.findByIdAndUpdate(courseId, { title, description, imageLink, price });
        res.status(200).json({ Message: "Successfully updated" });

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message })
        }
    }
}

export const publishCourse = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(req.params.courseId);
        const pubParam = req.query.pub;

        if (course) {
            let status = course.published;

            if (pubParam === 'true') {
                status = true;
            } else if (pubParam === 'false') {
                status = false;
            }
            const updatedCourse = await Course.findByIdAndUpdate(courseId, { published: status });
            res.status(200).json({ updatedCourse, Message: "Successfully updated" });
        } else {
            res.status(404).json({ Message: "Course not found" });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
};


/* DELETE */

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        const admin = await Admin.findById(req.headers.user);
        if (course === null) {
            return res.status(404).json({ Error: "course not found" })
        }
        if (!admin) {
            return res.status(500).json({ Error: "Cannot find the adminUser" })
        }
        if (title === course.title) {
            await Course.findByIdAndDelete(courseId);
            const courseIdToRemove = new mongoose.Types.ObjectId(courseId)
            if (admin.createdCourses.includes(courseIdToRemove)) {
                const result = await Admin.findByIdAndUpdate(req.headers.user, { $pull: { createdCourses: courseIdToRemove } })
                if (result) {
                    return res.status(200).json({ Message: "Course successfully deleted" });
                } else {
                    return res.status(500).json({ Message: "Failed to update" })
                }
            }
        } else {
            res.status(400).json({ Error: "The provided Course Name does not match the actual course name" });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message })
        }
    }
}
