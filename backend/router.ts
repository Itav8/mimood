import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import { createMood, getMoods, updateMood } from "./handlers/mood";
import {
  createActivity,
  getActivities,
  updateActivity,
} from "./handlers/activity";

const router = Router();

// MOOD
router.post("/mood", handleInputErrors, createMood);
router.get("/moods", getMoods);
router.put("/moods/:id", handleInputErrors, updateMood);

// ACTIVITY
router.post("/activity", handleInputErrors, createActivity);
router.get("/activities", getActivities);
router.put("/activities/:id", handleInputErrors, updateActivity);

export default router;
