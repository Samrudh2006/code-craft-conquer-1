import { motion } from "framer-motion";
import { Code2, Database, Layout, Server, Terminal, Smartphone, Globe, Cpu } from "lucide-react";

const skills = [
    {
        category: "Frontend",
        icon: <Layout className="w-6 h-6 text-blue-400" />,
        items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "Framer Motion"],
    },
    {
        category: "Backend",
        icon: <Server className="w-6 h-6 text-green-400" />,
        items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "Firebase"],
    },
    {
        category: "Tools & DevOps",
        icon: <Terminal className="w-6 h-6 text-purple-400" />,
        items: ["Git", "Docker", "AWS", "Linux", "CI/CD", "Vercel"],
    },
    {
        category: "Other",
        icon: <Cpu className="w-6 h-6 text-orange-400" />,
        items: ["System Design", "API Design", "Agile", "Testing", "Performance Optimization"],
    },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Technical Skills
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise and the technologies I work with.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-background/50 group-hover:bg-background transition-colors">
                                    {skill.icon}
                                </div>
                                <h3 className="font-semibold text-lg">{skill.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
