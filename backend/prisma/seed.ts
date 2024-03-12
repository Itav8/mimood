// import bcrypt from "bcrypt";
// import { randBetweenDate, randNumber, randProduct } from "@ngneat/falso";
import { faker } from "@faker-js/faker";
import {
  LEVELS,
  High_Energy_Unpleasant_Feelings,
  High_Energy_Pleasant_Feelings,
  Low_Energy_Unpleasant_Feelings,
  Low_Energy_Pleasant_Feelings,
  PrismaClient,
} from "@prisma/client";
import { hashPassword } from "../modules/auth";
import { colorBlend, convertHexToRGB } from "../utils/colorBlend";

const prisma = new PrismaClient();

const main = async () => {
  try {

    await prisma.energyLevel.createMany({
      data: [
        {
          level: LEVELS.HIGH_ENERGY_UNPLEASANT,
          color: "#FF0000",
        },
        {
          level: LEVELS.HIGH_ENERGY_PLEASANT,
          color: "#FFFF00",
        },
        {
          level: LEVELS.LOW_ENERGY_UNPLEASANT,
          color: "#0000FF",
        },
        {
          level: LEVELS.LOW_ENERGY_PLEASANT,
          color: "#00FF00",
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

    const hash = await hashPassword("password");

    const user = await prisma.user.create({
      data: {
        firstName: "Italiz",
        lastName: "Vazquez",
        color: "#61abff",
        email: "italizv@gmail.com",
        password: hash,
      },
    });

    const rgbColor = convertHexToRGB(user.color);
    const blendedColor = colorBlend(rgbColor);

    const userEnergyLevelData = Object.entries(blendedColor).map(
      ([level, color]: [LEVELS, string]) => {
        return {
          color,
          userId: user.id,
          energyLevel: level,
        };
      }
    );

    await prisma.userEnergyLevel.createMany({
      data: userEnergyLevelData,
    });

    const lowEnergyPleasantMoodData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          description: faker.lorem.text(),
          energyLevel: LEVELS.LOW_ENERGY_PLEASANT,
          feeling: energyLevel.highEnergyPleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.mood.createMany({
      data: lowEnergyPleasantMoodData,
    });

    const lowEnergyUnpleasantMoodData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          description: faker.lorem.text(),
          energyLevel: LEVELS.LOW_ENERGY_UNPLEASANT,
          feeling: energyLevel.lowEnergyUnpleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.mood.createMany({
      data: lowEnergyUnpleasantMoodData,
    });

    const highEnergyPleasantMoodData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          description: faker.lorem.text(),
          energyLevel: LEVELS.HIGH_ENERGY_PLEASANT,
          feeling: energyLevel.highEnergyPleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.mood.createMany({
      data: highEnergyPleasantMoodData,
    });

    const highEnergyUnpleasantMoodData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          description: faker.lorem.text(),
          energyLevel: LEVELS.HIGH_ENERGY_UNPLEASANT,
          feeling: energyLevel.highEnergyLevelUnpleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.mood.createMany({
      data: highEnergyUnpleasantMoodData,
    });

    const lowEnergyPleasantActivityData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          name: faker.word.words(3),
          description: faker.lorem.text(),
          energyLevel: LEVELS.LOW_ENERGY_PLEASANT,
          feeling: energyLevel.highEnergyPleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.activity.createMany({
      data: lowEnergyPleasantActivityData,
    });

    const lowEnergyUnpleasantActivityData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          name: faker.word.words(3),
          description: faker.lorem.text(),
          energyLevel: LEVELS.LOW_ENERGY_UNPLEASANT,
          feeling: energyLevel.lowEnergyUnpleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.activity.createMany({
      data: lowEnergyUnpleasantActivityData,
    });

    const highEnergyPleasantActivityData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          name: faker.word.words(3),
          description: faker.lorem.text(),
          energyLevel: LEVELS.HIGH_ENERGY_PLEASANT,
          feeling: energyLevel.highEnergyPleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.activity.createMany({
      data: highEnergyPleasantActivityData,
    });

    const highEnergyUnpleasantActivityData = Array.from(Array(3).keys()).map(
      (_, i) => {
        return {
          name: faker.word.words(3),
          description: faker.lorem.text(),
          energyLevel: LEVELS.HIGH_ENERGY_UNPLEASANT,
          feeling: energyLevel.highEnergyLevelUnpleasant[i],
          userId: user.id,
        };
      }
    );

    await prisma.activity.createMany({
      data: highEnergyUnpleasantActivityData,
    });
  } catch (e) {
    console.log("Error in seeding", e);
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
