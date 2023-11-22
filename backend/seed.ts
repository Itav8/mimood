// import bcrypt from "bcrypt";
// import { randBetweenDate, randNumber, randProduct } from "@ngneat/falso";
// import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

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
  } catch (e) {
    console.log("Error in seeding", e);
  }
};
