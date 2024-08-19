const bcrypt = require('bcrypt');
const User = require('../models/User');
const { isValidEmail } = require('../utils/validators');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, phoneNo, age } = req.body;

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNo,
            age,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', token: generateToken(user._id),user: { name: user.name, email: user.email, phoneNo: user.phoneNo, age: user.age, _id:user._id } });
    } catch (error) {
        next(error);
    }
};