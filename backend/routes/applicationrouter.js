import express from "express";
import { JobSeekerDeleteApplication, JobSeekerGetAllApplication, employerGetAllApplication, postApplication } from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/employer/allApplications",isAuthorized,employerGetAllApplication);
router.get("/JobSeeker/allApplications",isAuthorized,JobSeekerGetAllApplication);
router.delete("/JobSeeker/deleteApplication/:id",isAuthorized,JobSeekerDeleteApplication);
router.post("/post",isAuthorized,postApplication);
export default router;