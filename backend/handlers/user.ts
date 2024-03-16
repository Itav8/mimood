import { LEVELS } from "@prisma/client";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { colorBlend, convertHexToRGB } from "../utils/colorBlend";

export const createNewUser = async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.email ||
      !req.body.lastName ||
      !req.body.password
    ) {
      res
        .status(400)
        .json({ status: 400, message: "Missing required field(s)" });
      throw new Error("Missing required field(s)");
    }

    const emailExist = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (emailExist) {
      res.status(409).json({ status: 409, message: "Account already exist" });
      throw new Error("Account already exist");
    }

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

    const token = createJWT(user);
    res.cookie("jwtToken", token, { httpOnly: false });
    res.status(200).json({
      token,
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      color: user.color,
      email: user.email,
    });
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!user) {
    res.status(404).json({ status: 404, message: "User does not exist" });
    throw new Error("User does not exist");
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).json({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }

  const token = createJWT(user);
  res.cookie("jwtToken", token, { httpOnly: false });
  res.json({ token });
};

export const logout = async (req, res) => {
  res.clearCookie("jwtToken");
  res.status(200).json({ status: 200, message: "Successfully logged out" });
};
