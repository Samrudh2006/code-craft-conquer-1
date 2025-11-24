import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";

const Certifications = () => {
    const certifications = [
        {
            name: "Data Structures & Algorithms",
            provider: "NPTEL - IIT Madras",
            year: "2024",
            achievement: "Top 1%",
            topics: ["DSA", "Problem Solving", "Optimization"],
            link: "#"
        },
        {
            name: "Machine Learning Specialization",
            provider: "Coursera - Stanford University",
            year: "2024",
            achievement: "Elite",
            topics: ["ML", "Neural Networks", "Deep Learning"],
            link: "#"
        },
        {
            name: "Generative AI with Google Cloud",
            provider: "Google Cloud",
            year: "2025",
            achievement: "Certified",
            topics: ["GenAI", "LLMs", "Prompt Engineering"],
            link: "#"
        },
        {
            name: "Cybersecurity Fundamentals",
            provider: "IBM",
            year: "2024",
            achievement: "Professional",
            topics: ["Network Security", "Cryptography", "Ethical Hacking"],
            link: "#"
        }
    ];

    return (
        <section id="certifications" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
                            CREDENTIALS
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Certifications
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Professional certifications and achievements
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 glass-panel hover:shadow-2xl transition-all group hover-lift">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <Award className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{cert.name}</h3>
                                                <p className="text-sm text-muted-foreground">{cert.provider}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={cert.link}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="h-4 w-4 text-primary" />
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{cert.year}</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                                            {cert.achievement}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {cert.topics.map((topic, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {topic}
                                            </Badge>
                                        ))}
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

export default Certifications;
