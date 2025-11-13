import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Building2, Users, FileText, Calendar, ExternalLink, Eye, Edit2, UserCircle } from "lucide-react";

interface Document {
  id: string;
  title: string;
  lastEdited: string;
  author: string;
  status: "draft" | "under-review" | "verified";
}

interface Project {
  id: string;
  companyName: string;
  companyLogo: string;
  projectTitle: string;
  progress: number;
  activeDocuments: number;
  teamMembers: number;
  status: "active" | "pending" | "completed";
  timeline: string;
  documents: Document[];
}

export function CompanyProjectsPage() {
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const projects: Project[] = [
    {
      id: "1",
      companyName: "Acme Corporation",
      companyLogo: "AC",
      projectTitle: "ISO 9001:2015 Initial Certification",
      progress: 75,
      activeDocuments: 24,
      teamMembers: 8,
      status: "active",
      timeline: "Jan 2025 - Jun 2025",
      documents: [
        {
          id: "d1",
          title: "Quality Manual v3.2",
          lastEdited: "2025-11-08",
          author: "Sarah Johnson",
          status: "verified"
        },
        {
          id: "d2",
          title: "Document Control Procedure",
          lastEdited: "2025-11-09",
          author: "Michael Chen",
          status: "under-review"
        },
        {
          id: "d3",
          title: "Risk Management Process",
          lastEdited: "2025-11-10",
          author: "John Smith",
          status: "draft"
        },
        {
          id: "d4",
          title: "Internal Audit Report Q3",
          lastEdited: "2025-11-07",
          author: "Emily Brown",
          status: "verified"
        }
      ]
    },
    {
      id: "2",
      companyName: "TechStart Industries",
      companyLogo: "TS",
      projectTitle: "Surveillance Audit 2025",
      progress: 45,
      activeDocuments: 12,
      teamMembers: 5,
      status: "active",
      timeline: "Oct 2025 - Dec 2025",
      documents: [
        {
          id: "d5",
          title: "Corrective Action Records",
          lastEdited: "2025-11-09",
          author: "David Lee",
          status: "under-review"
        },
        {
          id: "d6",
          title: "Management Review Minutes",
          lastEdited: "2025-11-08",
          author: "Anna White",
          status: "verified"
        },
        {
          id: "d7",
          title: "Training Competence Matrix",
          lastEdited: "2025-11-10",
          author: "James Wilson",
          status: "draft"
        }
      ]
    },
    {
      id: "3",
      companyName: "Global Manufacturing Ltd",
      companyLogo: "GM",
      projectTitle: "Process Improvement Initiative",
      progress: 90,
      activeDocuments: 18,
      teamMembers: 12,
      status: "active",
      timeline: "Aug 2025 - Nov 2025",
      documents: [
        {
          id: "d8",
          title: "Process Flow Diagrams",
          lastEdited: "2025-11-06",
          author: "Robert Taylor",
          status: "verified"
        },
        {
          id: "d9",
          title: "Work Instructions Rev 2.0",
          lastEdited: "2025-11-09",
          author: "Lisa Anderson",
          status: "verified"
        }
      ]
    },
    {
      id: "4",
      companyName: "Swift Logistics",
      companyLogo: "SL",
      projectTitle: "Transition to ISO 9001:2025",
      progress: 30,
      activeDocuments: 8,
      teamMembers: 6,
      status: "pending",
      timeline: "Dec 2025 - Apr 2026",
      documents: [
        {
          id: "d10",
          title: "Gap Analysis Report",
          lastEdited: "2025-11-05",
          author: "Mark Davis",
          status: "draft"
        }
      ]
    },
    {
      id: "5",
      companyName: "Precision Engineering",
      companyLogo: "PE",
      projectTitle: "Re-certification Audit",
      progress: 100,
      activeDocuments: 32,
      teamMembers: 10,
      status: "completed",
      timeline: "Mar 2025 - Oct 2025",
      documents: [
        {
          id: "d11",
          title: "Final Audit Report",
          lastEdited: "2025-10-28",
          author: "Catherine Moore",
          status: "verified"
        },
        {
          id: "d12",
          title: "Certificate of Compliance",
          lastEdited: "2025-10-30",
          author: "System Generated",
          status: "verified"
        }
      ]
    }
  ];

  const companies = ["all", ...new Set(projects.map(p => p.companyName))];

  const filteredProjects = selectedCompany === "all" 
    ? projects 
    : projects.filter(p => p.companyName === selectedCompany);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDocStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700 border-green-200";
      case "under-review":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Company Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Projects Overview</h2>
          <p className="text-gray-600">Manage projects across multiple companies</p>
        </div>
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <Building2 className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {companies.slice(1).map(company => (
              <SelectItem key={company} value={company}>{company}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Projects</p>
                <h3 className="text-gray-900">{filteredProjects.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Projects</p>
                <h3 className="text-gray-900">
                  {filteredProjects.filter(p => p.status === "active").length}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Documents</p>
                <h3 className="text-gray-900">
                  {filteredProjects.reduce((sum, p) => sum + p.activeDocuments, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Team Members</p>
                <h3 className="text-gray-900">
                  {filteredProjects.reduce((sum, p) => sum + p.teamMembers, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    <span>{project.companyLogo}</span>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-600 truncate">{project.companyName}</p>
                    <CardTitle className="text-gray-900 truncate">
                      {project.projectTitle}
                    </CardTitle>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{project.timeline}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{project.activeDocuments} docs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.teamMembers} members</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => handleOpenProject(project)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                Open Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No projects found for the selected company</p>
          </CardContent>
        </Card>
      )}

      {/* Project Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center">
                <span>{selectedProject?.companyLogo}</span>
              </Avatar>
              <div>
                <p className="text-gray-600">{selectedProject?.companyName}</p>
                <h3 className="text-gray-900">{selectedProject?.projectTitle}</h3>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Project Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-600">Progress</p>
                  <h3 className="text-gray-900">{selectedProject?.progress}%</h3>
                  <Progress value={selectedProject?.progress || 0} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-600">Documents</p>
                  <h3 className="text-gray-900">{selectedProject?.activeDocuments}</h3>
                  <p className="text-gray-500 mt-1">Active documents</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-600">Team</p>
                  <h3 className="text-gray-900">{selectedProject?.teamMembers}</h3>
                  <p className="text-gray-500 mt-1">Team members</p>
                </CardContent>
              </Card>
            </div>

            {/* Document History */}
            <div>
              <h4 className="text-gray-900 mb-4">Document History</h4>
              <div className="space-y-3">
                {selectedProject?.documents.map(doc => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                            <div className="min-w-0 flex-1">
                              <h5 className="text-gray-900 truncate">{doc.title}</h5>
                              <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-600">
                                <span className="flex items-center gap-1">
                                  <UserCircle className="w-4 h-4" />
                                  {doc.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(doc.lastEdited).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="outline" className={getDocStatusColor(doc.status)}>
                            {doc.status.replace("-", " ")}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
