import { LayoutDashboard, Upload, FileText, Settings, Shield, FileSearch, AlertTriangle, FolderOpen, MessageSquare, X, Menu, Building2, ListTodo, FileStack } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ currentPage, onNavigate, isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "my-tasks", label: "My Tasks", icon: ListTodo },
    { id: "company-projects", label: "Companies", icon: Building2 },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "verification", label: "Verification", icon: FileSearch },
    { id: "document-detail", label: "Document View", icon: FileStack },
    { id: "anomalies", label: "Anomalies", icon: AlertTriangle },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "document-chat", label: "AI Chat", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    onMobileClose(); // Close mobile sidebar when navigating
  };

  return (
    <TooltipProvider>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo & Toggle */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-3">
            <div className={`flex items-center gap-3 transition-all ${isCollapsed ? 'lg:justify-center lg:w-full' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className={`text-gray-900 transition-all ${isCollapsed ? 'lg:hidden' : ''}`}>
                VERITASQ
              </span>
            </div>
            
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileClose}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            // Show tooltip only when collapsed on desktop
            if (isCollapsed) {
              return (
                <div key={item.id}>
                  {/* Desktop with tooltip */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavigation(item.id)}
                        className={`hidden lg:flex w-full items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50"
                        } lg:justify-center`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Mobile without tooltip */}
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`lg:hidden w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Toggle Button - Desktop Only */}
        <div className="p-4 border-t border-gray-200 hidden lg:block">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className={`w-full gap-2 transition-all ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Menu className="w-4 h-4 flex-shrink-0" />
            <span className={`transition-all ${isCollapsed ? 'hidden' : ''}`}>
              Collapse
            </span>
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
