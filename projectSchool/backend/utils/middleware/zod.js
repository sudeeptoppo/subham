const zod = require('zod');
const signup = (req, res, next) => {
    const signupBody = zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        email: zod.string().email(),
        password: zod.string(),
        role: zod.string().refine((val) => ["student", "teacher", "admin"].includes(val), { message: "Invalid role" })
    })
    try {
        req.success = signupBody.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({ message: err.issues[0].message });
    }
}

const login = (req, res, next) => {
    const loginBody = zod.object({
        email: zod.string().email(),
        password: zod.string()
    })
    try {
        req.success = loginBody.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({ message: err.issues[0].message });
    }
}

module.exports = { signup, login };