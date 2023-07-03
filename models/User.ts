import mongoose,{ models } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyEmailToken: String,
    verifyEmailTokenExpiry: Date,
    
});

const User =  models.User || mongoose.model("User", userSchema);

export default User;