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
import { CheckCircle, AlertCircle, FileText, TrendingUp, Lightbulb, Plug, CheckCircle2 } from "lucide-react";

interface DashboardHomeProps {
  onNavigate: (page: string) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const stats = [
    {
      label: "Total Checks",
      value: "247",
      change: "+12%",
      icon: FileText,
      color: "blue",
    },
    {
      label: "Issues Found",
      value: "18",
      change: "-8%",
      icon: AlertCircle,
      color: "orange",
    },
    {
      label: "Compliance Rate",
      value: "92.7%",
      change: "+5.3%",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Improvement",
      value: "+15%",
      change: "vs last month",
      icon: TrendingUp,
      color: "purple",
    },
  ];

  const recentAudits = [
    {
      name: "Q4 2024 Full Audit",
      date: "Oct 10, 2025",
      documents: 24,
      score: 94.2,
      status: "compliant",
    },
    {
      name: "Document Control Review",
      date: "Oct 8, 2025",
      documents: 12,
      score: 88.5,
      status: "needs-attention",
    },
    {
      name: "Resource Management Check",
      date: "Oct 5, 2025",
      documents: 18,
      score: 96.1,
      status: "compliant",
    },
    {
      name: "Training Records Audit",
      date: "Oct 2, 2025",
      documents: 31,
      score: 91.3,
      status: "compliant",
    },
  ];

  const aiTips = [
    "Consider adding calibration certificates for measuring equipment in Clause 7.1.5",
    "Your document retention policy could be strengthened with version control timestamps",
    "Training effectiveness evaluations are missing from 3 recent employee records",
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isClickable = stat.label === "Issues Found";
          const CardWrapper = isClickable ? "button" : "div";
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardWrapper
                className={isClickable ? "w-full text-left" : ""}
                onClick={isClickable ? () => onNavigate("anomalies") : undefined}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-gray-600">{stat.label}</p>
                    <p className="text-gray-900">{stat.value}</p>
                    <p className="text-gray-600">{stat.change}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardWrapper>
            </Card>
          );
        })}
      </div>

      {/* Recent Audits Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Recent Audits</h2>
          <Button
            variant="outline"
            onClick={() => onNavigate("reports")}
          >
            View All
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Audit Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Documents Analyzed</TableHead>
              <TableHead>Compliance Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAudits.map((audit, index) => (
              <TableRow key={index} className="cursor-pointer hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>{audit.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{audit.date}</TableCell>
                <TableCell className="text-gray-600">{audit.documents}</TableCell>
                <TableCell>
                  <span
                    className={
                      audit.score >= 90
                        ? "text-green-600"
                        : audit.score >= 80
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {audit.score}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={audit.status === "compliant" ? "default" : "secondary"}
                    className={
                      audit.status === "compliant"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {audit.status === "compliant" ? "Compliant" : "Needs Attention"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Connected Platforms */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Plug className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Connected Platforms</h3>
              <p className="text-gray-600">Your integrated document systems</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => onNavigate("settings")}>
            Manage
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center relative">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 15.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm-7-1.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <p className="text-gray-700">SharePoint</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center relative">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.62 8.43c-.44-1.84-2.1-3.2-4.07-3.2-2.3 0-4.17 1.87-4.17 4.17 0 .23.02.46.05.68A3.5 3.5 0 0 0 2 13.5C2 15.43 3.57 17 5.5 17h11c2.21 0 4-1.79 4-4 0-2.05-1.54-3.73-3.54-3.95-.3-2.08-2.03-3.68-4.13-3.68-.39 0-.76.05-1.11.15l-.1.11z"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <p className="text-gray-700">OneDrive</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors opacity-60">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.71 3.5L1.15 15l3.4 6.5L11.1 9.95 7.71 3.5M9.73 15H22.6L19.2 21.5H6.34M19.2 2.5l3.4 6.5-6.56 11.24-3.4-6.49"/>
              </svg>
            </div>
            <p className="text-gray-500">Google Drive</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors opacity-60">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 2L0 5.5 6 9 12 5.5 6 2M18 2L12 5.5 18 9 24 5.5 18 2M0 12.5L6 16 12 12.5 6 9 0 12.5M24 12.5L18 9 12 12.5 18 16 24 12.5M6 17.5L12 21 18 17.5 12 14 6 17.5Z"/>
              </svg>
            </div>
            <p className="text-gray-500">Dropbox</p>
          </div>
        </div>
      </Card>

      {/* AI Tips Box */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-3 flex-1">
            <h3 className="text-gray-900">AI Recommendations</h3>
            <p className="text-gray-700">3 ways to improve your last audit's compliance score:</p>
            <ul className="space-y-2">
              {aiTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
