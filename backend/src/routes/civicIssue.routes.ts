import { Router } from "express";
import {
    createCivicIssue,
    deleteCivicIssue,
    getAllCivicIssues,
    getCivicIssueById,
    getUserCivicIssues,
    updateCivicIssue,
} from "../controllers/civicIssue.controller";
import validateToken from "../middleware/validateTokenHandler";

const router = Router();

// Public routes

router.use(validateToken);
router.get("/", getAllCivicIssues);
router.get("/:id", getCivicIssueById);
router.put("/:id", updateCivicIssue);
router.delete("/:id", deleteCivicIssue);

router.post("/create", createCivicIssue);
router.get("/user/issues", getUserCivicIssues);

export default router;
