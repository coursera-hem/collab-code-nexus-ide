
import { useState } from "react";
import { Folder, FolderPlus, Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface ProjectManagerProps {
  onSelectProject: (projectId: string) => void;
  selectedProjectId: string | null;
}

const ProjectManager = ({ onSelectProject, selectedProjectId }: ProjectManagerProps) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Demo Project",
      description: "A sample project to demonstrate the IDE",
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "user123",
    },
    {
      id: "2",
      name: "Personal Website",
      description: "My personal portfolio website",
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
      createdBy: "user123",
    },
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const createNewProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject = {
      id: `project-${Date.now()}`,
      name: newProjectName,
      description: newProjectDesc,
      isPublic,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "user123",
    };
    
    setProjects([...projects, newProject]);
    setNewProjectName("");
    setNewProjectDesc("");
    setIsPublic(false);
    setIsCreateDialogOpen(false);
    
    // Select the newly created project
    onSelectProject(newProject.id);
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    
    // If the deleted project was selected, select another one if available
    if (selectedProjectId === projectId && projects.length > 1) {
      const nextProject = projects.find(p => p.id !== projectId);
      if (nextProject) {
        onSelectProject(nextProject.id);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">My Projects</h2>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <FolderPlus size={16} className="mr-2" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`border rounded-lg p-4 cursor-pointer group ${
              selectedProjectId === project.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
            }`}
            onClick={() => onSelectProject(project.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium line-clamp-1 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {project.description || "No description"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(project.id);
                }}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                Updated {project.updatedAt.toLocaleDateString()}
              </span>
              {project.isPublic ? (
                <span className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                  Public
                </span>
              ) : (
                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  Private
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {isCreateDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsCreateDialogOpen(false)}
          />
          <div className="z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Awesome Project"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description (optional)</label>
                <input
                  type="text"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="A brief description of your project"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is-public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is-public">Make project public</label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={createNewProject}
                disabled={!newProjectName.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
