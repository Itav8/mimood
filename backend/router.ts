import { Router } from "express";

const router = Router()

router.get("/mood", (req, res) => {
  res.json({message: "jfjf"})
})

export default router
