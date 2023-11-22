// import bcrypt from "bcrypt";
// import { randBetweenDate, randNumber, randProduct } from "@ngneat/falso";
// import { faker } from "@faker-js/faker";
import {
  LEVELS,
  High_Energy_Unpleasant_Feelings,
  High_Energy_Pleasant_Feelings,
  Low_Energy_Unpleasant_Feelings,
  Low_Energy_Pleasant_Feelings,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
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

    const energyLevel = {
      highEnergyLevelUnpleasant: [
        "ENRAGED",
        "PANICKED",
        "STRESSED",
        "JITTERY",
        "SHOCKED",
        "LIVID",
        "FURIOUS",
        "FRUSTRATED",
        "TENSE",
        "STUNNED",
        "FUMING",
        "FRIGHTENED",
        "ANGRY",
        "NERVOUS",
        "RESTLESS",
        "ANXIOUS",
        "APPREHENSIVE",
        "WORRIED",
        "IRRITATED",
        "ANNOYED",
        "REPULSED",
        "TROUBLED",
        "CONCERNED",
        "UNEASY",
        "PEEVED",
      ],
      highEnergyPleasant: [
        "SURPRISED",
        "UPBEAT",
        "FESTIVE",
        "EXHILARATED",
        "ECSTATIC",
        "HYPER",
        "CHEERFUL",
        "MOTIVATED",
        "INSPIRED",
        "ELATED",
        "ENERGIZED",
        "LIVELY",
        "EXCITED",
        "OPTIMISTIC",
        "ENTHUSIASTIC",
        "PLEASED",
        "FOCUSED",
        "HAPPY",
        "PROUD",
        "THRILLED",
        "PLEASANT",
        "JOYFUL",
        "HOPEFUL",
        "PLAYFUL",
        "BLISSFUL",
      ],
      lowEnergyUnpleasant: [
        "DISGUSTED",
        "GLUM",
        "DISAPPOINTED",
        "DOWN",
        "APATHETIC",
        "PESSIMISTIC",
        "MOROSE",
        "DISCOURAGED",
        "SAD",
        "BORED",
        "ALIENATED",
        "MISERABLE",
        "LONELY",
        "DISHEARTENED",
        "TIRED",
        "DESPONDENT",
        "DEPRESSED",
        "SULLEN",
        "EXHAUSTED",
        "FATIGUED",
        "DESPAIRING",
        "HOPELESS",
        "DESOLATE",
        "SPENT",
        "DRAINED",
      ],
      lowEnergyPleasant: [
        "AT_EASE",
        "EASYGOING",
        "CONTENT",
        "LOVING",
        "FULFILLED",
        "CALM",
        "SECURE",
        "SATISFIED",
        "GRATEFUL",
        "TOUCHED",
        "RELAXED",
        "CHILL",
        "RESTFUL",
        "BLESSED",
        "BALANCED",
        "MELLOW",
        "THOUGHTFUL",
        "PEACEFUL",
        "COMFORTABLE",
        "CAREFREE",
        "SLEEPY",
        "COMPLACENT",
        "TRANQUIL",
        "COZY",
        "SERENE",
      ],
    };

    // HIGH ENERGY UNPLEASANT
    for (let i = 0; i < energyLevel.highEnergyLevelUnpleasant.length; i++) {
      const level: LEVELS = "HIGH_ENERGY_UNPLEASANT";
      const feeling: High_Energy_Unpleasant_Feelings = energyLevel
        .highEnergyLevelUnpleasant[i] as High_Energy_Unpleasant_Feelings;

      await prisma.highEnergyUnpleasant.createMany({
        data: {
          levelType: level,
          feelings: feeling,
        },
      });
    }
    // HIGH ENERGY PLEASANT
    for (let i = 0; i < energyLevel.highEnergyPleasant.length; i++) {
      const level: LEVELS = "HIGH_ENERGY_PLEASANT";
      const feeling: High_Energy_Pleasant_Feelings = energyLevel
        .highEnergyPleasant[i] as High_Energy_Pleasant_Feelings;

      await prisma.highEnergyPleasant.createMany({
        data: {
          levelType: level,
          feelings: feeling,
        },
      });
    }
    // LOW ENERGY UNPLEASANT
    for (let i = 0; i < energyLevel.lowEnergyUnpleasant.length; i++) {
      const level: LEVELS = "LOW_ENERGY_UNPLEASANT";
      const feeling: Low_Energy_Unpleasant_Feelings = energyLevel
        .lowEnergyUnpleasant[i] as Low_Energy_Unpleasant_Feelings;

      await prisma.lowEnergyUnpleasant.createMany({
        data: {
          levelType: level,
          feelings: feeling,
        },
      });
    }
    // LOW ENERGY PLEASANT
    for (let i = 0; i < energyLevel.lowEnergyPleasant.length; i++) {
      const level: LEVELS = "LOW_ENERGY_PLEASANT";
      const feeling: Low_Energy_Pleasant_Feelings = energyLevel
        .lowEnergyPleasant[i] as Low_Energy_Pleasant_Feelings;

      await prisma.lowEnergyPleasant.createMany({
        data: {
          levelType: level,
          feelings: feeling,
        },
      });
    }
  } catch (e) {
    console.log("Error in seeding", e);
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
