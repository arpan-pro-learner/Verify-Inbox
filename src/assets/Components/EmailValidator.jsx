import { useState } from "react";
import axios from "axios";

const EmailValidator = () => {
  const [email, setEmail] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = async () => {
    if (!email) {
      setErrorMessage("Please enter an email to check.");
      return;
    }

    try {
      const response = await axios.get(
        "https://validect-email-verification-v1.p.rapidapi.com/v1/verify",
        {
          params: {
            email: email,
          },
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_EMAIL_KEY,
            "X-RapidAPI-Host": "validect-email-verification-v1.p.rapidapi.com",
          },
        }
      );
      setValidationResult(response.data);
      setErrorMessage(""); // Clear error message on successful validation
    } catch (error) {
      console.error(error);
    }
  };

  const clearEmail = () => {
    setEmail("");
    setErrorMessage(""); // Clear error message when email is cleared
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-52">
      <div className="relative">
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to check"
        />
        {email && (
          <button
            className="absolute -inset-y-2 right-0 flex items-center justify-center h-full p-2"
            onClick={clearEmail}
          >
            ❌
          </button>
        )}
      </div>
      <div className="text-center">
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600 hover:shadow-md"
          onClick={validateEmail}
        >
          Validate
        </button>
      </div>
      {errorMessage && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
          <p>{errorMessage}</p>
        </div>
      )}
      {validationResult && (
        <div className="mt-4">
          {validationResult.status === "invalid" ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
              <p>Email is invalid!</p>
              <iframe
                src="https://giphy.com/embed/QIPEV0HWAiXVm"
                width="100%"
                height="auto"
                style={{ display: "block", margin: "0 auto" }}
                className="giphy-embed"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
              <p>Email is valid!</p>
              <iframe
                src="https://giphy.com/embed/3o7abKhOpu0NwenH3O"
                width="100%"
                height="auto"
                style={{ display: "block", margin: "0 auto" }}
                className="giphy-embed"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailValidator;
