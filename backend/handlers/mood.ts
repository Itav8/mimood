import prisma from "../db";

// Create a mood
export const createMood = async (req, res, next) => {
  try {
    const mood = await prisma.mood.create({
      data: {
        type: req.body.type,
        description: req.body.description,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: mood });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
// Get all moods
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

    res.json({ data: user.moods });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

// Get a mood by date

// Update a mood
export const updateMood = async (req, res, next) => {
  try {
    const updatedMood = await prisma.mood.update({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
      data: {
        type: req.body.type,
        description: req.body.description,
      },
    });

    res.json({ data: updatedMood });
  } catch (e) {
    console.log(e);
    next(e);
  }
};