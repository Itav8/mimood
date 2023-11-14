import prisma from "../db";

// Create an activity
export const createActivity = async (req, res, next) => {
  try {
    const activity = await prisma.activity.create({
      data: {
        name: req.body.name,
        description: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: activity });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
// Get all activites
export const getActivities = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        activities: true,
      },
    });

    res.json({ data: user.activities });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
// Get an activity by date

// Update an activity
export const updateActivity = async (req, res, next) => {
  try {
    const updatedActivity = await prisma.activity.update({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
      },
    });

    res.json({ data: updatedActivity });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
