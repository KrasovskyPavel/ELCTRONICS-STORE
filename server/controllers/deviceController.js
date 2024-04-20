import { v4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { Device } from "../models/models.js";
import ApiError from "../error/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    const { brandId, typeId } = req.query;
    let devices;
    if (!brandId && !typeId) {
      return (devices = Device.findAll());
    }
    return res.json(devices);
  }
  async getOne(req, res) {}
}

export default new DeviceController();
