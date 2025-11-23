import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

const projects: Record<string, Project> = {
  farmintellect: {
    title: "FarmIntellect",
    description: "An AI-powered agricultural platform that provides crop recommendations, pest detection, and yield predictions using machine learning models.",
    techStack: ["Python", "TensorFlow", "React", "Node.js", "AWS"],
    highlights: [
      "Real-time crop health monitoring",
      "AI-driven pest identification",
      "Yield prediction algorithms",
      "Mobile-responsive interface",
    ],
  },
  curecoders: {
    title: "CureCoders",
    description: "A comprehensive platform for learning competitive programming with interactive challenges, real-time collaboration, and AI-powered code review.",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
    highlights: [
      "Interactive coding challenges",
      "Real-time code collaboration",
      "AI code review system",
      "Progress tracking dashboard",
    ],
  },
  verityguard: {
    title: "VerityGuard",
    description: "A security tool suite for network analysis, vulnerability assessment, and threat detection using advanced networking and security protocols.",
    techStack: ["Python", "Wireshark", "Kali Linux", "C++", "React"],
    highlights: [
      "Network packet analysis",
      "Vulnerability scanning",
      "Threat detection system",
      "Security audit reports",
    ],
  },
  comptracker: {
    title: "Competitive Programming Tracker",
    description: "A personal tracker for competitive programming progress across multiple platforms with analytics and performance insights.",
    techStack: ["React", "Node.js", "PostgreSQL", "Chart.js", "Docker"],
    highlights: [
      "Multi-platform integration",
      "Performance analytics",
      "Coding streak tracking",
      "Problem difficulty analysis",
    ],
  },
};

const ProjectExplainerAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState<string>("");

  const handleAskQuestion = () => {
    if (!question.trim() || !selectedProject) return;

    const project = projects[selectedProject];
    const lowerQ = question.toLowerCase();

    let answer = "I can help explain this project. Ask about its features, technology stack, or implementation details.";

    if (lowerQ.includes("tech") || lowerQ.includes("stack") || lowerQ.includes("built")) {
      answer = `${project.title} uses: ${project.techStack.join(", ")}`;
    } else if (lowerQ.includes("what") || lowerQ.includes("do")) {
      answer = project.description;
    } else if (lowerQ.includes("feature") || lowerQ.includes("highlight")) {
      answer = `Key features: ${project.highlights.join(", ")}`;
    } else if (lowerQ.includes("how")) {
      answer = `${project.title} combines ${project.techStack.slice(0, 2).join(" and ")} to ${project.description.slice(0, 50)}...`;
    }

    setExplanation(answer);
    setQuestion("");
  };

  return (
    <>
      <motion.div
        className="fixed bottom-24 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl"
          size="icon"
          title="Project Explainer Agent"
        >
          <BookOpen className="h-5 w-5" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
          >
            <Card className="glass-panel overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">Project Explainer</h3>
                    <p className="text-xs text-white/80">Learn about projects in detail</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedProject(null);
                    }}
                    className="text-white hover:bg-white/20 rounded p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3 h-96 overflow-y-auto">
                {!selectedProject ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium mb-3">Select a project:</p>
                    {Object.entries(projects).map(([key, project]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedProject(key);
                          setExplanation(project.description);
                        }}
                        className="w-full text-left p-3 bg-muted hover:bg-muted/80 rounded transition-colors"
                      >
                        <p className="font-medium text-sm">{project.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {project.techStack.slice(0, 2).join(", ")}...
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setExplanation("");
                        setQuestion("");
                      }}
                      className="text-xs text-primary hover:underline"
                    >
                      ← Back to projects
                    </button>

                    <div className="bg-muted p-3 rounded text-sm">
                      <p className="font-medium mb-2">{projects[selectedProject].title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{explanation}</p>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAskQuestion()}
                        placeholder="Ask about this project..."
                        className="w-full bg-input rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button
                        onClick={handleAskQuestion}
                        size="sm"
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Ask
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectExplainerAgent;