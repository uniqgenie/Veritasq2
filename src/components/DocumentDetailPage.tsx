import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Share2,
  ChevronLeft,
  Sparkles,
  Send,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Eye,
  Calendar,
  User
} from "lucide-react";

interface AIComment {
  id: string;
  section: string;
  type: "suggestion" | "issue" | "verified";
  message: string;
  timestamp: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function DocumentDetailPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState("document");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I've completed the initial analysis of your Quality Manual. The document shows 92% compliance with ISO 9001:2015 requirements. I've identified 3 sections that need attention."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(92);

  const aiComments: AIComment[] = [
    {
      id: "1",
      section: "4.3 Determining Scope",
      type: "verified",
      message: "✓ This section fully complies with ISO 9001:2015 requirements. All necessary elements are clearly documented.",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      section: "5.2 Policy",
      type: "suggestion",
      message: "Consider adding more specific commitment to continual improvement. Current wording could be strengthened.",
      timestamp: "2 hours ago"
    },
    {
      id: "3",
      section: "7.5 Documented Information",
      type: "issue",
      message: "Missing reference to document retention periods. This is a mandatory requirement in clause 7.5.3.",
      timestamp: "2 hours ago"
    },
    {
      id: "4",
      section: "8.5.1 Control of Production",
      type: "verified",
      message: "✓ Excellent documentation of production controls. Meets all requirements.",
      timestamp: "2 hours ago"
    },
    {
      id: "5",
      section: "9.1 Monitoring and Measurement",
      type: "suggestion",
      message: "Recommend adding specific KPIs for customer satisfaction measurement beyond the annual survey.",
      timestamp: "1 hour ago"
    }
  ];

  const documentSections = [
    { id: "1", title: "1. Scope", status: "verified", compliance: 100 },
    { id: "2", title: "2. Normative References", status: "verified", compliance: 100 },
    { id: "3", title: "3. Terms and Definitions", status: "verified", compliance: 100 },
    { id: "4", title: "4. Context of Organization", status: "verified", compliance: 95 },
    { id: "5", title: "5. Leadership", status: "warning", compliance: 85 },
    { id: "6", title: "6. Planning", status: "verified", compliance: 100 },
    { id: "7", title: "7. Support", status: "issue", compliance: 75 },
    { id: "8", title: "8. Operation", status: "verified", compliance: 98 },
    { id: "9", title: "9. Performance Evaluation", status: "warning", compliance: 88 },
    { id: "10", title: "10. Improvement", status: "verified", compliance: 100 }
  ];

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputValue;
    if (!messageToSend.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: messageToSend }]);

    setTimeout(() => {
      let response = "";
      
      if (messageToSend.toLowerCase().includes("section 7.5") || messageToSend.toLowerCase().includes("documented information")) {
        response = "Section 7.5 requires you to:\n\n1. Define retention periods for all documented information\n2. Specify protection measures (backup, version control)\n3. Document the process for obsolete documents\n\nI recommend adding a table in section 7.5.3 that lists document types and their retention periods. Would you like me to generate a draft table?";
      } else if (messageToSend.toLowerCase().includes("section 5") || messageToSend.toLowerCase().includes("policy")) {
        response = "The quality policy in section 5.2 should explicitly state commitment to:\n\n1. Satisfying applicable requirements\n2. Continual improvement of the QMS\n\nYour current policy mentions improvement but could be more explicit. Consider adding: 'We are committed to the continual improvement of our quality management system effectiveness.'";
      } else if (messageToSend.toLowerCase().includes("summary")) {
        response = "**Document Summary:**\n\n**Overall Compliance:** 92%\n\n**Strengths:**\n- Strong documentation in clauses 4, 6, 8, and 10\n- Clear process definitions\n- Good risk-based thinking integration\n\n**Areas for Improvement:**\n- Section 7.5: Add retention periods (High Priority)\n- Section 5.2: Strengthen policy commitment (Medium Priority)\n- Section 9.1: Expand KPI definitions (Low Priority)\n\n**Next Steps:**\n1. Address section 7.5 documented information\n2. Review and update quality policy\n3. Enhance performance measurement criteria";
      } else {
        response = "I can help you with:\n\n• Analyzing specific sections for compliance\n• Suggesting improvements to meet ISO 9001 requirements\n• Explaining clause requirements in detail\n• Generating draft content for missing elements\n\nWhat would you like to know about this document?";
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);

    setInputValue("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "issue":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCommentIcon = (type: string) => {
    switch (type) {
      case "verified":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "suggestion":
        return <Sparkles className="w-5 h-5 text-blue-500" />;
      case "issue":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onNavigate && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate("verification")}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
          <div>
            <h2 className="text-gray-900">Quality Manual v3.2</h2>
            <p className="text-gray-600">Acme Corporation - ISO 9001:2015</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Overall Status</p>
                <h3 className="text-gray-900">{verificationStatus}%</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={verificationStatus} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Verified</p>
                <h3 className="text-gray-900">7/10</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Issues Found</p>
                <h3 className="text-gray-900">1</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Suggestions</p>
                <h3 className="text-gray-900">2</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Content & Verification */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="document" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Document
              </TabsTrigger>
              <TabsTrigger value="verification" className="flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Verification
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Comments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Document preview would appear here</p>
                    <p className="text-gray-500 mt-2">Full document viewer with inline AI annotations</p>
                  </div>

                  {/* Document Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>Author: Sarah Johnson</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Last edited: Nov 8, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>Version: 3.2</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>42 pages</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Section Verification Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {documentSections.map(section => (
                    <div 
                      key={section.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getStatusIcon(section.status)}
                        <span className="text-gray-900 truncate">{section.title}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-24 hidden sm:block">
                          <Progress value={section.compliance} className="h-2" />
                        </div>
                        <span className="text-gray-600 w-12 text-right">{section.compliance}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Review Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiComments.map(comment => (
                    <div key={comment.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        {getCommentIcon(comment.type)}
                        <div className="flex-1 min-w-0">
                          <h5 className="text-gray-900">{comment.section}</h5>
                          <p className="text-gray-600 mt-1">{comment.message}</p>
                          <p className="text-gray-500 mt-2">{comment.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Button size="sm" variant="ghost">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Helpful
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Not helpful
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Assistant Review
              </CardTitle>
              <p className="text-blue-100">AI-powered document analysis</p>
            </CardHeader>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="space-y-2 pt-4">
                  <p className="text-gray-600">Quick questions:</p>
                  <button
                    onClick={() => handleSendMessage("Generate document summary")}
                    className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700"
                  >
                    Generate summary
                  </button>
                  <button
                    onClick={() => handleSendMessage("Explain section 7.5 issues")}
                    className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700"
                  >
                    Explain section 7.5 issues
                  </button>
                  <button
                    onClick={() => handleSendMessage("How to improve section 5.2?")}
                    className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700"
                  >
                    How to improve section 5.2?
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about this document..."
                  className="flex-1"
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
        </div>
      </div>
    </div>
  );
}
