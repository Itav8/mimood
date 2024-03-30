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
import { protect } from "./modules/auth";

const router = Router();

// ENERGY LEVEL
router.get("/energyLevel", protect, getEnergyLevel);
router.get("/energyLevel/:id", protect, getEnergyLevelFeelings);
router.get("/userEnergyLevel", protect, getUserEnergyLevel);

// MOOD
router.post("/mood", protect, handleInputErrors, createMood);
router.get("/moods", protect, getMoods);
router.get("/moods/yesterday", protect, getYesterdayMoods);
router.put("/moods/:id", protect, handleInputErrors, updateMood);

// ACTIVITY
router.post("/activity", protect, handleInputErrors, createActivity);
router.get("/activities", protect, getActivities);
router.get("/activities/yesterday", protect, getYesterdayActivities);
router.put("/activities/:id", protect, handleInputErrors, updateActivity);

export default router;
