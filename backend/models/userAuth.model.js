import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Freelancer", "Employer"],
        default: "Employer",
        required: true,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
