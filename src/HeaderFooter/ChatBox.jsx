import React, { useState } from "react";

const ChatBox = () => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:3b",
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true }).trim();

        // har line ek JSON hoti hai
        for (const line of chunk.split("\n")) {
          if (!line.trim()) continue;

          try {
            const json = JSON.parse(line);
            if (json.message && json.message.content) {
              botReply += json.message.content;

              // live typing effect
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.sender === "bot") {
                  return [
                    ...prev.slice(0, -1),
                    { text: botReply, sender: "bot" },
                  ];
                }
                return [...prev, { text: botReply, sender: "bot" }];
              });
            }
          } catch (e) {
            console.error("Stream parse error:", e, line);
          }
        }
      }
    } catch (err) {
      console.error("Ollama error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to AI service.", sender: "bot" },
      ]);
    }
  };

  return (
    <>
      {isActive && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "320px",
            height: "420px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid rgba(0, 0, 0, 0.06)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #003e52 0%, #004a5f 100%)",
              color: "#ffffff",
              padding: "16px 20px",
              fontWeight: "600",
              fontSize: "15px",
              letterSpacing: "0.3px",
              position: "relative",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#4ade80",
                  boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)",
                }}
              />
              Chat Support
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "16px 20px",
              overflowY: "auto",
              fontSize: "14px",
              lineHeight: "1.5",
              backgroundColor: "#fafafa",
              background: "linear-gradient(180deg, #fafafa 0%, #f8f9fa 100%)",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: "13px",
                  marginTop: "60px",
                  fontStyle: "italic",
                }}
              >
                Start a conversation...
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.sender === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    backgroundColor:
                      msg.sender === "user" ? "#003e52" : "#ffffff",
                    color: msg.sender === "user" ? "#ffffff" : "#374151",
                    boxShadow:
                      msg.sender === "user"
                        ? "0 4px 12px rgba(0, 62, 82, 0.2)"
                        : "0 2px 8px rgba(0, 0, 0, 0.08)",
                    wordBreak: "break-word",
                    border:
                      msg.sender === "bot"
                        ? "1px solid rgba(0, 0, 0, 0.06)"
                        : "none",
                    position: "relative",
                  }}
                >
                  {msg.text}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    marginTop: "4px",
                    marginLeft: msg.sender === "user" ? "0" : "4px",
                    marginRight: msg.sender === "user" ? "4px" : "0",
                  }}
                >
                  {msg.sender === "user" ? "You" : "Support"}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              backgroundColor: "#ffffff",
              padding: "12px 16px",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "10px 16px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#f9fafb",
                transition: "all 0.2s ease",
                color: "#374151",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#003e52";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 62, 82, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#003e52",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: "10px 18px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0, 62, 82, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#004a5f";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 62, 82, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#003e52";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 62, 82, 0.2)";
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Messages Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: isActive ? "#003e52" : "#fff",
          color: isActive ? "#fff" : "#044254",
          padding: "10px 18px",
          borderRadius: "25px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.2s ease-in-out",
          zIndex: 9999,
        }}
        onClick={() => setIsActive(!isActive)}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = "#f0f0f0";
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = "#fff";
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: isActive ? "#fff" : "#044254" }}
        >
          <path d="M19.043 3.805c.134 0 .256.025.368.077.11.053.21.123.3.212.089.074.159.17.211.289A.946.946 0 0120 4.76V19l-3.805-3.805H5.761a.93.93 0 01-.378-.077.77.77 0 01-.289-.212.77.77 0 01-.212-.289.93.93 0 01-.077-.378v-1.891h12.347V3.805h1.891zM15.24 9.5a.89.89 0 01-.267.667c-.09.09-.193.16-.311.212a.893.893 0 01-.356.078h-9.5L1 14.239V.957c0-.134.027-.256.078-.368.052-.11.122-.21.212-.3.089-.089.188-.159.3-.211A.866.866 0 011.956 0h12.348c.118 0 .237.027.356.078.118.052.222.122.31.212a.89.89 0 01.268.667V9.5z" />
        </svg>
        Messages
      </div>
    </>
  );
};

export default ChatBox;
