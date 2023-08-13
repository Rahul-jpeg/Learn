import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5
        },
        createdCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }],
    }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;