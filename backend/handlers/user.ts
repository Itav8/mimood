import { LEVELS } from "@prisma/client";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { colorBlend, convertHexToRGB } from "../utils/colorBlend";

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

    const rgbColor = convertHexToRGB(user.color);
    const blendedColor = colorBlend(rgbColor);

    const userEnergyLevelData = Object.entries(blendedColor).map(
      ([level, color]: [LEVELS, string]) => {
        return {
          color,
          userId: user.id,
          energyLevel: level,
        };
      }
    );
    const userEnergyLevel = await prisma.userEnergyLevel.createMany({
      data: userEnergyLevelData,
    });

    console.log("USER ENERGY LEVEL", userEnergyLevel);
    const token = createJWT(user);
    res.cookie("jwtToken", token, { httpOnly: false });
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
