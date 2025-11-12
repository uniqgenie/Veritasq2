import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  RefreshCw,
  FileCheck,
  Calendar,
  User,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCheck,
  X,
  Sparkles,
  TrendingUp,
  Shield,
  MessageSquare,
  Send
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  status: "Pending" | "Processing" | "Verified" | "Anomalies Found";
  uploadDate: string;
  anomalyCount?: number;
  pages?: number;
}

interface Anomaly {
  id: string;
  type: "warning" | "error";
  title: string;
  description: string;
  clause?: string;
  resolved?: boolean;
}

interface VerifiedSection {
  clause: string;
  title: string;
  confidence: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function DocumentVerificationPage() {
  const [selectedDocId, setSelectedDocId] = useState("doc-1");
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [resolvedAnomalies, setResolvedAnomalies] = useState<Set<string>>(new Set());
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I've analyzed this document and found 3 issues. I can help explain any findings or answer questions about ISO 9001 compliance."
    }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Mock data
  const documents: Document[] = [
    {
      id: "doc-1",
      name: "Quality Management Policy 2024.pdf",
      type: "pdf",
      status: "Anomalies Found",
      uploadDate: "2025-10-14",
      anomalyCount: 3,
      pages: 8
    },
    {
      id: "doc-2",
      name: "Document Control Procedure.docx",
      type: "docx",
      status: "Verified",
      uploadDate: "2025-10-13",
      pages: 12
    },
    {
      id: "doc-3",
      name: "Internal Audit Report Q3.pdf",
      type: "pdf",
      status: "Processing",
      uploadDate: "2025-10-16",
      pages: 24
    },
    {
      id: "doc-4",
      name: "Training Records 2024.pdf",
      type: "pdf",
      status: "Pending",
      uploadDate: "2025-10-16",
      pages: 15
    },
    {
      id: "doc-5",
      name: "Corrective Action Log.docx",
      type: "docx",
      status: "Verified",
      uploadDate: "2025-10-12",
      pages: 6
    }
  ];

  const verifiedSections: VerifiedSection[] = [
    { clause: "7.5.3", title: "Document Control", confidence: 94 },
    { clause: "8.5.1", title: "Control of Production", confidence: 89 },
    { clause: "9.2", title: "Internal Audit", confidence: 92 },
    { clause: "10.2", title: "Nonconformity & Corrective Action", confidence: 87 }
  ];

  const anomalies: Anomaly[] = [
    {
      id: "a1",
      type: "error",
      title: "Missing Approval Date",
      description: "Document approval signature present but approval date field is blank on page 2.",
      clause: "7.5.3.2"
    },
    {
      id: "a2",
      type: "warning",
      title: "Incomplete Signature",
      description: "Quality Manager signature appears to be missing from the document control log.",
      clause: "7.5.3.1"
    },
    {
      id: "a3",
      type: "warning",
      title: "Outdated Policy Reference",
      description: "References quality policy version 2.1, but current version is 3.0 (updated March 2024).",
      clause: "5.2"
    }
  ];

  const filteredDocuments = searchTerm 
    ? documents.filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : documents;

