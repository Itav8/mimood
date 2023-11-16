import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import { createMood, getMoods, updateMood } from "./handlers/mood";
import {
  createActivity,
  getActivities,
  updateActivity,
} from "./handlers/activity";
import { getMoodsAndActivities } from "./handlers/user";

const router = Router();

// MOOD
router.post("/mood", handleInputErrors, createMood);
router.get("/moods", getMoods);
router.put("/moods/:id", handleInputErrors, updateMood);

// ACTIVITY
router.post("/activity", handleInputErrors, createActivity);
router.get("/activities", getActivities);
router.put("/activities/:id", handleInputErrors, updateActivity);

// MOOD AND ACTIVITY
router.get("/moods/activities", getMoodsAndActivities);

export default router;
