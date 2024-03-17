import dayjs from "dayjs";
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
    const startToday = new Date(req.query.clientDate);
    const endToday = new Date(new Date(startToday).setHours(23, 59, 59, 999));

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        moods: {
          where: {
            createdDatetime: {
              gte: new Date(req.query.clientDate),
            },
          },
        },
      },
    });

    res.json({ mood: user.moods });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getYesterdayMoods = async (req, res, next) => {
  try {
    const yesterday = dayjs(req.query.clientDate).subtract(1, "day");
    console.log("HERE", yesterday);
    console.log("TEST", yesterday['$d'])

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        moods: {
          where: {
            createdDatetime: {
              gte: yesterday["$d"],
            },
          },
        },
      },
    });

    console.log("MOOODS", user.moods);
    res.json({ mood: user.moods });
  } catch (e) {
    console.log("Failure to get yesterday's moods", e);
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
        energyLevel: req.body.energyLevel,
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
