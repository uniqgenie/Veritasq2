import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Clock, Flag, FolderOpen, User, CheckCircle2, Circle, PlayCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inprogress" | "completed";
  progress: number;
  description: string;
}

export function PersonTasksPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [filterProject, setFilterProject] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterDeadline, setFilterDeadline] = useState("all");

  const tasks: Task[] = [
    {
      id: "1",
      title: "Review Quality Manual Section 4.3",
      project: "Acme Corp Audit",
      dueDate: "2025-11-15",
      priority: "high",
      status: "inprogress",
      progress: 65,
      description: "Complete review of context of organization requirements"
    },
    {
      id: "2",
      title: "Verify Document Control Procedures",
      project: "TechStart Compliance",
      dueDate: "2025-11-12",
      priority: "high",
      status: "todo",
      progress: 0,
      description: "Check clause 7.5 compliance for document control"
    },
    {
      id: "3",
      title: "Internal Audit Report Analysis",
      project: "Acme Corp Audit",
      dueDate: "2025-11-20",
      priority: "medium",
      status: "inprogress",
      progress: 40,
      description: "Analyze findings from Q3 internal audit"
    },
    {
      id: "4",
      title: "Risk Assessment Documentation",
      project: "Global Manufacturing",
      dueDate: "2025-11-10",
      priority: "low",
      status: "completed",
      progress: 100,
      description: "Complete risk assessment for new processes"
    },
    {
      id: "5",
      title: "Training Records Verification",
      project: "TechStart Compliance",
      dueDate: "2025-11-18",
      priority: "medium",
      status: "todo",
      progress: 0,
      description: "Verify competence records for all staff"
    },
    {
      id: "6",
      title: "Corrective Action Follow-up",
      project: "Global Manufacturing",
      dueDate: "2025-11-11",
      priority: "high",
      status: "completed",
      progress: 100,
      description: "Follow up on previous audit findings"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "inprogress":
        return <PlayCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterProject !== "all" && task.project !== filterProject) return false;
    if (filterPriority !== "all" && task.priority !== filterPriority) return false;
    if (filterDeadline !== "all") {
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (filterDeadline === "overdue" && diffDays >= 0) return false;
      if (filterDeadline === "today" && diffDays !== 0) return false;
      if (filterDeadline === "week" && (diffDays < 0 || diffDays > 7)) return false;
      if (filterDeadline === "month" && (diffDays < 0 || diffDays > 30)) return false;
    }
    return true;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === "todo"),
    inprogress: filteredTasks.filter(t => t.status === "inprogress"),
    completed: filteredTasks.filter(t => t.status === "completed")
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-gray-900 line-clamp-2">{task.title}</h4>
          <Badge variant="outline" className={`${getPriorityColor(task.priority)} flex-shrink-0`}>
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
          </Badge>
        </div>
        
        <p className="text-gray-600 line-clamp-2">{task.description}</p>

        <div className="flex items-center gap-2 text-gray-600">
          <FolderOpen className="w-4 h-4" />
          <span className="truncate">{task.project}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        {task.status !== "completed" && task.progress > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>
        )}

        {task.status === "completed" && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-white shadow-lg">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-500 text-white">JS</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-gray-900">John Smith</h2>
                <p className="text-gray-700">Senior ISO 9001 Auditor</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-500 text-white">Active</Badge>
                  <span className="text-gray-700">{tasks.length} tasks assigned</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <User className="w-4 h-4 mr-2" />
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select value={filterProject} onValueChange={setFilterProject}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="Acme Corp Audit">Acme Corp Audit</SelectItem>
              <SelectItem value="TechStart Compliance">TechStart Compliance</SelectItem>
              <SelectItem value="Global Manufacturing">Global Manufacturing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterDeadline} onValueChange={setFilterDeadline}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by deadline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deadlines</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="today">Due Today</SelectItem>
              <SelectItem value="week">Next 7 Days</SelectItem>
              <SelectItem value="month">Next 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "kanban" | "list")} className="flex-shrink-0">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tasks View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Circle className="w-5 h-5 text-gray-500" />
                  To Do
                </CardTitle>
                <Badge variant="secondary">{tasksByStatus.todo.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasksByStatus.todo.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasksByStatus.todo.length === 0 && (
                <p className="text-center text-gray-500 py-8">No tasks</p>
              )}
            </CardContent>
          </Card>

          {/* In Progress Column */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-blue-500" />
                  In Progress
                </CardTitle>
                <Badge variant="secondary">{tasksByStatus.inprogress.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasksByStatus.inprogress.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasksByStatus.inprogress.length === 0 && (
                <p className="text-center text-gray-500 py-8">No tasks</p>
              )}
            </CardContent>
          </Card>

          {/* Completed Column */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Completed
                </CardTitle>
                <Badge variant="secondary">{tasksByStatus.completed.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasksByStatus.completed.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasksByStatus.completed.length === 0 && (
                <p className="text-center text-gray-500 py-8">No tasks</p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <div key={task.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex-shrink-0">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 truncate">{task.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-gray-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <FolderOpen className="w-4 h-4" />
                        {task.project}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getPriorityColor(task.priority)} flex-shrink-0`}>
                    {task.priority}
                  </Badge>
                  {task.status !== "completed" && task.progress > 0 && (
                    <div className="w-32 flex-shrink-0 hidden md:block">
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
              {filteredTasks.length === 0 && (
                <p className="text-center text-gray-500 py-12">No tasks match the selected filters</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
