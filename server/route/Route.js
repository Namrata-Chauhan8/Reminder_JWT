const express = require("express");
const User = require("../model/User"); 
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ email : req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully", newUser: newUser});
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "An error occurred while signing up" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id },"jxnftvbrmskelsodmcvjfnrutkslabvgsjq", { expiresIn: "1d" });
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(req.body);
    if (!user) {
      return res.status(400).json({ msg: 'Email does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }
    else{
      const token = generateToken(user._id);
      console.log(token)
      res.header('Access-Control-Allow-Credentials', true);
      const newCookieName = `token`;
      res.cookie(newCookieName, token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "strict",
        secure: true,
      });
      res.status(201).json({ msg: 'Login successful', user });
    }
    
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
