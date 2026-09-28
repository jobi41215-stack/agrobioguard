"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { analyzePlantQuestion } from "@/lib/analysis/plant-assistant";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const quickProblems = [
  "My tomato leaves are turning yellow",
  "There are small insects on my plant",
  "My crop leaves are curling",
  "There are spots on my leaves",
];

export default function AssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text:
        "Hello! I am AgroBioGuard AI Assistant. 🌿\n\nTell me what is happening to your plant, upload a photo, or describe the problem. You do not need to know the name of the pest or disease.",
    },
  ]);

  const [suggestions, setSuggestions] = useState<string[]>([
    "My tomato leaves are turning yellow",
    "There are small insects on my plant",
    "My crop leaves are curling",
    "There are spots on my leaves",
  ]);

  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [listening, setListening] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
function addUserMessage(text: string) {
  if (!text.trim()) return;

  const result = analyzePlantQuestion(text);

  setMessages((current) => [
    ...current,
    {
      role: "user",
      text,
    },
    {
      role: "assistant",
      text: result.reply,
    },
  ]);

  setSuggestions(result.suggestions);
  setInput("");
}
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addUserMessage(input);
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagePreview(url);

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: "📷 I uploaded an image of my plant.",
      },
      {
        role: "assistant",
        text:
          "Image received. 🌿\n\nThis prototype is ready for the AgroBioGuard analysis pipeline. The next analysis stage can identify the crop/problem and combine it with location and risk information.",
      },
    ]);
  }

  function startVoice() {
    if (listening) {
      setListening(false);
      return;
    }

    const SpeechRecognition =
      typeof window !== "undefined"
        ? (window as Window & {
            SpeechRecognition?: any;
            webkitSpeechRecognition?: any;
          }).SpeechRecognition ||
          (window as Window & {
            SpeechRecognition?: any;
            webkitSpeechRecognition?: any;
          }).webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported by this browser. Please use Chrome or Edge."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setInput(spokenText);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }

  return (
    <main className="assistant-page">
      <header className="assistant-header wrap">
        <Link className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>
            Agro<span>Bio</span>Guard
          </span>
        </Link>

        <Link className="button outline" href="/">
          ← Home
        </Link>
      </header>

      <section className="assistant-hero wrap">
        <div>
          <p className="eyebrow">
            <i /> AI AGRICULTURAL ASSISTANT
          </p>

          <h1>
            What&apos;s wrong with
            <br />
            <em>your plant?</em>
          </h1>

          <p className="assistant-intro">
            You do not need to know the name of the pest or disease.
            Show us the problem, describe what you see, or talk to
            AgroBioGuard.
          </p>
        </div>
      </section>

      <section className="assistant-workspace wrap">
        <div className="assistant-grid">
          <aside className="assistant-tools">
            <div className="assistant-tool-card">
              <span className="assistant-tool-icon">📷</span>

              <h2>Show your plant</h2>

              <p>
                Upload a photo of the affected plant, leaf, insect,
                fruit, or crop.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={handleImage}
              />

              <button
                className="button primary full-width"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload / Take Photo
              </button>

              {imagePreview ? (
                <div className="assistant-image-preview">
                  <img src={imagePreview} alt="Uploaded plant" />
                </div>
              ) : null}
            </div>

            <div className="assistant-tool-card">
              <span className="assistant-tool-icon">🎤</span>

              <h2>Talk to AgroBioGuard</h2>

              <p>
                Describe the problem naturally. You can speak instead
                of typing.
              </p>

              <button
                className={`button ${
                  listening ? "primary" : "outline"
                } full-width`}
                type="button"
                onClick={startVoice}
              >
                {listening ? "Listening..." : "🎤 Start Voice Input"}
              </button>
            </div>

            <div className="assistant-tool-card">
              <span className="assistant-tool-icon">📍</span>

              <h2>Location context</h2>

              <p>
                Location can provide additional environmental context
                for the assessment.
              </p>

              <Link
                className="button outline full-width"
                href="/location"
              >
                Open Location
              </Link>
            </div>
          </aside>

          <section className="assistant-chat">
            <div className="assistant-chat-header">
              <div>
                <span className="assistant-status">
                  <i /> AGROBIOGUARD AI
                </span>

                <h2>Plant Problem Assistant</h2>
              </div>

              <span className="assistant-online">
                ONLINE / OFFLINE READY
              </span>
            </div>

            <div className="assistant-messages">
              {messages.map((message, index) => (
                <div
                  className={`assistant-message ${
                    message.role === "user"
                      ? "user-message"
                      : "ai-message"
                  }`}
                  key={`${message.role}-${index}`}
                >
                  {message.role === "assistant" ? (
                    <span className="message-avatar">🤖</span>
                  ) : null}

                  <div className="message-bubble">
                    {message.text.split("\n").map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < message.text.split("\n").length - 1 ? (
                          <br />
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-problems">
  <span>
    {suggestions.length > 0
      ? "What would you like to tell me?"
      : "Try asking:"}
  </span>

  <div>
    {suggestions.map((suggestion) => (
      <button
        key={suggestion}
        type="button"
        onClick={() => addUserMessage(suggestion)}
      >
        {suggestion}
      </button>
    ))}
  </div>
</div>

            <form className="assistant-input" onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Describe what is happening to your plant..."
                aria-label="Describe your plant problem"
              />

              <button
                type="button"
                className="voice-button"
                onClick={startVoice}
                aria-label="Voice input"
              >
                🎤
              </button>

              <button type="submit" className="send-button">
                ➤
              </button>
            </form>
          </section>
        </div>
      </section>

      <section className="assistant-features wrap">
        <div>
          <span>🌱</span>
          <h3>Identify</h3>
          <p>Find possible crop, pest, insect, or plant problems.</p>
        </div>

        <div>
          <span>⚠️</span>
          <h3>Assess</h3>
          <p>Use AgroBioGuard risk information to understand the situation.</p>
        </div>

        <div>
          <span>💡</span>
          <h3>Understand</h3>
          <p>Get simple explanations instead of technical terminology.</p>
        </div>

        <div>
          <span>🌾</span>
          <h3>Manage</h3>
          <p>View appropriate agricultural management information.</p>
        </div>
      </section>
    </main>
  );
}