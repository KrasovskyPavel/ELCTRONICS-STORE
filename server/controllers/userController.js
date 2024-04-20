import bctypt from "bcrypt";
import { User, Basket } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

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
    const jwt = jwt.sign({ id: user.id, email, role });
  }
  async login(req, res) {}
  async check(req, res) {}
}

export default new UserController();
