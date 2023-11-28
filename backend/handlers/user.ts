import { LEVELS } from "@prisma/client";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

// const LEVELS = {
//   HIGH_ENERGY_UNPLEASANT: "HIGH_ENERGY_UNPLEASANT",
//   HIGH_ENERGY_PLEASANT: "HIGH_ENERGY_PLEASANT",
//   LOW_ENERGY_UNPLEASANT: "LOW_ENERGY_UNPLEASANT",
//   LOW_ENERGY_PLEASANT: "LOW_ENERGY_PLEASANT",
// };

export const createNewUser = async (req, res) => {
  try {
    const hash = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        color: req.body.color,
        email: req.body.email,
        password: hash,
      },
    });

    const token = createJWT(user);

    const userEnergyLevel = await prisma.userEnergyLevel.createMany({
      data: [
        {
          color: req.body.color,
          userId: req.user.id,
          energyLevel: LEVELS.HIGH_ENERGY_UNPLEASANT,
        },
        {
          color: req.body.color,
          userId: req.user.id,
          energyLevel: LEVELS.HIGH_ENERGY_PLEASANT,
        },
        {
          color: req.body.color,
          userId: req.user.id,
          energyLevel: LEVELS.LOW_ENERGY_UNPLEASANT,
        },
        {
          color: req.body.color,
          userId: req.user.id,
          energyLevel: LEVELS.LOW_ENERGY_PLEASANT,
        },
      ],
    });

    console.log("USER ENERGY LEVEL", userEnergyLevel);
    res.json({ token });
  } catch (e) {
    console.log(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Invalid username or password" });
  }

  const token = createJWT(user);
  res.cookie("jwtToken", token, { httpOnly: false });
  res.json({ token });
};
