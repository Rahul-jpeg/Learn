import mongoose, { ObjectId } from "mongoose";

export interface CourseType {
    title: string;
    description: string;
    imageLink: string;
    price: number;
    published: boolean;
    author: ObjectId
}
export interface AdminType {
    username: string,
    password: string,
    createdCourses: mongoose.Types.ObjectId[]
}


export interface AdminDetails {
    _id?: mongoose.Types.ObjectId,
    username: string,
    id?: string[] | string | null,
    createdCourses: mongoose.Types.ObjectId[]
}

export interface UserDetails {
    _id?: mongoose.Types.ObjectId,
    username: string,
    id?: string[] | string | null,
    purchasedCourses: mongoose.Types.ObjectId[]
}

export interface UserType {
    username: string,
    password: string,
    purchasedCourses: mongoose.Types.ObjectId[]
}

export interface OutputCourse {
    title: string,
    description: string,
    imageLink: string,
    price: number
}

export interface CourseType {
    title: string,
    description: string,
    imageLink: string,
    price: number,
    author: ObjectId;
}