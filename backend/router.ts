import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import { createMood, getMoods, updateMood } from "./handlers/moods";

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
router.post("/activity", handleInputErrors)
// Get all activites
// Get an activity by date
// Update an activity

export default router;
