import prisma from "../db";

export const getEnergyLevel = async (req, res, next) => {
  try {
    const energyLevel = await prisma.energyLevel.findMany({
      select: {
        level: true,
        color: true,
      },
    });

    res.json({ energyLevel });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getEnergyLevelFeelings = async (req, res, next) => {
  const level = req.params.id;
  try {
    const feeling = await prisma.energyLevel.findUnique({
      where: {
        level,
      },
      include: {
        highEnergyUnpleasant: level === "HIGH_ENERGY_UNPLEASANT",
        highEnergyPleasant: level === "HIGH_ENERGY_PLEASANT",
        lowEnergyUnpleasant: level === "LOW_ENERGY_UNPLEASANT",
        lowEnergyPleasant: level === "LOW_ENERGY_PLEASANT",
      },
    });

    res.json({ feeling });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
