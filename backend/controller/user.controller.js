const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // include role
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role to 'customer' if not provided
    const userRole = role && ['customer', 'admin'].includes(role) ? role : 'customer';

    const user = new User({ name, email, password: hashedPassword, role: userRole });
    const savedUser = await user.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser, role: userRole });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; // optionally get role

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // If role is provided, check it matches
    if (role && role !== user.role) {
      return res.status(403).json({ message: `User is not a ${role}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Return user info and role
    res.json({ message: 'Login successful', user, role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Change password
// Change password
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: err.message });
  }
};
