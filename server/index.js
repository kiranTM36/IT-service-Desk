require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { OAuth2Client } = require("google-auth-library");
const db = require("./db");

const app = express();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }
}));

app.post("/auth/google", async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ message: "Credential required" });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const profile = ticket.getPayload();

        if (!profile || !profile.sub || !profile.email || !profile.email_verified) {
            return res.status(401).json({ message: "Invalid Google account" });
        }

        const googleId = profile.sub;
        const name = profile.name || "";
        const email = profile.email;

        db.query(
            "SELECT * FROM users WHERE google_id = ?",
            [googleId],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Database error" });
                }

                const loginUser = (user) => {
                    req.session.userId = user.id;

                    req.session.save((sessionErr) => {
                        if (sessionErr) {
                            return res.status(500).json({ message: "Session error" });
                        }

                        return res.json({
                            message: "Login successful",
                            user
                        });
                    });
                };

                if (results.length > 0) {
                    const { id, google_id, name, email } = results[0];
                    return loginUser({ id, google_id, name, email });
                }

                db.query(
                    "INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)",
                    [googleId, name, email],
                    (insertErr, result) => {
                        if (insertErr) {
                            return res.status(500).json({ message: "Could not create user" });
                        }

                        loginUser({
                            id: result.insertId,
                            google_id: googleId,
                            name,
                            email
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: "Google login failed" });
    }
});

app.get("/auth/me", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not logged in" });
    }

    db.query(
        "SELECT id, name, email FROM users WHERE id = ?",
        [req.session.userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }

            if (!results.length) {
                return res.status(401).json({ message: "User not found" });
            }

            res.json({ user: results[0] });
        }
    );
});

app.listen(process.env.PORT || 5555, () => {
    console.log("Server running on port 5555");
});