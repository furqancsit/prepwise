
import { Router } from "express";
import {
  startInterviewSession,
  getQuestionByOrder,
  submitAnswer,
  completeInterview,
} from "../controllers/session.controller.js";
import { aiLimiter } from "../middlewares/rateLimit.middleware.js";
import { protect } from "../middlewares/auth.midlleware.js";
import { getInterviewResult } from "../controllers/result.controller.js";
// import createVoiceToken from "../controllers/voice.controller.js";

const router = Router();

router.post("/:interviewId/start", protect, startInterviewSession);

router.get(
  "/:interviewId/question/:order",
  protect,
  getQuestionByOrder
);

// router.post(
//   "/:interviewId/session/:sessionId/voice-token",
//   protect,
//   aiLimiter,
//   createVoiceToken
// );
router.post(
  "/:interviewId/session/:sessionId/question/:order/answer",
  protect,

  aiLimiter,
  submitAnswer
);

router.get(
  "/:interviewId/session/:sessionId/result",
  protect,
  getInterviewResult
);

router.post(
  "/:interviewId/session/:sessionId/complete",
  protect,
  aiLimiter,
  completeInterview
);

export default router;
