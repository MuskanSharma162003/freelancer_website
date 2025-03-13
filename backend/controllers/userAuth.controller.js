import { User } from "../models/userAuth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!role || !['Freelancer', 'Employer'].includes(role)) {
            return res.status(400).json({ message: "Role must be either 'Freelancer' or 'Employer'" });
        }
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error while registering user:", error);
        res.status(500).json({ message: "Error while registering user", error: error.message });
    }
};

// Login


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: "Please fill all fields" });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const tokenData = { userId: user._id };
//         const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
//         res.status(200).json({ message: "Logged in successfully", token });
//     } catch (error) {
//         console.error("Error while logging in user:", error);
//         res.status(500).json({ message: "Error while logging in user", error: error.message });
//     }
// };

export const getUserProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user.userId); // Corrected line
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error });
  }
};