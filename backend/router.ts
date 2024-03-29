import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import {
  createMood,
  getMoods,
  getYesterdayMoods,
  updateMood,
} from "./handlers/mood";
import {
  createActivity,
  getActivities,
  getYesterdayActivities,
  updateActivity,
} from "./handlers/activity";
import {
  getEnergyLevel,
  getEnergyLevelFeelings,
  getUserEnergyLevel,
} from "./handlers/energyLevel";

const router = Router();

// ENERGY LEVEL
router.get("/energyLevel", getEnergyLevel);
router.get("/energyLevel/:id", getEnergyLevelFeelings);
router.get("/userEnergyLevel", getUserEnergyLevel);

// MOOD
router.post("/mood", handleInputErrors, createMood);
router.get("/moods", getMoods);
router.get("/moods/yesterday", getYesterdayMoods);
router.put("/moods/:id", handleInputErrors, updateMood);

// ACTIVITY
router.post("/activity", handleInputErrors, createActivity);
router.get("/activities", getActivities);
router.get("/activities/yesterday", getYesterdayActivities);
router.put("/activities/:id", handleInputErrors, updateActivity);

export default router;
