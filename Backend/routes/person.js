import express from "express";
import {
  createPersonDetail,
  deletePersonalDetails,
  getFilterData,
  getPersonDetails,
  updatePersonDetails,
} from "../controllers/person.js";
import Person from "../model/person.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createPersonDetail);
router.get("/", protect, getPersonDetails);
router.get("/filter", protect, getFilterData);
router.patch("/:id", protect, updatePersonDetails);
router.delete("/:id", protect, deletePersonalDetails);

export default router;
