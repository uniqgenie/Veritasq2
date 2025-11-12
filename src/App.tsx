import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { DashboardHome } from "./components/DashboardHome";
import { UploadPage } from "./components/UploadPage";
import { DocumentVerificationPage } from "./components/DocumentVerificationPage";
import { AnomaliesOverviewPage } from "./components/AnomaliesOverviewPage";
import { ReportPage } from "./components/ReportPage";
import { SettingsPage } from "./components/SettingsPage";
import { AIChatPanel } from "./components/AIChatPanel";
import { ProjectsPage } from "./components/ProjectsPage";
import { DocumentChatPage } from "./components/DocumentChatPage";
import { PersonTasksPage } from "./components/PersonTasksPage";
import { CompanyProjectsPage } from "./components/CompanyProjectsPage";
import { DocumentDetailPage } from "./components/DocumentDetailPage";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Bell, Plus, Menu } from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileSidebar}
                className="lg:hidden flex-shrink-0"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-gray-900 truncate">
                  {currentPage === "dashboard" && "Dashboard"}
                  {currentPage === "my-tasks" && "My Tasks"}
                  {currentPage === "company-projects" && "Company Projects"}
                  {currentPage === "projects" && "Projects"}
                  {currentPage === "upload" && "Upload Documents"}
                  {currentPage === "verification" && "Document Verification"}
                  {currentPage === "document-detail" && "Document Detail"}
                  {currentPage === "anomalies" && "Anomalies Overview"}
                  {currentPage === "reports" && "Compliance Reports"}
                  {currentPage === "document-chat" && "AI Document Assistant"}
                  {currentPage === "settings" && "Settings"}
                </h1>
                <p className="text-gray-600 hidden md:block truncate">
                  {currentPage === "dashboard" && "Welcome back, John"}
                  {currentPage === "my-tasks" && "View and manage your assigned tasks"}
                  {currentPage === "company-projects" && "Manage projects across multiple companies"}
                  {currentPage === "projects" && "Manage all your ISO 9001 compliance projects"}
                  {currentPage === "upload" && "Analyze your ISO 9001 documents"}
                  {currentPage === "verification" && "Review AI-powered document analysis"}
                  {currentPage === "document-detail" && "View document with AI assistant"}
                  {currentPage === "anomalies" && "Track and resolve compliance issues"}
                  {currentPage === "reports" && "View detailed compliance analysis"}
                  {currentPage === "document-chat" && "Ask questions about your documents"}
                  {currentPage === "settings" && "Manage your account preferences"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              {currentPage === "dashboard" && (
                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 gap-2 hidden sm:flex"
                  onClick={() => handleNavigate("upload")}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden md:inline">Start New Audit</span>
                  <span className="md:hidden">New Audit</span>
                </Button>
              )}
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-500 text-white">JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {currentPage === "dashboard" && <DashboardHome onNavigate={handleNavigate} />}
          {currentPage === "my-tasks" && <PersonTasksPage />}
          {currentPage === "company-projects" && <CompanyProjectsPage />}
          {currentPage === "projects" && <ProjectsPage onNavigate={handleNavigate} />}
          {currentPage === "upload" && <UploadPage onNavigate={handleNavigate} />}
          {currentPage === "verification" && <DocumentVerificationPage />}
          {currentPage === "document-detail" && <DocumentDetailPage onNavigate={handleNavigate} />}
          {currentPage === "anomalies" && <AnomaliesOverviewPage onNavigate={handleNavigate} />}
          {currentPage === "reports" && <ReportPage />}
          {currentPage === "document-chat" && <DocumentChatPage />}
          {currentPage === "settings" && <SettingsPage />}
        </main>
      </div>

      {/* AI Chat Panel */}
      <AIChatPanel />
    </div>
  );
}
