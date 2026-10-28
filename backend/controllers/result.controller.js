import mongoose from "mongoose";
import Interview from "../models/interview.model.js";
import { InterviewSession } from "../models/interviewSessions.model.js";

const getInterviewResult = async (req, res) => {
  try {
    const { interviewId, sessionId } = req.params;
    const userId = req.userId;

    // Validate request IDs
    if (
      !mongoose.isValidObjectId(interviewId) ||
      !mongoose.isValidObjectId(sessionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview or session ID",
      });
    }

    // Verify interview ownership
    const interview = await Interview.exists({
      _id: interviewId,
      user: userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // Fetch the user's interview session
    const session = await InterviewSession.findOne({
      _id: sessionId,
      interview: interviewId,
      user: userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    

    // Check whether all questions have been answered
    const totalQuestions = session.questions?.length ?? 0;

    const answeredQuestionIds = new Set(
      (session.answers ?? [])
        .filter((answer) => answer.answerText?.trim())
        .map((answer) => String(answer.questionId)),
    );

    const answeredQuestions = answeredQuestionIds.size;

    // const allQuestionsAnswered =
    //   totalQuestions > 0 && answeredQuestions >= totalQuestions;

    if (session.status !== "completed") {
      return res.status(409).json({
        success: false,
        message: "Interview evaluation is not ready yet",
      });
    }

    // Check whether evaluation is available
    const evaluation = session.evaluation;

    if (!evaluation) {
      return res.status(202).json({
        success: false,
        message: "Interview evaluation is pending",
      });
    }

    // Return interview results
    return res.status(200).json({
      success: true,
      message: "Interview results fetched successfully",
      data: {
        interviewId: session.interview,
        sessionId: session._id,
        status: session.status,
        completedAt: session.completedAt,
      
questions: session.questions.map((question) => {
  const answer = (session.answers ?? []).find(
    (item) =>
      String(item.questionId) === String(question._id)
  );

  const feedback = (evaluation.questionFeedback ?? []).find(
    (item) =>
      String(item.questionId) === String(question._id)
  );

  return {
    questionId: question._id,
    text: question.text,
    type: question.type,
    topic: question.topic,
    difficulty: question.difficulty,
    answer: answer ? answer.answerText : "",
    durationSeconds: answer?.durationSeconds ?? 0,
    answeredAt: answer?.answeredAt ?? null,
    score: feedback?.score ?? null,
    feedback: feedback?.feedback ?? "",
    strengths: feedback?.strengths ?? [],
    improvements: feedback?.improvements ?? [],
  };
}),


        // YOUR EXISTING CODE CONTINUES
        score: {
          overall: evaluation.overallScore,
          maxScore: 100,
          performance: evaluation.performance,
        },

        feedback: {
          summary: evaluation.summary,
          strengths: evaluation.strengths,
          improvements: evaluation.improvements,
        },

        questionFeedback: (evaluation.questionFeedback ?? []).map((item) => ({
          questionId: item.questionId,
          score: item.score,
          maxScore: 10,
          feedback: item.feedback,
          strengths: item.strengths,
          improvements: item.improvements,
        })),

        evaluatedAt: evaluation.evaluatedAt,
      },
    });
  } catch (error) {
    console.error("Get interview result error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview results",
    });
  }
};

export { getInterviewResult };
