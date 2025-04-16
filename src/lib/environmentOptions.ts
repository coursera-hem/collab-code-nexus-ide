
// Environment options for the code editor
export type Environment = 'web' | 'python' | 'java' | 'c' | 'cpp';

export const environmentOptions = [
  { id: 'web', name: 'Web Development', description: 'HTML, CSS, JavaScript', icon: 'code' },
  { id: 'python', name: 'Python', description: 'Python 3', icon: 'python' },
  { id: 'java', name: 'Java', description: 'Java Development Kit', icon: 'coffee' },
  { id: 'c', name: 'C', description: 'C Programming', icon: 'file-code' },
  { id: 'cpp', name: 'C++', description: 'C++ Programming', icon: 'file-code' }
];

// Get environment display name
export const getEnvironmentName = (environmentId: Environment): string => {
  const environment = environmentOptions.find(env => env.id === environmentId);
  return environment ? environment.name : 'Unknown Environment';
};

// Get environment specific settings
export const getEnvironmentSettings = (environmentId: Environment) => {
  switch(environmentId) {
    case 'web':
      return {
        hasLiveServer: true,
        terminalType: 'browser',
        defaultFiles: [
          { name: 'index.html', type: 'html' },
          { name: 'styles.css', type: 'css' },
          { name: 'script.js', type: 'javascript' }
        ]
      };
    case 'python':
      return {
        hasLiveServer: false,
        terminalType: 'console',
        defaultFiles: [
          { name: 'main.py', type: 'python' }
        ]
      };
    case 'java':
      return {
        hasLiveServer: false,
        terminalType: 'console',
        defaultFiles: [
          { name: 'Main.java', type: 'java' }
        ]
      };
    case 'c':
      return {
        hasLiveServer: false,
        terminalType: 'console',
        defaultFiles: [
          { name: 'main.c', type: 'c' }
        ]
      };
    case 'cpp':
      return {
        hasLiveServer: false,
        terminalType: 'console',
        defaultFiles: [
          { name: 'main.cpp', type: 'cpp' }
        ]
      };
    default:
      return {
        hasLiveServer: false,
        terminalType: 'console',
        defaultFiles: []
      };
  }
};
