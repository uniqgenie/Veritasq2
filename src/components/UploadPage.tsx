import React, { useState, useRef, useCallback } from "react";
import { validateWithSpace } from "../hf";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react";

interface UploadPageProps {
  onNavigate: (page: string) => void;
}

type Row = [string, string, string, string]; // [Clause, Verdict, Evidence, Gaps]

type ValidateResponse = {
  filename: string;
  csvUrl?: string;
  summaryMd?: string; // HTML string (sanitized below)
  table: {
    headers: string[];
    rows: any[]; // normalized below
  };
};

const MAX_MB = 50;
const ACCEPT_EXT = [".pdf", ".docx", ".txt"];

export function UploadPage({ onNavigate }: UploadPageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filename, setFilename] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [headers, setHeaders] = useState<string[]>([
    "Clause",
    "Verdict",
    "Evidence",
    "Gaps",
  ]);
  const [summary, setSummary] = useState("");
  const [csvUrl, setCsvUrl] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const verdictToBadge = (v: string) => {
    const key = v.trim().toLowerCase();
    const simple = key
      .replace("compliant", "")
      .replace("partially", "partially")
      .trim();

    if (key.startsWith("fully") || key.includes("full")) {
      return <Badge className="bg-green-100 text-green-700">Compliant</Badge>;
    }
    if (simple.startsWith("partially") || key.includes("partial")) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700">Needs Attention</Badge>
      );
    }
    return <Badge className="bg-red-100 text-red-700">Insufficient</Badge>;
  };

  const pickFile = () => !isUploading && fileInputRef.current?.click();

  const validateFile = (file: File): string | null => {
    const extOk = ACCEPT_EXT.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    if (!extOk)
      return "Unsupported file type. Please upload a PDF, DOCX, or TXT.";
    if (file.size > MAX_MB * 1024 * 1024)
      return `File is larger than ${MAX_MB}MB.`;
    return null;
  };

  const startProgress = () => {
    setUploadProgress(5);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setUploadProgress((p) => (p < 90 ? p + 5 : p));
    }, 250);
  };

  const stopProgress = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleUpload = useCallback(
    async (f?: File) => {
      if (isUploading) return;
      setError(null);

      const file = f || fileInputRef.current?.files?.[0];
      if (!file) {
        setError("Please choose a PDF, DOCX, or TXT file.");
        return;
      }
      const vErr = validateFile(file);
      if (vErr) {
        setError(vErr);
        return;
      }

      setIsUploading(true);
      startProgress();

      try {
        const { filename, table, csvUrl, summaryMd } = (await validateWithSpace(
          file,
          8,
          "intfloat/e5-base-v2"
        )) as ValidateResponse;

        setUploadProgress(100);

        setFilename(filename);
        setHeaders(
          table?.headers?.length
            ? table.headers
            : ["Clause", "Verdict", "Evidence", "Gaps"]
        );

        const safeRows: Row[] = (table?.rows || []).map((r: any[]) => [
          String(r?.[0] ?? ""),
          String(r?.[1] ?? ""),
          String(r?.[2] ?? ""),
          String(r?.[3] ?? ""),
        ]);
        setRows(safeRows);

        setCsvUrl(csvUrl);
      } catch (e: any) {
        setUploadProgress(0);
        setError(e?.message || "Validation failed. Please try again.");
      } finally {
        stopProgress();
        setIsUploading(false);
      }
    },
    [isUploading]
  );

  // DnD: add drop handlers to match your UX copy
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-6">
      {/* Hidden native input */}
      <input
        type="file"
        accept={ACCEPT_EXT.join(",")}
        ref={fileInputRef}
        onChange={(e) => handleUpload(e.target.files?.[0])}
        className="hidden"
      />

      {/* Upload Section */}
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-gray-900">Upload ISO 9001 Documents</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Drag and drop your documents or click to browse. Supported formats:
            PDF, DOCX, TXT
          </p>

          {/* Drop zone */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={pickFile}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && pickFile()
            }
            onDrop={onDrop}
            onDragOver={onDragOver}
            aria-disabled={isUploading}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700">
                  Drop files here or click to upload
                </p>
                <p className="text-gray-500">Maximum file size: {MAX_MB}MB</p>
              </div>
            </div>
          </div>

          {/* Upload progress */}
          {isUploading && (
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Analyzing document...</span>
                <span className="text-gray-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-gray-600">
                AI is evaluating your document for ISO 9001 compliance
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      {rows.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">Analysis Results</h2>
              <p className="text-gray-600">
                {filename ? `${filename} • ` : ""} {rows.length} clauses
                assessed
              </p>
            </div>
            <div className="flex items-center gap-3">
              {csvUrl && (
                <a href={csvUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" disabled={isUploading}>
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </a>
              )}
              <Button
                variant="outline"
                onClick={() => onNavigate("verification")}
                disabled={isUploading}
              >
                View Detailed Analysis
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={() => onNavigate("reports")}
                disabled={isUploading}
              >
                Generate Compliance Report
              </Button>
            </div>
          </div>

          {/* Optional summary (sanitized) */}
          {summary && (
            <Card className="p-4">
              <div
                className="prose max-w-none"
                // If your API returns markdown instead of HTML, swap this for a MD renderer instead of using innerHTML.
                dangerouslySetInnerHTML={{
                  __html: summary.replace(/\n/g, "<br/>"),
                }}
              />
            </Card>
          )}

          {/* Table-like cards */}
          <div className="space-y-4">
            {rows.map((r, idx) => {
              const [clause, verdict, evidence, gaps] = r;
              const verdictKey = (verdict || "").toLowerCase();
              const statusIcon = verdictKey.startsWith("fully") ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : verdictKey.startsWith("partially") ? (
                <Clock className="w-6 h-6 text-yellow-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              );

              const statusBg = verdictKey.startsWith("fully")
                ? "bg-green-50"
                : verdictKey.startsWith("partially")
                ? "bg-yellow-50"
                : "bg-red-50";

              return (
                <Card
                  key={idx}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${statusBg}`}
                    >
                      {statusIcon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-gray-900">
                            {clause || "Clause"}
                          </h3>
                          <p className="text-gray-600">Evidence &amp; Gaps</p>
                        </div>
                        {verdictToBadge(verdict || "")}
                      </div>
                      {evidence && (
                        <div className="text-gray-700 whitespace-pre-wrap">
                          <strong>Evidence:</strong> {evidence}
                        </div>
                      )}
                      {gaps && (
                        <div className="text-gray-700 whitespace-pre-wrap">
                          <strong>Gaps:</strong> {gaps}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      <div className="flex justify-center">
        <Button onClick={pickFile} disabled={isUploading}>
          Upload another file
        </Button>
      </div>
    </div>
  );
}
