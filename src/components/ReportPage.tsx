import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Download, Share2, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function ReportPage() {
  const complianceData = [
    { name: "Compliant", value: 78, color: "#10B981" },
    { name: "Needs Attention", value: 15, color: "#F59E0B" },
    { name: "Missing Evidence", value: 7, color: "#EF4444" },
  ];

  const clauseDetails = [
    {
      clause: "4.1",
      name: "Understanding the Organization",
      summary: "Context and interested parties clearly documented",
      status: "compliant",
    },
    {
      clause: "4.2",
      name: "Understanding Needs and Expectations",
      summary: "Stakeholder requirements identified and monitored",
      status: "compliant",
    },
    {
      clause: "5.1",
      name: "Leadership and Commitment",
      summary: "Management commitment demonstrated through policy",
      status: "compliant",
    },
    {
      clause: "6.1",
      name: "Actions to Address Risks and Opportunities",
      summary: "Risk assessment process established",
      status: "compliant",
    },
    {
      clause: "7.1.5",
      name: "Monitoring and Measuring Resources",
      summary: "Calibration records missing for 3 measuring devices",
      status: "missing",
    },
    {
      clause: "7.2",
      name: "Competence",
      summary: "Training records complete, evaluation methods documented",
      status: "compliant",
    },
    {
      clause: "7.5",
      name: "Documented Information",
      summary: "Document control in place, some approval dates outdated",
      status: "needs-attention",
    },
    {
      clause: "8.1",
      name: "Operational Planning and Control",
      summary: "Operational processes defined and controlled",
      status: "compliant",
    },
    {
      clause: "8.5",
      name: "Production and Service Provision",
      summary: "Post-delivery activities need clearer documentation",
      status: "needs-attention",
    },
    {
      clause: "9.1",
      name: "Monitoring, Measurement, Analysis and Evaluation",
      summary: "Performance metrics established and tracked",
      status: "compliant",
    },
    {
      clause: "9.2",
      name: "Internal Audit",
      summary: "Audit program comprehensive and well-documented",
      status: "compliant",
    },
    {
      clause: "10.1",
      name: "Improvement",
      summary: "Continual improvement process demonstrated",
      status: "compliant",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "needs-attention":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "missing":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Compliant
          </Badge>
        );
      case "needs-attention":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Needs Attention
          </Badge>
        );
      case "missing":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Missing Evidence
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900">ISO 9001 Audit Summary</h1>
          <p className="text-gray-600">Generated on October 13, 2025</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share with Team
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Download className="w-4 h-4" />
            Export as PDF
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-gray-600">Overall Compliance Rate</p>
            <p className="text-gray-900">88.6%</p>
            <p className="text-green-600">+5.3% from last audit</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-gray-600">Documents Analyzed</p>
            <p className="text-gray-900">24 Files</p>
            <p className="text-gray-600">Across 12 ISO clauses</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-gray-600">Critical Issues</p>
            <p className="text-gray-900">2 Items</p>
            <p className="text-red-600">Require immediate attention</p>
          </div>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-6">Compliance Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-6">Detailed Clause Breakdown</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Clause</TableHead>
              <TableHead>Section Name</TableHead>
              <TableHead>AI Evaluation Summary</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clauseDetails.map((clause, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(clause.status)}
                    <span>{clause.clause}</span>
                  </div>
                </TableCell>
                <TableCell>{clause.name}</TableCell>
                <TableCell className="text-gray-600">{clause.summary}</TableCell>
                <TableCell>{getStatusBadge(clause.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <h3 className="text-gray-900 mb-4">Next Steps & Recommendations</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white">1</span>
            </div>
            <div>
              <p className="text-gray-900">Update calibration records</p>
              <p className="text-gray-700">
                Provide evidence of calibration for measuring equipment referenced in Clause 7.1.5
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white">2</span>
            </div>
            <div>
              <p className="text-gray-900">Review document approval dates</p>
              <p className="text-gray-700">
                Ensure all controlled documents have current approval signatures per Clause 7.5
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white">3</span>
            </div>
            <div>
              <p className="text-gray-900">Strengthen post-delivery documentation</p>
              <p className="text-gray-700">
                Add detailed procedures for customer service activities in Clause 8.5
              </p>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
}
