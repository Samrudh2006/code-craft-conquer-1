import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeDCard from "@/components/ThreeDCard";

const Projects = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("All");

  const projects = [
    {
      title: "FarmIntellect",
      shortDesc: "Agricultural AI Platform",
      description:
        "An intelligent agricultural platform providing farm analytics, crop recommendations, and yield optimization tools for small-scale farmers using machine learning.",
      tags: ["Python", "Flask", "Machine Learning", "TensorFlow", "Google Drive"],
      github: "https://github.com/Samrudh2006/FarmIntellect",
      demo: "https://farm-intellect-65.lovable.app/",
      icon: "🌾",
      category: "AI/ML",
      complexity: "Advanced",
    },
    {
      title: "CureCoders",
      shortDesc: "Coding Learning Platform",
      description:
        "A comprehensive web application offering curated coding challenges, learning paths, and progress tracking for developers from beginners to advanced levels.",
      tags: ["Next.js", "React", "Node.js", "TypeScript", "Vercel"],
      github: "https://github.com/Samrudh2006/curecoders",
      demo: "https://curecoders.vercel.app/",
      icon: "💻",
      category: "Full-Stack",
      complexity: "Intermediate",
    },
    {
      title: "VerityGuard",
      shortDesc: "Network Security Tool",
      description:
        "A comprehensive network security analysis tool featuring vulnerability scanning, threat detection, and real-time monitoring capabilities for enterprise networks.",
      tags: ["Python", "Kali Linux", "Wireshark", "Network Security", "Penetration Testing"],
      github: "https://github.com/Samrudh2006/VerityGuard",
      demo: "#",
      icon: "🛡️",
      category: "Security",
      complexity: "Advanced",
    },
    {
      title: "Samrudh Labs — Premium Agency",
      shortDesc: "Agency Landing & Projects Showcase",
      description:
        "A polished agency-style website and projects showcase built to highlight premium digital services, case studies, and contact flows for clients.",
      tags: ["Next.js", "React", "TypeScript", "Vercel", "Tailwind"],
      github: "https://github.com/Samrudh2006/samrudh-labs-premium-agency",
      demo: "https://samrudh-labs-premium-agency-lpbizoa9s-24b11cs114-2780s-projects.vercel.app/",
      icon: "🏢",
      category: "Web",
      complexity: "Intermediate",
    },
  ];

  // Get unique technologies, categories, and complexities
  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.tags))];
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const complexities = ["All", "Beginner", "Intermediate", "Advanced"];

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const techMatch = selectedTech === "All" || project.tags.includes(selectedTech);
    const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;
    const complexityMatch = selectedComplexity === "All" || project.complexity === selectedComplexity;
    return techMatch && categoryMatch && complexityMatch;
  });

  return (
    <section id="projects" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
              PORTFOLIO
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Featured <span className="text-primary glow-text">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Innovative solutions in AI, Security, and Full-Stack Development
            </p>
          </div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter Projects</span>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">Category</p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Complexity Filter */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">Complexity</p>
              <div className="flex flex-wrap justify-center gap-2">
                {complexities.map((complexity) => (
                  <Button
                    key={complexity}
                    size="sm"
                    variant={selectedComplexity === complexity ? "default" : "outline"}
                    onClick={() => setSelectedComplexity(complexity)}
                    className="transition-all"
                  >
                    {complexity}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tech Stack Filter */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">Tech Stack</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {allTechs.map((tech) => (
                  <Button
                    key={tech}
                    size="sm"
                    variant={selectedTech === tech ? "default" : "outline"}
                    onClick={() => setSelectedTech(tech)}
                    className="transition-all text-xs"
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <p className="text-center text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key="projects-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="perspective-1000"
                    onHoverStart={() => setFlippedCard(index)}
                    onHoverEnd={() => setFlippedCard(null)}
                  >
                    <ThreeDCard className="h-96">
                      <div className="relative h-full preserve-3d">
                        <AnimatePresence mode="wait">
                          {flippedCard !== index ? (
                            <motion.div
                              key="front"
                              initial={{ rotateY: 0 }}
                              animate={{ rotateY: 0 }}
                              exit={{ rotateY: 90 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 backface-hidden"
                            >
                              <Card className="p-8 h-full glass-panel hover:shadow-2xl transition-all flex flex-col justify-between group">
                                <div className="space-y-4">
                                  <div className="text-6xl">{project.icon}</div>
                                  <div>
                                    <h3 className="text-2xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                                      {project.title}
                                    </h3>
                                    <p className="text-muted-foreground">{project.shortDesc}</p>
                                    <div className="flex gap-2 mt-2">
                                      <Badge variant="secondary" className="text-xs">
                                        {project.category}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${project.complexity === "Advanced"
                                            ? "border-red-500 text-red-500"
                                            : project.complexity === "Intermediate"
                                              ? "border-yellow-500 text-yellow-500"
                                              : "border-green-500 text-green-500"
                                          }`}
                                      >
                                        {project.complexity}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {project.tags.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{project.tags.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground text-center">
                                  Hover to see details →
                                </p>
                              </Card>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="back"
                              initial={{ rotateY: -90 }}
                              animate={{ rotateY: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 backface-hidden"
                            >
                              <Card className="p-6 h-full glass-panel bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col justify-between">
                                <div className="space-y-4">
                                  <h3 className="text-xl font-bold text-foreground font-heading">
                                    {project.title}
                                  </h3>
                                  <p className="text-sm text-foreground/80">{project.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                  <Button variant="outline" size="sm" className="flex-1" asChild>
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Github className="mr-2 h-4 w-4" />
                                      Code
                                    </a>
                                  </Button>
                                  {project.demo !== "#" && (
                                    <Button size="sm" className="flex-1" asChild>
                                      <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </Card>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </ThreeDCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground text-lg">No projects match your filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTech("All");
                    setSelectedCategory("All");
                    setSelectedComplexity("All");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;