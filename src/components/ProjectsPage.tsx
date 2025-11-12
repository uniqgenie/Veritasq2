import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Plus,
  Search,
  FolderOpen,
  Calendar,
  Users,
  BarChart3,
  MoreVertical,
  Archive,
  Trash2,
  Edit2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
  complianceScore: number;
  documentsCount: number;
  lastUpdated: string;
  createdDate: string;
  teamMembers: number;
  anomaliesCount: number;
}

interface ProjectsPageProps {
  onNavigate?: (page: string, projectId?: string) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-001",
      name: "Q4 2024 ISO 9001 Audit",
      description: "Comprehensive audit for manufacturing division",
      status: "active",
      complianceScore: 92,
      documentsCount: 156,
      lastUpdated: "2 hours ago",
      createdDate: "Oct 15, 2024",
      teamMembers: 5,
      anomaliesCount: 3,
    },
    {
      id: "proj-002",
      name: "Supplier Quality Assessment",
      description: "Third-party vendor compliance review",
      status: "active",
      complianceScore: 87,
      documentsCount: 89,
      lastUpdated: "1 day ago",
      createdDate: "Oct 20, 2024",
      teamMembers: 3,
      anomaliesCount: 7,
    },
    {
      id: "proj-003",
      name: "Internal Process Review",
      description: "Documentation verification for production processes",
      status: "completed",
      complianceScore: 95,
      documentsCount: 203,
      lastUpdated: "3 days ago",
      createdDate: "Sep 5, 2024",
      teamMembers: 4,
      anomaliesCount: 0,
    },
    {
      id: "proj-004",
      name: "New Product Launch Compliance",
      description: "ISO 9001 readiness for new product line",
      status: "active",
      complianceScore: 78,
      documentsCount: 67,
      lastUpdated: "5 hours ago",
      createdDate: "Oct 28, 2024",
      teamMembers: 6,
      anomaliesCount: 12,
    },
    {
      id: "proj-005",
      name: "Annual Certification Renewal",
      description: "Documentation update for yearly certification",
      status: "completed",
      complianceScore: 98,
      documentsCount: 341,
      lastUpdated: "2 weeks ago",
      createdDate: "Jul 10, 2024",
      teamMembers: 8,
      anomaliesCount: 1,
    },
    {
      id: "proj-006",
      name: "Corrective Action Implementation",
      description: "Follow-up on previous audit findings",
      status: "archived",
      complianceScore: 89,
      documentsCount: 45,
      lastUpdated: "1 month ago",
      createdDate: "Jun 3, 2024",
      teamMembers: 2,
      anomaliesCount: 0,
    },
  ]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "archived":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">Manage all your ISO 9001 compliance projects</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Projects</p>
              <p className="text-gray-900 mt-1">{projects.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Projects</p>
              <p className="text-gray-900 mt-1">
                {projects.filter((p) => p.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Avg. Compliance</p>
              <p className="text-gray-900 mt-1">
                {Math.round(
                  projects.reduce((acc, p) => acc + p.complianceScore, 0) / projects.length
                )}
                %
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Documents</p>
              <p className="text-gray-900 mt-1">
                {projects.reduce((acc, p) => acc + p.documentsCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={
                filterStatus === "all"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => setFilterStatus("active")}
              className={
                filterStatus === "active"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              onClick={() => setFilterStatus("completed")}
              className={
                filterStatus === "completed"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === "archived" ? "default" : "outline"}
              onClick={() => setFilterStatus("archived")}
              className={
                filterStatus === "archived"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              Archived
            </Button>
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="p-6 border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => onNavigate?.("dashboard")}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-gray-900">{project.name}</h3>
                    <Badge
                      variant="outline"
                      className={getStatusColor(project.status)}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Compliance Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Compliance Score</span>
                  <span
                    className={`${getComplianceColor(
                      project.complianceScore
                    )}`}
                  >
                    {project.complianceScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      project.complianceScore >= 90
                        ? "bg-green-500"
                        : project.complianceScore >= 75
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${project.complianceScore}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600">Documents</p>
                  <p className="text-gray-900 mt-1">{project.documentsCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Anomalies</p>
                  <p className="text-gray-900 mt-1">{project.anomaliesCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Team</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Users className="w-4 h-4 text-gray-600" />
                    <p className="text-gray-900">{project.teamMembers}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Updated</p>
                  <p className="text-gray-900 mt-1 text-sm">{project.lastUpdated}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Created {project.createdDate}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="p-12 border-gray-200 shadow-sm">
          <div className="text-center">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
