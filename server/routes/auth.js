import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import cors from 'cors';  // Import the CORS package

const router = express.Router();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],       // Allow POST and GET requests
  credentials: true,               // Allow cookies to be sent
};

// Apply CORS middleware
router.use(cors(corsOptions));

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set `true` for production with HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (24 hours)
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.rows[0].id, email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sign in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set `true` for production with HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (24 hours)
    });

    res.json({
      message: 'Signed in successfully',
      user: { id: user.rows[0].id, email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sign out
router.post('/signout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Signed out successfully' });
});

export default router;
