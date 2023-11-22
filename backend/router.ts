import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import { createMood, getMoods, updateMood } from "./handlers/mood";
import {
  createActivity,
  getActivities,
  updateActivity,
} from "./handlers/activity";
import { getEnergyLevel, getEnergyLevelFeelings } from "./handlers/energyLevel";

const router = Router();

// ENERGY LEVEL
router.get("/energyLevel", getEnergyLevel);
router.get("/energyLevel/:id", getEnergyLevelFeelings);

// MOOD
router.post("/mood", handleInputErrors, createMood);
router.get("/moods", getMoods);
router.put("/moods/:id", handleInputErrors, updateMood);

// ACTIVITY
router.post("/activity", handleInputErrors, createActivity);
router.get("/activities", getActivities);
router.put("/activities/:id", handleInputErrors, updateActivity);

export default router;
