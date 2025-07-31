// components/layout/MyTasksDropdown.tsx
'use client';

import { CheckSquare, ChevronDown, Clock, FolderOpen, User } from "lucide-react"

// Mock user tasks data
const myTasks = [
  {
    id: "1",
    title: "API Integration Development",
    projectName: "AI Platform Development",
    portfolioName: "Technology Portfolio",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-02-15",
    progress: 80
  },
  {
    id: "2",
    title: "Database Schema Review",
    projectName: "E-commerce Redesign",
    portfolioName: "Digital Transformation",
    status: "Review",
    priority: "Medium",
    dueDate: "2024-02-12",
    progress: 95
  },
  {
    id: "3",
    title: "Security Audit Report",
    projectName: "Infrastructure Upgrade",
    portfolioName: "IT Operations",
    status: "To Do",
    priority: "High",
    dueDate: "2024-02-18",
    progress: 0
  },
  {
    id: "4",
    title: "UI Component Testing",
    projectName: "Mobile App Development",
    portfolioName: "Product Innovation",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2024-02-14",
    progress: 60
  },
  {
    id: "5",
    title: "Performance Optimization",
    projectName: "Website Overhaul",
    portfolioName: "Digital Transformation",
    status: "Completed",
    priority: "Low",
    dueDate: "2024-02-10",
    progress: 100
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Review":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-orange-100 text-orange-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckSquare className="w-3 h-3 text-green-500" />;
    case "In Progress":
      return <Clock className="w-3 h-3 text-blue-500" />;
    case "Review":
      return <User className="w-3 h-3 text-yellow-500" />;
    default:
      return <Clock className="w-3 h-3 text-gray-400" />;
  }
};

export function MyTasksDropdown() {
  const pendingTasks = myTasks.filter(task => task.status !== "Completed");
  const completedTasks = myTasks.filter(task => task.status === "Completed");

  return (
    <div className="relative">
      <button className="gap-2 hover:bg-accent rounded-lg px-3 py-2 flex items-center text-sm">
        <CheckSquare className="w-4 h-4" />
        <span className="hidden sm:inline">My Tasks</span>
        <div className="ml-1 inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold">
          {pendingTasks.length}
        </div>
        <ChevronDown className="w-3 h-3" />
      </button>
      
      {/* Выпадающее меню в упрощенном виде */}
      <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg hidden">
        <div className="p-3 border-b">
          <div className="flex items-center justify-between">
            <span className="font-medium">My Tasks</span>
            <div className="inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold">
              {pendingTasks.length} active
            </div>
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          <div className="space-y-1 p-1">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex-col items-start p-3 space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => window.location.href = `/tasks?taskId=${task.id}`}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="font-medium text-sm truncate">{task.title}</span>
                      </div>
                      <div className="flex gap-1">
                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(task.status)}`}>
                          {task.status}
                        </div>
                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <FolderOpen className="w-3 h-3" />
                      <span>{task.portfolioName}</span>
                      <span>•</span>
                      <span>{task.projectName}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{task.progress}%</span>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 p-4">
                No active tasks
              </div>
            )}
          </div>
        </div>
        
        <div className="p-2 border-t">
          <div 
            className="text-center text-sm text-blue-500 cursor-pointer"
            onClick={() => window.location.href = '/tasks'}
          >
            View All Tasks
          </div>
        </div>
      </div>
    </div>
  );
}