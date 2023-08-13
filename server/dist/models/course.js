import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    published: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        unique: false
    }
});
const Course = mongoose.model("Course", CourseSchema);
export default Course;
