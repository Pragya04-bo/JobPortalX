import { catchAsyncError } from "./catchAsyncError.js";
import ErrHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
//     const token = jwt.sign(
//   { id: "user123", role: "admin" }, 
//   process.env.JWT_SECRET_KEY,
//   { expiresIn: "1h" }
// );

    if (!token) {
        return res.json({
            success: false,
            message: "Please login first",
        });
    }
//     {
//   "id": "user123",
//   "role": "admin",
//   "iat": 1723225152,
//   "exp": 1723228752
// }
// id and role → the custom data you set.

// iat (issued at) → UNIX timestamp when the token was created.

// exp (expiry) → UNIX timestamp when the token will expire.

// {
//   id: "user123",
//   role: "admin",
//   iat: 1723225152,
//   exp: 1723228752
// }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        console.log(decoded);
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
});
// The token is in three parts (Base64 encoded):

// css
// Copy
// Edit
// header.payload.signature
// Header → contains the algorithm (e.g., HS256) and type ("JWT").

// Payload → contains the data (like id, email, expiresAt).

// Signature → a cryptographic hash of header + payload generated with your secret key.

// When you call jwt.verify(token, secret):

// It splits the token into the three parts.

// It recomputes the signature from the header.payload using the same secret key you provided (process.env.JWT_SECRET_KEY).

// It checks:

// Does the computed signature match the token’s signature?
// → If no, token has been tampered with → throw error.

// Is the token expired (based on exp in payload)?
// → If yes, throw error.

// If both checks pass, it decodes the payload and returns it (e.g., { id: '123', iat: ..., exp: ... }).