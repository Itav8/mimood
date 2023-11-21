// import bcrypt from "bcrypt";
// import { randBetweenDate, randNumber, randProduct } from "@ngneat/falso";
// import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.energyLevel.deleteMany();
    await prisma.energyLevel.create({
      data: {
        level: "HIGH_ENERGY_UNPLEASANT",
        color: "red",
      },
    });
    await prisma.energyLevel.create({
      data: {
        level: "HIGH_ENERGY_PLEASANT",
        color: "yellow",
      },
    });
    await prisma.energyLevel.create({
      data: {
        level: "LOW_ENERGY_PLEASANT",
        color: "green",
      },
    });
    await prisma.energyLevel.create({
      data: {
        level: "LOW_ENERGY_UNPLEASANT",
        color: "blue",
      },
    });


    

  } catch (e) {
    console.log("Error in seeding", e);
  }
};
