import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./auth/context/authContextProvider.jsx";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

<<<<<<< HEAD


=======
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
