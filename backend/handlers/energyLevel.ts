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
    const feelings = await prisma.energyLevel.findUnique({
      where: {
        level,
      },
      include: {
        highEnergyUnpleasant: true,
        highEnergyPleasant: true,
        lowEnergyUnpleasant: true,
        lowEnergyPleasant: true,
      },
    });

    res.json({ feelings });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