  const selectedDoc = documents.find(d => d.id === selectedDocId);
  const totalPages = selectedDoc?.pages || 1;

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "Verified":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "Anomalies Found":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "Processing":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Document["status"]) => {
    const variants: Record<Document["status"], string> = {
      "Verified": "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 shadow-sm",
      "Anomalies Found": "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200 shadow-sm",
      "Processing": "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200 shadow-sm animate-pulse",
      "Pending": "bg-gray-50 text-gray-700 border-gray-200"
    };

    return (
      <Badge variant="outline" className={`${variants[status]} border`}>
        {status}
      </Badge>
    );
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoom(100);

  const toggleAnomalyResolved = (anomalyId: string) => {
    setResolvedAnomalies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(anomalyId)) {
        newSet.delete(anomalyId);
      } else {
        newSet.add(anomalyId);
      }
      return newSet;
    });
  };

  // Calculate stats
  const totalAnomalies = anomalies.length;
  const resolvedCount = resolvedAnomalies.size;
  const openCount = totalAnomalies - resolvedCount;
  const verifiedDocsCount = documents.filter(d => d.status === "Verified").length;
  const overallCompliance = Math.round((verifiedDocsCount / documents.length) * 100);

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || chatInput;
    if (!messageToSend.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: messageToSend }]);

    setTimeout(() => {
      let response = "";
      
      if (messageToSend.toLowerCase().includes("approval date") || messageToSend.toLowerCase().includes("7.5.3")) {
        response = "The missing approval date is a critical issue. According to clause 7.5.3.2 of ISO 9001:2015, documented information must include approval dates to ensure proper document control.\n\nRecommended action:\n1. Add the approval date field\n2. Ensure the Quality Manager signs and dates the document\n3. Update the document control log";
      } else if (messageToSend.toLowerCase().includes("policy") || messageToSend.toLowerCase().includes("5.2")) {
        response = "The outdated policy reference in section 5.2 needs to be updated. Quality policy references must be current to maintain compliance.\n\nRecommended action:\n1. Update reference from version 2.1 to 3.0\n2. Verify all related documents reference the correct version\n3. Document the change in revision history";
      } else if (messageToSend.toLowerCase().includes("summary") || messageToSend.toLowerCase().includes("overview")) {
        response = "**Document Analysis Summary:**\n\n✅ Verified: 4 sections (87% confidence)\n⚠️ Issues found: 3 (1 error, 2 warnings)\n\n**Critical Issues:**\n- Missing approval date (Clause 7.5.3.2)\n\n**Warnings:**\n- Incomplete signature in control log\n- Outdated policy reference (v2.1 → v3.0)\n\nWould you like detailed guidance on any specific issue?";
      } else {
        response = "I can help you with:\n\n• Explaining detected issues in detail\n• Providing remediation steps for anomalies\n• Clarifying ISO 9001 requirements\n• Reviewing specific document sections\n\nWhat would you like to know?";
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);

    setChatInput("");
  };

  return (
    <TooltipProvider>
      <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
        {/* Enhanced Search Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="relative w-full md:max-w-3xl group">
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <Input
              placeholder="Search documents to review..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 md:pl-14 h-12 md:h-14 bg-white border-gray-300 shadow-md hover:shadow-lg focus:shadow-xl transition-all duration-300 rounded-xl md:rounded-2xl"
            />
            {searchTerm && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2"
                onClick={() => setSearchTerm("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Enhanced Horizontal Document Chips */}
          <div className="flex items-start md:items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              <span className="text-gray-700 hidden sm:inline">
                {searchTerm ? `${filteredDocuments.length} results` : 'All Documents'}:
              </span>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex gap-2 md:gap-3">
                {filteredDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl border-2 transition-all duration-300 flex-shrink-0 group ${
                      selectedDocId === doc.id
                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:scale-102"
                    }`}
                  >
                    <div className={`p-1.5 md:p-2 rounded-lg ${
                      selectedDocId === doc.id
                        ? "bg-blue-500 shadow-md"
                        : "bg-gray-100 group-hover:bg-blue-50"
                    } transition-all duration-300`}>
                      {getStatusIcon(doc.status)}
                    </div>
                    <div className="text-left">
                      <p className={`whitespace-nowrap text-sm md:text-base ${selectedDocId === doc.id ? "text-blue-900" : "text-gray-900"}`}>
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-600 text-xs md:text-sm">{doc.pages} pages</span>
                        {doc.anomalyCount ? (
                          <Badge variant="outline" className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 border-amber-200 text-xs">
                            {doc.anomalyCount} issues
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50/30 group cursor-pointer">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Total Documents</p>
                <p className="text-gray-900 mt-1 text-lg md:text-2xl">{documents.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-br from-white to-green-50/30 group cursor-pointer">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Verified Sections</p>
                <p className="text-gray-900 mt-1 text-lg md:text-2xl">{verifiedSections.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-amber-500 bg-gradient-to-br from-white to-amber-50/30 group cursor-pointer">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Open Issues</p>
                <p className="text-gray-900 mt-1 text-lg md:text-2xl">{openCount}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500 bg-gradient-to-br from-white to-purple-50/30 group cursor-pointer">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Compliance Score</p>
                <p className="text-gray-900 mt-1 text-lg md:text-2xl">{overallCompliance}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col xl:flex-row gap-4 md:gap-6 min-h-[500px] xl:h-[calc(100vh-420px)]">
          {/* Enhanced Document Viewer */}
          <Card className="flex-1 flex flex-col shadow-xl border-2 border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
                    <div className="p-1.5 md:p-2 rounded-lg bg-blue-100">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 truncate text-sm md:text-base">{selectedDoc?.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 text-gray-600 text-xs md:text-sm">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{selectedDoc?.uploadDate}</span>
                    </div>
                    {selectedDoc?.pages && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{selectedDoc.pages} pages</span>
                      </>
                    )}
                  </div>
                </div>
                {getStatusBadge(selectedDoc?.status || "Pending")}
              </div>

              {/* Enhanced Document Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="px-3 md:px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-blue-900 text-xs md:text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 justify-center overflow-x-auto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleZoomOut}
                        className="hover:bg-gray-100 flex-shrink-0"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom out</TooltipContent>
                  </Tooltip>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResetZoom} 
                    className="min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 text-xs md:text-sm flex-shrink-0"
                  >
                    {zoom}%
                  </Button>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleZoomIn}
                        className="hover:bg-gray-100 flex-shrink-0"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom in</TooltipContent>
                  </Tooltip>

                  <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-gray-100 hidden md:flex flex-shrink-0"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Full screen</TooltipContent>
                  </Tooltip>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all flex-shrink-0"
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1">
              {/* Enhanced Document Preview */}
              <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
                <div 
                  className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl md:rounded-2xl p-6 md:p-12 space-y-4 md:space-y-6 transition-all duration-300 border border-gray-200"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                >
                  {/* Document Header */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-8 h-8 text-blue-600" />
                      <h1 className="text-gray-900">Quality Management System Policy</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FileCheck className="w-4 h-4 text-blue-600" />
                        <span>Document No: QMS-POL-001</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>Revision: 3.0</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4 text-blue-600" />
                        <span>Approved by: [Signature Required]</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-600">Date: ___________</span>
                      </div>
                    </div>
                  </div>

                  {/* Document Content */}
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-blue-50/30 border-l-4 border-blue-500">
                      <h4 className="text-gray-900 mb-2">1. Purpose</h4>
                      <p className="text-gray-700">
                        This policy establishes the framework for our Quality Management System (QMS) in accordance with ISO 9001:2015 requirements. It defines our commitment to quality, customer satisfaction, and continuous improvement.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50/30 border-l-4 border-green-500">
                      <h4 className="text-gray-900 mb-2">2. Scope</h4>
                      <p className="text-gray-700">
                        This policy applies to all processes, products, and services within the organization's QMS scope, including design, production, and delivery of products to our customers.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-50/30 border-l-4 border-purple-500">
                      <h4 className="text-gray-900 mb-2">3. Quality Policy Statement</h4>
                      <p className="text-gray-700">
                        We are committed to providing products and services that consistently meet customer requirements and applicable regulatory requirements. We continuously improve our QMS effectiveness through:
                      </p>
                      <ul className="list-disc list-inside ml-4 mt-3 space-y-2 text-gray-700">
                        <li>Understanding and meeting customer needs</li>
                        <li>Establishing measurable quality objectives</li>
                        <li>Regular management review and process improvement</li>
                        <li>Employee competence development and engagement</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl p-5 shadow-lg animate-pulse">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-500 rounded-lg shadow-md">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-amber-900">AI Detection: Outdated Policy Reference</p>
                          <p className="text-amber-700 mt-1">
                            This section references quality policy version 2.1, but current version is 3.0 (updated March 2024).
                          </p>
                          <Badge className="mt-2 bg-amber-200 text-amber-900 border-amber-400">
                            Clause 5.2
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-50/30 border-l-4 border-blue-500">
                      <h4 className="text-gray-900 mb-2">4. Document Control</h4>
                      <p className="text-gray-700">
                        All documents within our QMS are controlled in accordance with clause 7.5.3 of ISO 9001:2015. Documents are reviewed, approved, and updated as necessary to ensure their continued suitability.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-teal-50/30 border-l-4 border-teal-500">
                      <h4 className="text-gray-900 mb-2">5. Responsibilities</h4>
                      <p className="text-gray-700">
                        Top management is responsible for establishing and maintaining this quality policy, ensuring it is communicated, understood, and applied throughout the organization. All employees are responsible for understanding how their work contributes to quality objectives.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-400 rounded-xl p-5 shadow-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-500 rounded-lg shadow-md">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-red-900">AI Detection: Missing Approval Date</p>
                          <p className="text-red-700 mt-1">
                            Document approval signature present but approval date field is blank on page 2.
                          </p>
                          <Badge className="mt-2 bg-red-200 text-red-900 border-red-400">
                            Clause 7.5.3.2
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-indigo-50/30 border-l-4 border-indigo-500">
                      <h4 className="text-gray-900 mb-2">6. Review and Revision</h4>
                      <p className="text-gray-700">
                        This policy shall be reviewed annually or when significant changes occur that affect the QMS. Revisions will be approved by top management and communicated to all relevant parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>

          {/* Enhanced AI Assistant Panel */}
          <Card className="w-full xl:w-[420px] flex flex-col shadow-xl border-2 border-gray-200 bg-gradient-to-br from-white to-blue-50/20 xl:max-h-[calc(100vh-420px)]">
            <div className="p-4 md:p-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="p-1.5 md:p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-sm md:text-base">AI Assistant</h3>
              </div>
              <p className="text-blue-100 text-xs md:text-sm">
                Analysis & interactive chat for ISO 9001:2015
              </p>
            </div>

            <Tabs defaultValue="insights" className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full rounded-none border-b flex-shrink-0">
                <TabsTrigger value="insights" className="flex-1">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="flex-1 mt-0 min-h-0">
                <ScrollArea className="h-full">
                  <div className="p-4 md:p-5 space-y-4 md:space-y-6">
                    {/* Enhanced Overall Confidence Score */}
                    <div className="p-4 md:p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl shadow-md">
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="p-1.5 md:p-2 bg-blue-500 rounded-lg shadow-md">
                          <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <h4 className="text-blue-900 text-sm md:text-base">Overall Confidence</h4>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-blue-900 text-xl md:text-2xl">87%</span>
                          <span className="text-blue-700 text-sm md:text-base">Document Compliance</span>
                        </div>
                        <Progress value={87} className="h-2 md:h-3 bg-blue-200" />
                        <p className="text-blue-600 text-xs md:text-sm">
                          Based on ISO 9001:2015 requirements analysis
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Enhanced Verified Sections */}
                    <div>
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                        </div>
                        <h4 className="text-gray-900 text-sm md:text-base">Verified Sections</h4>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        {verifiedSections.map((section) => (
                          <div
                            key={section.clause}
                            className="p-3 md:p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="bg-green-600 text-white border-green-700 shadow-sm text-xs">
                                Clause {section.clause}
                              </Badge>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300 cursor-help text-xs">
                                    {section.confidence}%
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  AI confidence score for this verification
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-green-900 text-sm md:text-base">{section.title}</p>
                            <Progress value={section.confidence} className="h-2 mt-2 bg-green-200" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Enhanced Detected Anomalies */}
                    <div>
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="p-1.5 md:p-2 bg-amber-100 rounded-lg">
                            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                          </div>
                          <h4 className="text-gray-900 text-sm md:text-base">Detected Issues</h4>
                        </div>
                        <Badge variant="outline" className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-300 shadow-sm text-xs">
                          {openCount} open
                        </Badge>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        {anomalies.map((anomaly) => {
                          const isResolved = resolvedAnomalies.has(anomaly.id);
                          return (
                            <div
                              key={anomaly.id}
                              className={`p-3 md:p-4 border-2 rounded-xl transition-all duration-300 ${
                                isResolved 
                                  ? "bg-gray-50 border-gray-200 opacity-60"
                                  : anomaly.type === "error"
                                  ? "bg-gradient-to-br from-red-50 to-rose-50 border-red-300 shadow-md hover:shadow-lg"
                                  : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-md hover:shadow-lg"
                              }`}
                            >
                              <div className="flex items-start gap-2 md:gap-3 mb-2">
                                <div className={`p-1.5 rounded-lg ${
                                  isResolved
                                    ? "bg-green-500"
                                    : anomaly.type === "error"
                                    ? "bg-red-500"
                                    : "bg-amber-500"
                                } shadow-md flex-shrink-0`}>
                                  {isResolved ? (
                                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                  ) : (
                                    <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                  )}
                                </div>
                                <p className={`flex-1 text-sm md:text-base ${
                                  isResolved 
                                    ? "text-gray-600 line-through"
                                    : anomaly.type === "error" ? "text-red-900" : "text-amber-900"
                                }`}>
                                  {anomaly.title}
                                </p>
                              </div>
                              <p className={`ml-7 md:ml-9 text-xs md:text-sm ${
                                isResolved
                                  ? "text-gray-500"
                                  : anomaly.type === "error" ? "text-red-700" : "text-amber-700"
                              }`}>
                                {anomaly.description}
                              </p>
                              {anomaly.clause && (
                                <Badge 
                                  className={`ml-7 md:ml-9 mt-2 text-xs ${
                                    isResolved
                                      ? "bg-gray-200 text-gray-600"
                                      : anomaly.type === "error"
                                      ? "bg-red-200 text-red-800 border-red-300"
                                      : "bg-amber-200 text-amber-800 border-amber-300"
                                  }`}
                                >
                                  Clause: {anomaly.clause}
                                </Badge>
                              )}
                              <div className="ml-7 md:ml-9 mt-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleAnomalyResolved(anomaly.id)}
                                  className={`gap-2 text-xs md:text-sm ${
                                    isResolved 
                                      ? "text-gray-600 hover:bg-gray-100" 
                                      : "text-blue-600 hover:bg-blue-50"
                                  }`}
                                >
                                  {isResolved ? (
                                    <>
                                      <X className="w-3 h-3" />
                                      Undo
                                    </>
                                  ) : (
                                    <>
                                      <CheckCheck className="w-3 h-3" />
                                      Mark Resolved
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 space-y-2 md:space-y-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 gap-2 shadow-md hover:shadow-lg transition-all text-sm md:text-base">
                            <RefreshCw className="w-4 h-4" />
                            Re-run Analysis
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Run AI analysis again on this document
                        </TooltipContent>
                      </Tooltip>
                      <Button variant="outline" className="w-full gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all text-sm md:text-base">
                        <Download className="w-4 h-4" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="chat" className="flex-1 mt-0 flex flex-col min-h-0">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4 md:p-5">
                  <div className="space-y-3 md:space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                            message.role === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm md:text-base">{message.content}</p>
                        </div>
                      </div>
                    ))}

                    {/* Quick Actions */}
                    {messages.length === 1 && (
                      <div className="space-y-2 pt-4">
                        <p className="text-gray-600 text-sm">Quick questions:</p>
                        <button
                          onClick={() => handleSendMessage("Explain the approval date issue")}
                          className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700 text-sm"
                        >
                          Explain the approval date issue
                        </button>
                        <button
                          onClick={() => handleSendMessage("How to fix the policy reference?")}
                          className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700 text-sm"
                        >
                          How to fix the policy reference?
                        </button>
                        <button
                          onClick={() => handleSendMessage("Give me a summary")}
                          className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700 text-sm"
                        >
                          Give me a summary
                        </button>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-4 md:p-5 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask about this document..."
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
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
