import Interview from "../models/interview.model.js";

const PLAN_LIMITS = {
  free: 1,
  paid: 5,
};

export async function getInterviewUsage(user) {
  const plan = user.plan ?? "free";
  const limit = PLAN_LIMITS[plan];

  console.log(plan, "ppppppppppppppppppppppppppppppppppppp")
  console.log(limit,"llllllllllllllllllllllllllllll")

  if (limit === undefined) {
    throw new Error("Invalid user plan");
  }

  const used = await Interview.countDocuments({
    user: user._id,
  });

//   if (used >= limit) {
//   return res.status(403).json({
//     message: `Your ${user.plan} plan allows ${limit} interview(s) ??????.`,
//   });
// }


  return {
    plan,
    limit,
    used,
    remaining: Math.max(0, limit - used),
    canCreate: used < limit,
  };
}