
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FileExplorer from "@/components/FileExplorer";
import CodeEditor from "@/components/CodeEditor";
import Console from "@/components/Console";
import AIAssistant from "@/components/AIAssistant";
import ProjectManager from "@/components/ProjectManager";
import HeaderActions from "@/components/HeaderActions";
import { useIsMobile, useDeviceType } from "@/hooks/use-mobile";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showProjects, setShowProjects] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const isMobile = useIsMobile();
  const { isTablet } = useDeviceType();

  // Initialize dark mode based on user preference
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    // Simulate auth loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Hide sidebar by default on mobile
    if (isMobile) {
      setSidebarVisible(false);
    }
  }, [isMobile]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Handle file selection
  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
    // Auto-hide sidebar on mobile after file selection
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  // Handle project selection
  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedFile(null); // Reset selected file when changing projects
    setShowProjects(false); // Hide projects view after selection
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Show loader while authentication state is loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Main content based on authentication and project selection
  const renderMainContent = () => {
    if (!user) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
          <div className="max-w-4xl text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Welcome to Codex IDE</h1>
            <h2 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6 text-blue-600 dark:text-blue-400 typing-animation">
              A collaborative online coding platform
            </h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
              Write, execute, and collaborate on code in real-time with AI assistance.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 text-left mb-8 sm:mb-12">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  Multi-language Support
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Code in Python, JavaScript, C++, Java, HTML/CSS and more with syntax highlighting.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                  Real-time Collaboration
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Seamlessly collaborate with team members through live editing and chat.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  AI Assistant
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Get intelligent code suggestions, explanations, and bug fixes from our AI.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  Extensions & Plugins
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Enhance your workflow with themes, tools, and custom plugins.
                </p>
              </div>
            </div>
            
            <button 
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg shadow-md"
              onClick={() => setUser({ displayName: "Demo User" })}
            >
              Get Started
            </button>
          </div>
        </div>
      );
    }

    if (showProjects || !selectedProjectId) {
      return (
        <div className="h-[calc(100vh-4rem)] overflow-auto bg-white dark:bg-gray-900">
          <ProjectManager
            onSelectProject={handleProjectSelect}
            selectedProjectId={selectedProjectId}
          />
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Toggle sidebar button for mobile */}
          {!sidebarVisible && (
            <button 
              onClick={toggleSidebar}
              className="md:hidden absolute top-16 left-2 z-10 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          )}
          
          {/* File Explorer Sidebar with responsive visibility */}
          <div className={`${sidebarVisible ? 'block' : 'hidden'} ${isMobile ? 'absolute z-10 bg-white dark:bg-gray-900 h-full' : 'relative'} md:block w-full md:w-64 lg:w-72 overflow-hidden border-r border-gray-200 dark:border-gray-700`}>
            <div className="flex justify-between items-center p-2 md:hidden border-b border-gray-200 dark:border-gray-700">
              <span className="font-medium">Files</span>
              <button onClick={toggleSidebar} className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <FileExplorer
              projectId={selectedProjectId}
              onFileSelect={handleFileSelect}
              selectedFileId={selectedFile?.id || null}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <CodeEditor file={selectedFile} />
          </div>
        </div>
        <div style={{ height: isMobile ? "40%" : "30%" }}>
          <Console
            projectId={selectedProjectId}
            currentFile={selectedFile ? { id: selectedFile.id, type: selectedFile.type } : null}
          />
        </div>
        
        {/* AI Assistant */}
        <AIAssistant currentCode={selectedFile?.content || ""} />
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar 
        user={user} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <div className="flex items-center px-2 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <HeaderActions 
          onShowProjects={() => setShowProjects(true)}
          projectName={!showProjects && selectedProjectId ? (
            selectedProjectId === "1" ? "Demo Project" : 
            selectedProjectId === "2" ? "Personal Website" : 
            "New Project"
          ) : undefined}
        />
      </div>
      
      {renderMainContent()}
    </div>
  );
};

export default Index;
