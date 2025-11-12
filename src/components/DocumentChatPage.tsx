import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  Send,
  FileText,
  X,
  Search,
  Sparkles,
  User,
  Download,
  Trash2,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  pages: number;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
}

export function DocumentChatPage() {
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI compliance assistant. I can help you analyze your ISO 9001 documents, answer questions about compliance requirements, and identify potential issues. Upload documents on the left to get started, or ask me any questions!",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Quality Management Manual.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-10-28",
      pages: 45,
    },
    {
      id: "doc-2",
      name: "Process Control Procedures.docx",
      type: "DOCX",
      size: "1.8 MB",
      uploadDate: "2024-10-27",
      pages: 32,
    },
    {
      id: "doc-3",
      name: "Audit Checklist 2024.xlsx",
      type: "XLSX",
      size: "856 KB",
      uploadDate: "2024-10-26",
      pages: 12,
    },
    {
      id: "doc-4",
      name: "Corrective Actions Log.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2024-10-25",
      pages: 67,
    },
    {
      id: "doc-5",
      name: "Training Records.pdf",
      type: "PDF",
      size: "4.2 MB",
      uploadDate: "2024-10-24",
      pages: 89,
    },
  ]);

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([
    "doc-1",
    "doc-2",
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(inputMessage),
        timestamp: new Date().toISOString(),
        sources: selectedDocuments
          .slice(0, 2)
          .map((id) => documents.find((d) => d.id === id)?.name || ""),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("quality") || lowerQuestion.includes("manual")) {
      return "Based on your Quality Management Manual, your organization has established a comprehensive quality management system. The manual defines quality policies, objectives, and the organizational structure. However, I noticed that Section 4.3 regarding the scope determination could be more specific about excluded processes. Would you like me to suggest improvements?";
    } else if (
      lowerQuestion.includes("procedure") ||
      lowerQuestion.includes("process")
    ) {
      return "Your Process Control Procedures document outlines clear workflows for production and service delivery. The procedures align well with ISO 9001:2015 clause 8.5. I identified strong controls for process monitoring and measurement. One recommendation: consider adding more detail on handling process changes and version control.";
    } else if (
      lowerQuestion.includes("audit") ||
      lowerQuestion.includes("compliance")
    ) {
      return "Reviewing your audit documents, your organization demonstrates a systematic approach to internal auditing. The audit checklist covers key ISO 9001 requirements. Your compliance rate is approximately 92% based on the latest audit findings. The main areas requiring attention are: 1) Management review frequency, 2) Corrective action follow-up timelines, and 3) Supplier evaluation documentation.";
    } else if (
      lowerQuestion.includes("training") ||
      lowerQuestion.includes("competence")
    ) {
      return "Your training records show good documentation of employee competencies. The records include training dates, topics, and effectiveness evaluation. To strengthen compliance with clause 7.2 (Competence), I recommend: 1) Establishing clearer competency criteria for each role, 2) Regular competency assessments every 12 months, and 3) Linking training to identified competency gaps.";
    } else if (lowerQuestion.includes("corrective") || lowerQuestion.includes("action")) {
      return "Analyzing your Corrective Actions Log, you have 23 open corrective actions with an average closure time of 45 days. 87% of actions are completed within the target timeframe. The log shows good root cause analysis using 5-Why methodology. Suggestion: Implement a trend analysis to identify recurring issues and prevent systemic problems.";
    } else {
      return "I've analyzed the selected documents in your knowledge base. Based on the ISO 9001:2015 requirements, your documentation demonstrates strong compliance in most areas. The documents are well-structured and contain most required information. I can provide more specific insights if you ask about particular clauses, processes, or compliance requirements. What would you like to know more about?";
    }
  };

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const models = [
    { id: "gpt-4", name: "GPT-4 Turbo", provider: "OpenAI" },
    { id: "gpt-3.5", name: "GPT-3.5 Turbo", provider: "OpenAI" },
    { id: "claude-3", name: "Claude 3 Opus", provider: "Anthropic" },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex gap-6">
      {/* Left Panel - Documents */}
      <Card className="w-80 border-gray-200 shadow-sm flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Knowledge Base</h3>
            <Button size="sm" variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Upload
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {filteredDocuments.map((doc) => {
              const isSelected = selectedDocuments.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDocumentSelection(doc.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <FileText
                        className={`w-5 h-5 ${
                          isSelected ? "text-blue-600" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                        <span className="text-gray-600">{doc.size}</span>
                      </div>
                      <p className="text-gray-600 mt-1">
                        {doc.pages} pages
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-gray-600">
            <span>{selectedDocuments.length} selected</span>
            {selectedDocuments.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedDocuments([])}
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Right Panel - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Model Selection */}
        <Card className="p-4 border-gray-200 shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900">AI Model</span>
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{model.name}</span>
                      <span className="text-gray-500 ml-2">
                        {model.provider}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessages([])}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </Button>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1 border-gray-200 shadow-sm flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-2xl ${
                      message.role === "user" ? "order-1" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="text-gray-600">Sources:</span>
                        {message.sources.map((source, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {source}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-500 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            {selectedDocuments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedDocuments.map((docId) => {
                  const doc = documents.find((d) => d.id === docId);
                  return doc ? (
                    <Badge
                      key={docId}
                      variant="outline"
                      className="gap-2 pr-1"
                    >
                      <FileText className="w-3 h-3" />
                      {doc.name}
                      <button
                        onClick={() => toggleDocumentSelection(docId)}
                        className="ml-1 hover:bg-gray-200 rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
            <div className="flex gap-3">
              <Input
                placeholder="Ask anything about your documents..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-500 mt-2 text-center">
              {selectedModel === "gpt-4" && "Using GPT-4 Turbo"}
              {selectedModel === "gpt-3.5" && "Using GPT-3.5 Turbo"}
              {selectedModel === "claude-3" && "Using Claude 3 Opus"}
              {selectedModel === "claude-3-sonnet" && "Using Claude 3 Sonnet"}
              {selectedModel === "gemini-pro" && "Using Gemini Pro"}
              {" • "}
              {selectedDocuments.length} document
              {selectedDocuments.length !== 1 ? "s" : ""} selected
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
