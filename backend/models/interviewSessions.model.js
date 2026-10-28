import mongoose from "mongoose";

const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["technical", "behavioral", "situational"],
      default: "technical",
    },

    topic: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    order: {
      type: Number,
      required: true,
    },
  },
  { _id: true },
);

const conversationTurnSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["interviewer", "candidate"],
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    questionId: {
      type: Schema.Types.ObjectId,
      default: null,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const answerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    answerText: {
      type: String,
      default: "",
    },

    durationSeconds: {
      type: Number,
      min: 0,
      default: 0,
    },

    answeredAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);

const questionFeedbackSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    feedback: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const evaluationSchema = new Schema(
  {
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    performance: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Needs Improvement"],
      default: "Average",
    },

    summary: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },

    questionFeedback: {
      type: [questionFeedbackSchema],
      default: [],
    },

    evaluatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const interviewSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    interview: {
      type: Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
      index: true,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    answers: {
      type: [answerSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["in_progress", "completed", "abandoned"],
      default: "in_progress",
      index: true,
    },
    mode: {
      type: String,
      enum: ["text", "voice"],
      default: "text",
    },

    conversationTurns: {
      type: [conversationTurnSchema],
      default: [],
    },
    evaluation: {
      type: evaluationSchema,
      default: null,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

interviewSessionSchema.index({
  user: 1,
  createdAt: -1,
});

const InterviewSession = model("InterviewSession", interviewSessionSchema);

export { InterviewSession };
