import bctypt from "bcrypt";
import { User, Basket } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class UserController {
  async register(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bctypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = jwt.sign(
      { id: user.id, email, role },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь с таким email не найден"));
    }
    let comparePassword = bctypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Неправильный логин или пароль"));
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    return res.json({ token });
  }
  async check(req, res) {
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email, role: req.user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    return res.json({ token });
  }
}

export default new UserController();
