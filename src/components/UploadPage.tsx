import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Upload, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface UploadPageProps {
  onNavigate: (page: string) => void;
}

export function UploadPage({ onNavigate }: UploadPageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const analysisResults = [
    {
      document: "Quality Management System Manual v3.2.pdf",
      section: "Clause 4.1: Understanding the Organization",
      comment: "Context requirements clearly defined. Documentation complete.",
      confidence: 98,
      status: "compliant",
    },
    {
      document: "Document Control Procedure.pdf",
      section: "Clause 7.5: Documented Information",
      comment: "Version control matrix present but outdated approval dates detected.",
      confidence: 85,
      status: "needs-attention",
    },
    {
      document: "Resource Management Plan.pdf",
      section: "Clause 7.1.5: Monitoring and Measuring Resources",
      comment: "Evidence missing for calibration records of measuring equipment.",
      confidence: 68,
      status: "missing",
    },
    {
      document: "Training Records 2024.xlsx",
      section: "Clause 7.2: Competence",
      comment: "Training records comprehensive. Effectiveness evaluations documented.",
      confidence: 96,
      status: "compliant",
    },
    {
      document: "Internal Audit Report Q3.pdf",
      section: "Clause 9.2: Internal Audit",
      comment: "Audit program established. All required elements present.",
      confidence: 99,
      status: "compliant",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-gray-900">Upload ISO 9001 Documents</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Drag and drop your documents or click to browse. Supported formats: PDF, DOCX, XLSX
          </p>

          {/* Drop zone */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer"
            onClick={handleUpload}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700">Drop files here or click to upload</p>
                <p className="text-gray-500">Maximum file size: 50MB</p>
              </div>
            </div>
          </div>

          {/* Upload progress */}
          {isUploading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Analyzing documents...</span>
                <span className="text-gray-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-gray-600">AI is evaluating your documents for ISO 9001 compliance</p>
            </div>
          )}
        </div>
      </Card>

      {/* Analysis Results */}
      {showResults && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">Analysis Results</h2>
              <p className="text-gray-600">5 documents analyzed • Overall compliance: 88.6%</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => onNavigate("verification")}
              >
                View Detailed Analysis
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={() => onNavigate("reports")}
              >
                Generate Compliance Report
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {analysisResults.map((result, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      result.status === "compliant"
                        ? "bg-green-50"
                        : result.status === "needs-attention"
                        ? "bg-yellow-50"
                        : "bg-red-50"
                    }`}
                  >
                    {result.status === "compliant" ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : result.status === "needs-attention" ? (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-gray-900">{result.document}</h3>
                        <p className="text-gray-600">{result.section}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          result.status === "compliant"
                            ? "bg-green-100 text-green-700"
                            : result.status === "needs-attention"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {result.status === "compliant"
                          ? "Compliant"
                          : result.status === "needs-attention"
                          ? "Needs Attention"
                          : "Missing Evidence"}
                      </Badge>
                    </div>

                    <p className="text-gray-700">{result.comment}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">Confidence Score</span>
                          <span className="text-gray-700">{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
