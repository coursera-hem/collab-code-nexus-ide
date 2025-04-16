
// Language options for the code editor
export const languageOptions = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'html', name: 'HTML', extension: 'html' },
  { id: 'css', name: 'CSS', extension: 'css' },
  { id: 'json', name: 'JSON', extension: 'json' },
  { id: 'markdown', name: 'Markdown', extension: 'md' },
  { id: 'plaintext', name: 'Plain Text', extension: 'txt' },
];

// Function to detect language from file extension
export const detectLanguage = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  for (const lang of languageOptions) {
    if (lang.extension === extension) {
      return lang.id;
    }
  }
  
  return 'plaintext';
};

// Function to get file icon based on language/extension
export const getFileIcon = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  const iconMap: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    jsx: 'javascript',
    tsx: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    html: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    txt: 'text',
  };
  
  return iconMap[extension] || 'file';
};

// Sample templates for new files
export const fileTemplates: Record<string, string> = {
  js: `// JavaScript file
console.log('Hello world!');

function greet(name) {
  return \`Hello, \${name}!\`;
}`,
  
  ts: `// TypeScript file
interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

const user: Person = { name: "John", age: 30 };
console.log(greet(user));`,
  
  py: `# Python file
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))

# Example class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."`,
  
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML document.</p>
</body>
</html>`,
  
  css: `/* CSS styles */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #0066cc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}`,
  
  java: `// Java file
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Create a new person
        Person person = new Person("John", 30);
        System.out.println(person.introduce());
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String introduce() {
        return "Hi, I'm " + name + " and I'm " + age + " years old.";
    }
}`,
  
  cpp: `// C++ file
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    
public:
    Person(std::string name, int age) : name(name), age(age) {}
    
    std::string introduce() {
        return "Hi, I'm " + name + " and I'm " + std::to_string(age) + " years old.";
    }
};

int main() {
    std::cout << "Hello, World!" << std::endl;
    
    Person person("John", 30);
    std::cout << person.introduce() << std::endl;
    
    return 0;
}`,
  
  md: `# Markdown Document

## Introduction
This is a simple Markdown document. Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

## Features
- **Bold text** and *italic text*
- Lists (like this one)
- [Links](https://example.com)
- Code blocks:

\`\`\`javascript
// Code example
function hello() {
  console.log("Hello, world!");
}
\`\`\`

## Tables

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`,
};
