"use client";

import { useEffect, useState } from "react";

interface Message {
  from: "user" | "pop";
  text: string;
  delay: number;
}

interface WhatsAppPreviewProps {
  messages: Message[];
  autoPlay?: boolean;
  className?: string;
}

export default function WhatsAppPreview({
  messages,
  autoPlay = true,
  className = "",
}: WhatsAppPreviewProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (!autoPlay || visibleCount >= messages.length) return;

    const next = messages[visibleCount];
    if (next.from === "pop") {
      setShowTyping(true);
      const typingTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleCount((c) => c + 1);
      }, next.delay);
      return () => clearTimeout(typingTimer);
    } else {
      const timer = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, next.delay);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, messages, autoPlay]);

  return (
    <div
      className={`w-full max-w-sm rounded-2xl bg-[#111b21] overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1f2c34]">
        <div className="h-8 w-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-sm font-bold">
          P
        </div>
        <div>
          <div className="text-sm font-medium text-white">Pop</div>
          <div className="text-xs text-white/40">
            {showTyping ? "typing..." : "online"}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-1.5 p-3 min-h-[240px]">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`animate-message max-w-[85%] rounded-lg px-3 py-2 text-sm ${
              msg.from === "user"
                ? "self-end bg-[#005c4b] text-white"
                : "self-start bg-[#1f2c34] text-white/90"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {showTyping && (
          <div className="self-start bg-[#1f2c34] rounded-lg px-3 py-2 flex gap-1">
            <div className="typing-dot h-1.5 w-1.5 rounded-full bg-white/40" />
            <div className="typing-dot h-1.5 w-1.5 rounded-full bg-white/40" />
            <div className="typing-dot h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        )}
      </div>
    </div>
  );
}
