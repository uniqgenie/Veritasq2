import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Search,
  ExternalLink,
  CheckCircle2,
  Filter
} from "lucide-react";

interface Anomaly {
  id: string;
  documentName: string;
  section: string;
  issueType: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  suggestedFix: string;
  clause: string;
  status: "Open" | "Resolved";
  dateDetected: string;
}

interface AnomaliesOverviewPageProps {
  onNavigate?: (page: string) => void;
}

export function AnomaliesOverviewPage({ onNavigate }: AnomaliesOverviewPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [clauseFilter, setClauseFilter] = useState<string>("all");

  // Mock data
  const anomalies: Anomaly[] = [
    {
      id: "1",
      documentName: "Quality Management Policy 2024.pdf",
      section: "Page 2 - Approval Section",
      issueType: "Missing Information",
      severity: "Critical",
      suggestedFix: "Add approval date in the designated field. Ensure format is DD/MM/YYYY.",
      clause: "7.5.3.2",
      status: "Open",
      dateDetected: "2025-10-14"
    },
    {
      id: "2",
      documentName: "Quality Management Policy 2024.pdf",
      section: "Page 1 - Document Control Log",
      issueType: "Incomplete Signature",
      severity: "High",
      suggestedFix: "Obtain Quality Manager signature on document control log. Follow authorization matrix in QMS-PROC-002.",
      clause: "7.5.3.1",
      status: "Open",
      dateDetected: "2025-10-14"
    },
    {
      id: "3",
      documentName: "Quality Management Policy 2024.pdf",
      section: "Section 3 - Policy Statement",
      issueType: "Outdated Reference",
      severity: "Medium",
      suggestedFix: "Update reference from policy version 2.1 to current version 3.0 (effective March 2024).",
      clause: "5.2",
      status: "Open",
      dateDetected: "2025-10-14"
    },
    {
      id: "4",
      documentName: "Internal Audit Report Q3.pdf",
      section: "Page 5 - Findings Summary",
      issueType: "Missing Evidence",
      severity: "High",
      suggestedFix: "Attach photographic evidence of corrective action implementation. Reference finding ID IA-Q3-005.",
      clause: "9.2.2",
      status: "Open",
      dateDetected: "2025-10-13"
    },
    {
      id: "5",
      documentName: "Document Control Procedure.docx",
      section: "Section 4.2 - Review Process",
      issueType: "Formatting Issue",
      severity: "Low",
      suggestedFix: "Standardize date format throughout document to ISO 8601 (YYYY-MM-DD).",
      clause: "7.5.3",
      status: "Resolved",
      dateDetected: "2025-10-12"
    },
    {
      id: "6",
      documentName: "Training Records 2024.pdf",
      section: "Appendix A - Competency Matrix",
      issueType: "Data Inconsistency",
      severity: "Medium",
      suggestedFix: "Verify training completion dates match with LMS records. Cross-reference employee IDs.",
      clause: "7.2",
      status: "Resolved",
      dateDetected: "2025-10-11"
    },
    {
      id: "7",
      documentName: "Corrective Action Log.docx",
      section: "Entry #23 - Root Cause Analysis",
      issueType: "Incomplete Analysis",
      severity: "High",
      suggestedFix: "Complete 5-Why analysis for root cause. Use template CAR-FORM-001.",
      clause: "10.2.1",
      status: "Open",
      dateDetected: "2025-10-10"
    },
    {
      id: "8",
      documentName: "Internal Audit Report Q3.pdf",
      section: "Page 3 - Audit Scope",
      issueType: "Missing Clause Reference",
      severity: "Low",
      suggestedFix: "Add specific ISO 9001:2015 clause numbers for each audit area. Use standard audit checklist format.",
      clause: "9.2.1",
      status: "Resolved",
      dateDetected: "2025-10-09"
    },
    {
      id: "9",
      documentName: "Quality Management Policy 2024.pdf",
      section: "Page 4 - Quality Objectives",
      issueType: "Measurability Issue",
      severity: "Medium",
      suggestedFix: "Define quantifiable metrics for quality objective #3. Example: 'Reduce defects by 15%' instead of 'Improve quality'.",
      clause: "6.2.1",
      status: "Open",
      dateDetected: "2025-10-08"
    },
    {
      id: "10",
      documentName: "Document Control Procedure.docx",
      section: "Section 5 - Change Control",
      issueType: "Missing Approval",
      severity: "Critical",
      suggestedFix: "Obtain Management Representative approval for procedure revision. Update revision history table.",
      clause: "7.5.3.2",
      status: "Resolved",
      dateDetected: "2025-10-07"
    },
    {
      id: "11",
      documentName: "Training Records 2024.pdf",
      section: "Section 2 - New Employee Orientation",
      issueType: "Missing Records",
      severity: "High",
      suggestedFix: "Upload signed acknowledgment forms for employees hired in Q2 2024. Store in HR-TRAIN folder.",
      clause: "7.2",
      status: "Resolved",
      dateDetected: "2025-10-06"
    },
    {
      id: "12",
      documentName: "Corrective Action Log.docx",
      section: "Entry #19 - Effectiveness Review",
      issueType: "Overdue Review",
      severity: "Medium",
      suggestedFix: "Conduct effectiveness review within 30 days of corrective action implementation. Schedule follow-up audit.",
      clause: "10.2.2",
      status: "Open",
      dateDetected: "2025-10-05"
    }
  ];

  // Calculate statistics
  const totalAnomalies = anomalies.length;
  const resolvedAnomalies = anomalies.filter(a => a.status === "Resolved").length;
  const openAnomalies = totalAnomalies - resolvedAnomalies;
  const progressPercentage = (resolvedAnomalies / totalAnomalies) * 100;

  // Filter anomalies
  const filteredAnomalies = anomalies.filter(anomaly => {
    const matchesSearch = 
      searchTerm === "" ||
      anomaly.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anomaly.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anomaly.issueType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || anomaly.severity === severityFilter;
    const matchesClause = clauseFilter === "all" || anomaly.clause.startsWith(clauseFilter);

    return matchesSearch && matchesSeverity && matchesClause;
  });

  const getSeverityBadge = (severity: Anomaly["severity"]) => {
    const variants: Record<Anomaly["severity"], string> = {
      "Critical": "bg-red-100 text-red-700 border-red-300",
      "High": "bg-orange-100 text-orange-700 border-orange-300",
      "Medium": "bg-amber-100 text-amber-700 border-amber-300",
      "Low": "bg-blue-100 text-blue-700 border-blue-300"
    };

    const icons: Record<Anomaly["severity"], JSX.Element> = {
      "Critical": <AlertCircle className="w-3 h-3" />,
      "High": <AlertTriangle className="w-3 h-3" />,
      "Medium": <AlertTriangle className="w-3 h-3" />,
      "Low": <Info className="w-3 h-3" />
    };

    return (
      <Badge variant="outline" className={`${variants[severity]} border gap-1`}>
        {icons[severity]}
        {severity}
      </Badge>
    );
  };

  const getStatusBadge = (status: Anomaly["status"]) => {
    return status === "Resolved" ? (
      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 gap-1">
        <CheckCircle2 className="w-3 h-3" />
        Resolved
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
        Open
      </Badge>
    );
  };

  const handleViewInDocument = (documentName: string) => {
    if (onNavigate) {
      onNavigate("verification");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">ISO 9001 Audit Verification Results</h2>
        <p className="text-gray-600">
          Review and track all detected anomalies across your ISO 9001 documentation
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900">Anomaly Resolution Progress</h3>
            <p className="text-gray-600">
              {resolvedAnomalies} resolved / {totalAnomalies} total ({openAnomalies} remaining)
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-gray-900">{openAnomalies}</div>
              <div className="text-gray-600">Open</div>
            </div>
            <div className="text-center">
              <div className="text-green-600">{resolvedAnomalies}</div>
              <div className="text-gray-600">Resolved</div>
            </div>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </Card>

      {/* Filters */}
      <Card className="p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filters:</span>
          </div>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search documents, sections, or issue types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={clauseFilter} onValueChange={setClauseFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="ISO Clause" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clauses</SelectItem>
              <SelectItem value="5">5 - Leadership</SelectItem>
              <SelectItem value="6">6 - Planning</SelectItem>
              <SelectItem value="7">7 - Support</SelectItem>
              <SelectItem value="8">8 - Operation</SelectItem>
              <SelectItem value="9">9 - Performance</SelectItem>
              <SelectItem value="10">10 - Improvement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Anomalies Table */}
      <Card className="shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Clause</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Suggested Fix</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnomalies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No anomalies found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredAnomalies.map((anomaly) => (
                  <TableRow key={anomaly.id}>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-gray-900 truncate">{anomaly.documentName}</p>
                        <p className="text-gray-500">{anomaly.dateDetected}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-gray-700 truncate">{anomaly.section}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-700">{anomaly.issueType}</p>
                    </TableCell>
                    <TableCell>{getSeverityBadge(anomaly.severity)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                        {anomaly.clause}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(anomaly.status)}</TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="text-gray-700">{anomaly.suggestedFix}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewInDocument(anomaly.documentName)}
                        className="gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-900">
                {anomalies.filter(a => a.severity === "Critical" && a.status === "Open").length}
              </p>
              <p className="text-gray-600">Critical Issues</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-900">
                {anomalies.filter(a => a.severity === "High" && a.status === "Open").length}
              </p>
              <p className="text-gray-600">High Priority</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-900">
                {anomalies.filter(a => a.severity === "Medium" && a.status === "Open").length}
              </p>
              <p className="text-gray-600">Medium Priority</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-900">{resolvedAnomalies}</p>
              <p className="text-gray-600">Resolved</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
