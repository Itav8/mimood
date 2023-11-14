import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
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
  res.json({ token });
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
  res.json({ token: token });
};

// Get all
export const getEverything = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        moods: true,
        activities: true,
      },
    });

    res.json({ data: [user.moods, user.activities] });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
