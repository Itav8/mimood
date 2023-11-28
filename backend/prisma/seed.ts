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
    await prisma.energyLevel.createMany({
      data: [
        {
          level: LEVELS.HIGH_ENERGY_UNPLEASANT,
          color: "red",
        },
        {
          level: LEVELS.HIGH_ENERGY_PLEASANT,
          color: "yellow",
        },
        {
          level: LEVELS.LOW_ENERGY_UNPLEASANT,
          color: "blue",
        },
        {
          level: LEVELS.LOW_ENERGY_PLEASANT,
          color: "green",
        },
      ],
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
    const highEnergyLevelUnpleasantItems =
      energyLevel.highEnergyLevelUnpleasant.map(
        (feeling: High_Energy_Unpleasant_Feelings) => {
          return {
            levelType: LEVELS.HIGH_ENERGY_UNPLEASANT,
            feelings: feeling,
          };
        }
      );

    await prisma.highEnergyUnpleasant.createMany({
      data: highEnergyLevelUnpleasantItems,
    });
    // HIGH ENERGY PLEASANT
    const highEnergyLevePleasantItems = energyLevel.highEnergyPleasant.map(
      (feeling: High_Energy_Pleasant_Feelings) => {
        return {
          levelType: LEVELS.HIGH_ENERGY_PLEASANT,
          feelings: feeling,
        };
      }
    );

    await prisma.highEnergyPleasant.createMany({
      data: highEnergyLevePleasantItems,
    });
    // LOW ENERGY UNPLEASANT
    const lowEnergyUnpleasantItems = energyLevel.lowEnergyUnpleasant.map(
      (feeling: Low_Energy_Unpleasant_Feelings) => {
        return {
          levelType: LEVELS.LOW_ENERGY_UNPLEASANT,
          feelings: feeling,
        };
      }
    );

    await prisma.lowEnergyUnpleasant.createMany({
      data: lowEnergyUnpleasantItems,
    });
    // LOW ENERGY PLEASANT
    const lowEnergyPleasantItems = energyLevel.lowEnergyPleasant.map(
      (feeling: Low_Energy_Pleasant_Feelings) => {
        return {
          levelType: LEVELS.LOW_ENERGY_PLEASANT,
          feelings: feeling,
        };
      }
    );

    await prisma.lowEnergyPleasant.createMany({
      data: lowEnergyPleasantItems,
    });
  } catch (e) {
    console.log("Error in seeding", e);
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
