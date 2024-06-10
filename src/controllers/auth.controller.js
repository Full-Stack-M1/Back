// import User from "../models/user.model";
const User = require("../models/user.model");
const cryptPassword = require("../helpers/cryptPassword");
const generateToken = require("../helpers/generateToken");
const comparePassword = require("../helpers/comparePassword");

module.exports = {
  registerUser: async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = await cryptPassword(password);
    try {
      if (hashedPassword) {
        const user = await User.create({
          email,
          password: hashedPassword,
          username,
        });
        if (user) {
          const token = generateToken({ id: user.id });
          if (token) {
            res.status(201).json({
              token: token,
              success: true,
            });
          }
        }
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  },
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        res.status(200).json({
          user: user,
          success: true,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      // Recherchez l'utilisateur dans la base de données par son nom d'utilisateur
      const user = await User.findOne({ username });
      // Si l'utilisateur n'existe pas, retournez une erreur
      if (!user) {
        return res.status(401).json({
          message: "Invalid username or password",
          success: false,
        });
      }
      // Vérifiez si le mot de passe est correct
      const isPasswordValid = await comparePassword(password, user.password);
      // Si le mot de passe est incorrect, retournez une erreur
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid username or password",
          success: false,
        });
      }
      // Générez un token JWT pour l'utilisateur
      const token = generateToken({ id: user.id });
      // Retournez le token et un message de succès
      res.status(200).json({
        token,
        success: true,
      });
    } catch (error) {
      // En cas d'erreur, retournez une erreur interne du serveur
      console.error("Error logging in:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },
};
