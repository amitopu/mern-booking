import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post(
    "/register",
    [
        check(
            "password",
            "password should be at least 6 chars or more"
        ).isLength({ min: 6 }),
        check("email", "email is required").isEmail(),
        check("firstName", "first name is required").isString(),
        check("lastName", "last name is required").isString(),
    ],
    async (req: Request, res: Response) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            user = new User(req.body);
            await user.save();

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "1d" }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
            });

            return res
                .status(200)
                .json({ message: "User registered successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

export default router;
