import bcrypt from "bcryptjs";
import Express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import verifyToken from "../middleware/auth";

const router = Express.Router();

router.post(
    "/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password must be at least 6 chars long").isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        // const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(500).json({
                    message: "Either email/password of both unmatched.",
                });
            }
            const isPasswordMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isPasswordMatch) {
                return res.status(500).json({
                    message: "Either email/password of both unmatched.",
                });
            }

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
                .json({ userId: user._id, message: "Login successful" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "something went wrong" });
        }
    }
);

router.get("/verifytoken", verifyToken, (req: Request, res: Response) => {
    return res.status(200).send({ userId: req.userId });
});

export default router;
