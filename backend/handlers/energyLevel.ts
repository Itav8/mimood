import prisma from "../db";

export const getEnergyLevel = async (req, res, next) => {
  try {
    const energyLevel = await prisma.energyLevel.findMany({
      select: {
        level: true,
        color: true,
      },
    });
    // console.log(energyLevel)
    res.json({ energyLevel });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
