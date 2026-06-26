import Url from "../models/Url.js";
import generateShortCode from "../utils/generateShortCode.js";

import { getAuth } from "@clerk/express";
export const shortenUrl = async (req, res) => {
  try {
    // console.log(req.auth());
    const auth = getAuth(req);

    if (!auth.isAuthenticated) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = auth.userId;

    const { originalUrl } = req.body;
   

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required",
      });
    }
     const existingUrl = await Url.findOne({
      originalUrl,
      userId,
    });
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        message: "URL already shortened",
        data: existingUrl,
      });
    }

    const shortCode = generateShortCode();

    const newUrl = await Url.create({
      originalUrl,
      shortCode,
      userId,
    });
    return res.status(201).json({
  success: true,
  message: "Short URL created successfully",
  data: newUrl,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    if (!url.isActive) {
      return res.status(403).json({
        success: false,
        message: "This link has been disabled",
      });
    }

    url.clicks += 1;

    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getUserUrls = async (req, res) => {
  try {
    const auth = getAuth(req);

    const userId = auth.userId;

    const urls = await Url.find({ userId });

    return res.status(200).json({
      success: true,
      data: urls,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const deleteUrl = async (req, res) => {
  const { id } = req.params;

  const auth = getAuth(req);

  const userId = auth.userId;

  const url = await Url.findById(id);

  if (!url) {
    return res.status(404).json({
      success: false,
      message: "URL not found",
    });
  }

  if (url.userId !== userId) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
  await Url.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "URL deleted successfully",
  });
};
