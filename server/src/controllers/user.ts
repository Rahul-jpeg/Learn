import User from "../models/user.js";
import Course from "../models/course.js";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { UserDetails } from "../types/index.js";
import mongoose from "mongoose";


/* GET */

export const currentUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.headers.user;
        if (userId === null) {
            return res.status(404).json({ Error: "User not found. Possibly logged out" });
        }
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ Error: "User not found" });
        }
        const outputUser: UserDetails = {
            id: req.headers.user,
            username: currentUser.username,
            purchasedCourses: currentUser.purchasedCourses
        }
        res.status(200).json({ User: outputUser });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message })
        }
    }
}

export const getMyCourses = async (req: Request, res: Response) => {
    try {
        const userId = req.headers.user;
        if (!userId) {
            return res.sendStatus(500);
        }
        const user = await User.findById(userId).populate('purchasedCourses');
        if (!user) {
            return res.status(404).json({ Message: "User not found" });
        }
        const purchasedCourses = user.purchasedCourses;

        // Use Promise.all to await all asynchronous operations
        const filteredCourses = await Promise.all(
            purchasedCourses.map(async (courseId) => {
                const course = await Course.findById(courseId);
                if (course && course.published === true) {
                    return course;
                }
                return null;
            })
        );

        // Remove null values (unpublished courses) from the filteredCourses array
        const publishedCourses = filteredCourses.filter(course => course !== null);

        res.status(200).json({ Courses: publishedCourses });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
}

export const allCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find();
        const outputCourses = courses.filter((course => {
            return course.published === true;
        }))
        if (outputCourses.length !== 0) {
            return res.status(200).json({ Courses: outputCourses });
        } else {
            return res.status(404).json({ Message: "No courses available :(" })
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message })
        }
    }
}

/* POST */

export const handleUserSignup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: passwordHash,
        });
        const savedUser = await user.save();
        // res.status(201).send({ savedUser });
        const secret = process.env.USER_SECRET_KEY;
        if (secret) {
            const token = jwt.sign({ id: savedUser._id, role: "USER" }, secret)
            res.json({ token, savedUser });
        }

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Msg: err.message })
        }
    }

}


export const handleUserLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ Message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(500).json({ Message: "Invalid Credentials" });
        }
        const secret = process.env.USER_SECRET_KEY;

        if (secret) {
            const token = jwt.sign({ id: user._id, role: "USER" }, secret);
            const outputUser: UserDetails = {
                _id: user._id,
                username: user.username,
                purchasedCourses: user.purchasedCourses
            }
            res.json({ token, "user": outputUser });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message })
        }
    }
}

export const purchaseCourse = async (req: Request, res: Response) => {
    const userId = req.headers.user;
    if (!userId) {
        return res.status(404).json({ Error: "User doesn't exist. Possibly logged out" })
    }
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ Message: "Course doesn't exist" });
    }
    await User.findByIdAndUpdate(userId, { $push: { purchasedCourses: course._id } });
    res.status(201).json({ Message: "Course purchased successfully" });
}

export const purchaseStatus = async (req: Request, res: Response) => {
    const userId = req.headers.user;
    if (!userId) {
        return res.status(404).json({ Error: "User doesn't exist. Possibly logged out" });
    }
    const courseId = req.params.courseId;
    const user = await User.findById(userId);
    if (!user) {
        return res.sendStatus(500);
    }
    const purchasedCourses = user.purchasedCourses;
    const id = new mongoose.Types.ObjectId(courseId)
    const status = purchasedCourses.includes(id)
    return res.status(200).json({ status: status });
}

export const getUserSpecificCourse = async (req: Request, res: Response) => {
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