import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const Hero = () => {
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
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                className="inline-block px-4 py-2 rounded-full glass-panel border border-primary/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-heading text-primary">
                  CS ENGINEERING · AI SPECIALIST
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight">
                <motion.span
                  className="block text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  SAMRUDH DWIVEDULA
                </motion.span>
                <motion.span
                  className="block text-2xl md:text-3xl lg:text-4xl font-light mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span className="text-primary">AI</span> ×{" "}
                  <span className="text-secondary">Data</span> ×{" "}
                  <span className="text-accent">Security</span> Innovator
                </motion.span>
              </h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                Passionate about building intelligent secure systems through the intersection
                of Artificial Intelligence, Data Science, and Network Security. Focused on
                ethical AI and innovative solutions for real-world challenges.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group relative overflow-hidden glow-box"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 hover:bg-primary/10"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="border-secondary/50 hover:bg-secondary/10">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <motion.a
                href="https://github.com/Samrudh2006"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass-panel hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="p-3 rounded-lg glass-panel hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:samrudhdwivedula12@gmail.com"
                className="p-3 rounded-lg glass-panel hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-secondary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />

              {/* Profile Image Container */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/50 glow-box">
                  <img
                    src="/avatar.png"
                    alt="Samrudh Dwivedula - AI × Data × Security Innovator"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -top-4 -right-4 px-4 py-2 glass-panel rounded-full border border-primary/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm font-heading text-primary">HP 100</span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 px-4 py-2 glass-panel rounded-full border border-secondary/50"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <span className="text-sm font-heading text-secondary">XP 999</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
