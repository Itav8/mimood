import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";

const router = Router()

// Create a mood

// Get all moods
router.get("/moods", handleInputErrors, (req, res) => {
  res.json({message: "jfjf"})
})

// Get a mood by date
// Update a mood

// Create an activity
// Get all activites
// Get an activity by date
// Update an activity

export default router
