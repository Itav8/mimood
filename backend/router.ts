import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import { createMood, getMoods, updateMood } from "./handlers/mood";
import {
  createActivity,
  getActivities,
  updateActivity,
} from "./handlers/activity";
import { getEverything } from "./handlers/user";

const router = Router();

// MOOD
router.post("/mood", handleInputErrors, createMood);
// Get all moods
router.get("/moods", getMoods);
// Get a mood by date

// Update a mood
router.put("/moods/:id", handleInputErrors, updateMood);

// ACTIVITY
// Create an activity
router.post("/activity", handleInputErrors, createActivity);
// Get all activites
router.get("/activities", getActivities);
// Get an activity by date

// Update an activity
router.put("/activities/:id", handleInputErrors, updateActivity);

// GET ALL
router.get("/moods/activities", getEverything);

export default router;
