import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      type: "Education",
      title: "Bachelor of Technology (B.Tech), Computer Science & Engineering",
      organization: "Aditya University",
      location: "India",
      period: "Sep 2024 - Sep 2028",
      description: "Pursuing B.Tech in Computer Science with a Minor in AI (IIT Mandi). Focused on Data Science, Machine Learning, and Full-Stack development.",
      highlights: ["Minor in AI (IIT Mandi)", "Relevant coursework: DBMS, Agile Software Engineering", "Projects: FarmIntellect, CureCoders"]
    },
    {
      type: "Education",
      title: "Intermediate",
      organization: "Sri Prakash Junior College",
      location: "India",
      period: "Jul 2022 - Sep 2024",
      description: "Completed intermediate education with emphasis on STEM subjects.",
      highlights: ["Core focus: Mathematics, Physics, Computer Science"]
    },
    {
      type: "Education",
      title: "High School",
      organization: "Narayana E Techno School",
      location: "India",
      period: "Jun 2017 - Mar 2022",
      description: "Completed primary and secondary education with a strong foundation in core subjects.",
      highlights: ["Strong foundation in fundamentals and early exposure to coding"]
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
              EXPERIENCE & EDUCATION
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Educational <span className="text-primary glow-text">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building expertise through continuous learning and hands-on projects
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 glass-panel hover:shadow-2xl transition-all group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Award className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {exp.type}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">{exp.organization}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>

                      <p className="text-foreground/80">{exp.description}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.highlights.map((highlight, hIndex) => (
                          <Badge key={hIndex} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
