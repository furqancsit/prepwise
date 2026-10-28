
import { useNavigate } from "react-router-dom";

export default function UpgradePlanButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/pricing")}
      className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 cursor-pointer"
    >
      Upgrade Plan
    </button>
  );
}
