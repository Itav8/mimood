,
import prisma from "../db";

export const createMood = async (req, res, next) => {
  try {
    const mood = await prisma.mood.create({
      data: {
        feeling: req.body.feeling,
        description: req.body.description,
        userId: req.user.id,
        energyLevel: req.body.energyLevel,
      },
    });

    res.json({ data: mood });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getMoods = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        moods: true,
      },
    });

    res.json({ mood: user.moods });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const updateMood = async (req, res, next) => {
  try {
    const updatedMood = await prisma.mood.update({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      data: {
        feeling: req.body.feeling,
        description: req.body.description,
      },
    });

    res.json({ updatedMood });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
