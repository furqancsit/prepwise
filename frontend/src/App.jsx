
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import { Register } from "./auth/Register";
import Login from "./auth/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import InterviewRoom from "../Interview/InterviewRoom";
import InterviewResult from "../Results/InterviewResult";
import Dashboard from "./pages/Dashboard";
import InterviewDetails from "./pages/InterviewDetails";
import CreateInterview from "../Interview/CreateInterview";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Anyone can access these pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Only logged-out users */}
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Decide whether /dash should be public or protected */}
        <Route element={<ProtectedRoute />}>

          {/* <Route path="/start" element={<Interview />} /> */}
          <Route
            path="/create-interview"
            element={<CreateInterview />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/interviews/:interviewId"
            element={<InterviewRoom />}
          />
          <Route
            path="/interview/:interviewId/session/:sessionId/result"
            element={<InterviewResult />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interviews/:id"
            element={<InterviewDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
