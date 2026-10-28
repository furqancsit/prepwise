import mongoose from "mongoose";
import Interview from "../models/interview.model.js";
import { InterviewSession } from "../models/interviewSessions.model.js";
import { generateInterviewQuestions } from "../utils/generateInterviewQuestions.js";

import { evaluateInterview } from "../utils/evaluateInterview.js";


const startInterviewSession = async (req, res) => {
  try {
    const { interviewId } = req.params;

    // 1. Validate ID
    if (!mongoose.isValidObjectId(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    // 2. Find interview owned by current user
    const interview = await Interview.findOne({
      _id: interviewId,
      user: req.userId,
      status: "active",
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // 3. Check for an existing in-progress session
    const existingSession = await InterviewSession.findOne({
      user: req.userId,
      interview: interview._id,
      status: "in_progress",
    }).sort({ startedAt: -1 });

    // 4. If found, reuse it instead of calling Gemini
    if (existingSession) {
      return res.status(200).json({
        success: true,
        message: "Existing interview session resumed",
        data: {
          sessionId: existingSession._id,
          interviewId: interview._id,
          title: interview.title,
          role: interview.role,
          durationMinutes: interview.durationMinutes,
          totalQuestions: existingSession.questions.length,
          questions: existingSession.questions,
          answers: existingSession.answers,
          status: existingSession.status,
        },
      });
    }

    // 5. No existing session: generate questions
    const questions = await generateInterviewQuestions({
      role: interview.role,
      difficulty: interview.difficulty,
      topics: interview.topics,
      questionCount: interview.questionCount,
      type: interview.type,
    });

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(502).json({
        success: false,
        message: "Failed to generate interview questions",
      });
    }

    // 6. Save the new session
    const session = await InterviewSession.create({
      user: req.userId,
      interview: interview._id,
      questions,
      answers: [],
      status: "in_progress",
      startedAt: new Date(),
    });

    // 7. Return the new session
    return res.status(201).json({
      success: true,
      message: "Interview session started successfully",
      data: {
        sessionId: session._id,
        interviewId: interview._id,
        title: interview.title,
        role: interview.role,
        durationMinutes: interview.durationMinutes,
        totalQuestions: session.questions.length,
        questions: session.questions,
        answers: session.answers,
        status: session.status,
      },
    });
  } catch (error) {
    console.error("Start interview session error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to start interview session",
    });
  }
};


const getQuestionByOrder = async (req, res) => {
  try {
    const { interviewId, order } = req.params;

    const session = await InterviewSession.findOne({
      interview: interviewId,
      user: req.userId,
      status: "in_progress",
    });

    const question = session?.questions.find(
      (q) => q.order === parseInt(order),
    );

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.log(error);
  }
};



const submitAnswer = async (req, res) => {
  try {
    const { interviewId, sessionId, order } = req.params;
    const { answerText, answerMode = "text" } = req.body;

    // 1. Validate answer
    if (typeof answerText !== "string" || !answerText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Answer text is required",
      });
    }

    if (!["text", "voice"].includes(answerMode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer mode",
      });
    }

    if (
      !mongoose.isValidObjectId(interviewId) ||
      !mongoose.isValidObjectId(sessionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview or session ID",
      });
    }

    // 2. Find the active session owned by the user
    const session = await InterviewSession.findOne({
      _id: sessionId,
      interview: interviewId,
      user: req.userId,
      status: "in_progress",
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    // 3. Find the requested question
    const question = session.questions.find(
      (q) => Number(q.order) === Number(order),
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // 5. Prepare the saved answer
    const answerData = {
      questionId: question._id,
      answerText: answerText.trim(),
      answerMode,

      answeredAt: new Date(),
    };

    if (!session.answers) {
      session.answers = [];
    }

    // 6. Update existing answer or create a new one
    const existingAnswerIndex = session.answers.findIndex(
      (a) => String(a.questionId) === String(question._id),
    );

    if (existingAnswerIndex !== -1) {
      session.answers[existingAnswerIndex].answerText = answerData.answerText;
      session.answers[existingAnswerIndex].answerMode = answerData.answerMode;

      session.answers[existingAnswerIndex].answeredAt = answerData.answeredAt;
    } else {
      session.answers.push(answerData);
    }

    await session.save();

    // 7. Return the result to React
    return res.status(200).json({
      success: true,
      message: "Answer submitted ",
      data: {
        sessionId: session._id,
        questionId: question._id,
        order: question.order,
        answersCount: session.answers.length,
        
        hasNextQuestion: session.questions.some(
          (q) => Number(q.order) > Number(order),
        ),
      },
    });
  } catch (error) {
    console.error("Submit answer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit answer",
    });
  }
};


const completeInterview = async (req, res) => {
  try {
    const { interviewId, sessionId } = req.params;

    // Validate IDs
    if (
      !mongoose.isValidObjectId(interviewId) ||
      !mongoose.isValidObjectId(sessionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview or session ID",
      });
    }

    // Find the user's session
    const session = await InterviewSession.findOne({
      _id: sessionId,
      interview: interviewId,
      user: req.userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    // Return existing evaluation if already completed
    if (session.status === "completed" && session.evaluation) {
      return res.status(200).json({
        success: true,
        message: "Evaluation already exists",
        data: {
          sessionId: session._id,
          status: session.status,
          evaluation: session.evaluation,
        },
      });
    }

    if (session.status !== "in_progress") {
      return res.status(409).json({
        success: false,
        message: "Interview session cannot be completed",
      });
    }

    if (!session.answers?.length) {
      return res.status(400).json({
        success: false,
        message: "No answers found for this interview session",
      });
    }

    // Generate the evaluation
    const evaluation = await evaluateInterview({
      role: session.role || "Candidate",
      questions: session.questions,
      answers: session.answers,
    });

    if (!evaluation) {
      throw new Error("Evaluation generation returned no result");
    }

    // Save evaluation and completion status
    session.evaluation = evaluation;
    session.status = "completed";
    session.completedAt = new Date();

    await session.save();

    return res.status(200).json({
      success: true,
      message: "Interview completed and evaluation saved",
      data: {
        sessionId: session._id,
        status: session.status,
        evaluation: session.evaluation,
      },
    });
  } catch (error) {
    console.error("Complete interview error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to complete interview",
    });
  }
};

export {
  startInterviewSession,
  getQuestionByOrder,
  submitAnswer,
  completeInterview,
};
