import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Database, Cloud, Shield, Cpu, Brain } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: [
        { name: "Python", proficiency: 95 },
        { name: "C", proficiency: 85 },
        { name: "C++", proficiency: 85 },
        { name: "JavaScript", proficiency: 90 },
        { name: "HTML5", proficiency: 95 },
        { name: "CSS3", proficiency: 90 }
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Web Technologies",
      icon: Cpu,
      skills: [
        { name: "React", proficiency: 92 },
        { name: "NodeJS", proficiency: 88 },
        { name: "Express.js", proficiency: 87 }
      ],
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Data Science",
      icon: Brain,
      skills: [
        { name: "NumPy", proficiency: 92 },
        { name: "Pandas", proficiency: 90 },
        { name: "Matplotlib", proficiency: 85 }
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "MongoDB", proficiency: 90 },
        { name: "MySQL", proficiency: 88 }
      ],
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Tools & Platforms",
      icon: Cloud,
      skills: [
        { name: "Netlify", proficiency: 90 },
        { name: "Vercel", proficiency: 92 },
        { name: "Portfolio", proficiency: 100 }
      ],
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
              SKILLS & EXPERTISE
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Technical <span className="text-primary glow-text">Arsenal</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit spanning AI/ML, Security, Cloud, and Full-Stack Development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="p-6 h-full glass-panel hover:shadow-2xl transition-all group relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold font-heading text-foreground">
                          {category.title}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                            className="space-y-1"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-foreground">
                                {skill.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {skill.proficiency}%
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1,
                                  delay: index * 0.1 + skillIndex * 0.05,
                                  ease: "easeOut"
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;