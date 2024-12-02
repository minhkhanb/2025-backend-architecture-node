import { Router } from "express";
import { AppDataSource } from "../index";
import { User } from "../entity/User";

const router = Router();

router.get("/", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  user.name = name;
  user.email = email;
  await userRepository.save(user);
  res.status(201).json(user);
});

export default router;
