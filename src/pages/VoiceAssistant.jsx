import { useNavigate } from "react-router-dom";

const VoiceAssistant = () => {
  const navigate = useNavigate();

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();

      if (command.includes("cart") || command.includes("कार्ट")) {
        speak("Opening cart page");

        setTimeout(() => {
          navigate("/cart");
        }, 1500);
      } else if (command.includes("home") || command.includes("होम")) {
        speak("Opening home page");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (command.includes("contact")) {
        speak("Opening contact page");

        setTimeout(() => {
          navigate("/contact");
        }, 1500);
      } else if (command.includes("product")) {
        speak("Opening product  page");

        setTimeout(() => {
          navigate("/product");
        }, 1500);
      } else if (command.includes("collections")) {
        speak("Opening collections  page");

        setTimeout(() => {
          navigate("/product");
        }, 1500);
      } else if (command.includes("about")) {
        speak("Opening about page");

        setTimeout(() => {
          navigate("/about");
        }, 1500);
      } else {
        navigate("/");
      }
    };
  };

  return (
    <div
      onClick={startListening}
      className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 mb-16"
    >
      🎤 AI
    </div>
  );
};

export default VoiceAssistant;
