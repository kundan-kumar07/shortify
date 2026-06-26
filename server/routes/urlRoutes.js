import express from "express";
import { getUserUrls, redirectUrl, shortenUrl,deleteUrl } from "../controllers/urlController.js";


const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/my-urls", getUserUrls);
router.delete("/:id", deleteUrl);



export default router;