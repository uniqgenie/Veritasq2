import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export function AIChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm VERITASQ Assistant. Ask me anything about ISO 9001 compliance.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const exampleQueries = [
    "What are common gaps in Clause 8.5?",
    "How to prepare for internal audits?",
    "Explain document control requirements",
  ];

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputValue;
    if (!messageToSend.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageToSend },
    ]);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (messageToSend.toLowerCase().includes("8.5")) {
        response = "Common gaps in Clause 8.5 (Production and Service Provision) include:\n\n1. Missing post-delivery activity documentation\n2. Inadequate control of customer property\n3. Incomplete product preservation procedures\n4. Insufficient release of products and services evidence\n\nI recommend reviewing your current procedures and ensuring all requirements are documented with clear responsibilities.";
      } else if (messageToSend.toLowerCase().includes("internal audit")) {
        response = "To prepare for internal audits:\n\n1. Review the audit schedule and scope\n2. Ensure all documents are current and accessible\n3. Prepare evidence of conformity for each clause\n4. Brief your team on what to expect\n5. Have records readily available\n\nWould you like specific guidance for any particular ISO 9001 clause?";
      } else {
        response = "I can help you with ISO 9001 compliance questions. Try asking about specific clauses, audit preparation, or documentation requirements. What would you like to know more about?";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    }, 1000);

    setInputValue("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 hover:scale-110"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[600px] shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white text-sm md:text-base truncate">VERITASQ Assistant</h3>
            <p className="text-blue-100 text-xs md:text-sm">Ask me anything</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="whitespace-pre-line text-sm md:text-base">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Example queries (shown only at start) */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-gray-600 text-sm md:text-base">Try asking:</p>
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(query)}
                className="block w-full text-left px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700 text-sm md:text-base"
              >
                {query}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 md:p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask about ISO 9001..."
            className="flex-1 text-sm md:text-base"
          />
          <Button
            onClick={() => handleSendMessage()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
