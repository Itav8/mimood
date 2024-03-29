import dayjs from "dayjs";
import prisma from "../db";

export const createActivity = async (req, res, next) => {
  try {
    const activity = await prisma.activity.create({
      data: {
        name: req.body.name,
        feeling: req.body.feeling,
        description: req.body.description,
        userId: req.user.id,
        energyLevel: req.body.energyLevel,
      },
    });

    res.json({ data: activity });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getActivities = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        activities: {
          where: {
            createdDatetime: {
              gte: new Date(req.query.clientDate),
            },
          },
        },
      },
    });

    res.json({ activity: user.activities });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getYesterdayActivities = async (req, res, next) => {
  try {
    const yesterday = dayjs(req.query.clientDate).subtract(1, "day");

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        activities: {
          where: {
            createdDatetime: {
              gte: yesterday["$d"],
            },
          },
        },
      },
    });

    res.json({ activity: user.activities });
  } catch (e) {
    console.log("Failure to get yesterday's activities", e);
    next(e);
  }
};

export const updateActivity = async (req, res, next) => {
  try {
    const updatedActivity = await prisma.activity.update({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      data: {
        energyLevel: req.body.energyLevel,
        name: req.body.name,
        feeling: req.body.feeling,
        description: req.body.description,
      },
    });

    res.json({ updatedActivity });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
