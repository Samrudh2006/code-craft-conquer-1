import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Database, Shield, Trophy } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Code2, value: "384+", label: "Problems Solved" },
    { icon: Database, value: "6", label: "Technologies Mastered" },
    { icon: Trophy, value: "11+", label: "Open Source Contributions" },
    { icon: Shield, value: "4", label: "Major Projects" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading">
              About <span className="text-primary glow-text">Me</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Building the future of intelligent systems through cutting-edge research and development
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="glass-panel p-6 text-center hover:glow-box transition-all duration-300 group cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:text-secondary transition-colors" />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-heading text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <Card className="glass-panel p-8 md:p-12 space-y-6">
              <h3 className="text-2xl md:text-3xl font-heading text-primary">
                Passion for Innovation
              </h3>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I'm a passionate Computer Science & Engineering student specializing in the
                  intersection of <span className="text-primary font-semibold">Artificial Intelligence</span>,{" "}
                  <span className="text-secondary font-semibold">Data Science</span>, and{" "}
                  <span className="text-accent font-semibold">Network Security</span>.
                </p>
                <p>
                  My journey involves creating intelligent systems that not only solve complex problems
                  but also prioritize security and ethical considerations. I believe in the power of
                  AI to transform industries while maintaining robust security frameworks.
                </p>
                <p>
                  Currently pursuing advanced studies while actively contributing to open-source projects
                  and participating in competitive programming. I'm driven by curiosity and the desire
                  to build technology that makes a meaningful impact.
                </p>
              </div>

              <motion.div
                className="pt-6 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <h4 className="text-xl font-heading text-secondary mb-4">Research Interests</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Machine Learning",
                    "Deep Learning",
                    "Computer Vision",
                    "NLP",
                    "Cybersecurity",
                    "Network Analysis",
                    "Ethical AI",
                    "Data Analytics",
                  ].map((interest, index) => (
                    <motion.span
                      key={interest}
                      className="px-4 py-2 glass-panel rounded-full text-sm hover:bg-primary/10 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.9 + index * 0.05 }}
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
