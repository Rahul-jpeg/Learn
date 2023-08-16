var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.js";
import Course from "../models/course.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* GET */
export const currentUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers.user;
        if (userId === null) {
            return res.status(404).json({ Error: "User not found. Possibly logged out" });
        }
        const currentUser = yield User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ Error: "User not found" });
        }
        const outputUser = {
            id: req.headers.user,
            username: currentUser.username,
            purchasedCourses: currentUser.purchasedCourses
        };
        res.status(200).json({ User: outputUser });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
export const getMyCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers.user;
        if (!userId) {
            return res.sendStatus(500);
        }
        const user = yield User.findById(userId).populate('purchasedCourses');
        if (!user) {
            return res.status(404).json({ Message: "User not found" });
        }
        const purchasedCourses = user.purchasedCourses;
        res.status(200).json({ Courses: purchasedCourses });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
export const allCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course.find();
        const outputCourses = courses.filter((course => {
            return course.published === true;
        }));
        if (outputCourses.length !== 0) {
            return res.status(200).json({ Courses: outputCourses });
        }
        else {
            return res.status(404).json({ Message: "No courses available :(" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
/* POST */
export const handleUserSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const salt = yield bcrypt.genSalt();
        const passwordHash = yield bcrypt.hash(password, salt);
        const user = new User({
            username,
            password: passwordHash,
        });
        const savedUser = yield user.save();
        // res.status(201).send({ savedUser });
        const secret = process.env.USER_SECRET_KEY;
        if (secret) {
            const token = jwt.sign({ id: savedUser._id, role: "USER" }, secret);
            res.json({ token, savedUser });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Msg: err.message });
        }
    }
});
export const handleUserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        let user = yield User.findOne({ username });
        if (!user) {
            return res.status(400).json({ Message: "User does not exist" });
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({ Message: "Invalid Credentials" });
        }
        const secret = process.env.USER_SECRET_KEY;
        if (secret) {
            const token = jwt.sign({ id: user._id, role: "USER" }, secret);
            const outputUser = {
                _id: user._id,
                username: user.username,
                purchasedCourses: user.purchasedCourses
            };
            res.json({ token, "user": outputUser });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ Error: err.message });
        }
    }
});
export const purchaseCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.user;
    if (!userId) {
        return res.status(404).json({ Error: "User doesn't exist. Possibly logged out" });
    }
    const courseId = req.params.courseId;
    const course = yield Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ Message: "Course doesn't exist" });
    }
    yield User.findByIdAndUpdate(userId, { $push: { purchasedCourses: course._id } });
    res.status(201).json({ Message: "Course purchased successfully" });
});
