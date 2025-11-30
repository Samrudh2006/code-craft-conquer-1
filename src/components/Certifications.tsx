import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";

const Certifications = () => {
    const certifications = [
        {
            name: "Data Analysis with Python",
            provider: "IBM",
            year: "2025",
            achievement: "Issued Oct 2025",
            topics: ["pandas", "numpy", "data analysis"],
            link: "#",
            id: "IEG0R25DHBFO"
        },
        {
            name: "Prompt Engineering for ChatGPT",
            provider: "Vanderbilt University",
            year: "2025",
            achievement: "Issued Sep 2025",
            topics: ["Prompt Engineering", "LLMs", "ChatGPT"],
            link: "#",
            id: "QS3V3H5X6533"
        },
        {
            name: "Agile Software Engineering",
            provider: "Aditya University",
            year: "2025",
            achievement: "Issued Aug 2025",
            topics: ["Agile", "Scrum", "Software Development"],
            link: "#",
            id: "44F4AWA2S8HK"
        },
        {
            name: "Database Management Systems",
            provider: "Aditya University",
            year: "2025",
            achievement: "Issued Aug 2025",
            topics: ["SQL", "PL/SQL", "Database Design"],
            link: "#",
            id: "W28449DV2ZP4"
        },
        {
            name: "Cisco Python Essentials",
            provider: "Cisco",
            year: "2024",
            achievement: "Completed",
            topics: ["Python", "Foundations"],
            link: "#"
        },
        {
            name: "Analytics Essentials",
            provider: "(Provider)",
            year: "2024",
            achievement: "Completed",
            topics: ["Analytics", "Data Insights"],
            link: "#"
        },
        {
            name: "Oracle Data & AI Foundations",
            provider: "Oracle",
            year: "2024",
            achievement: "Completed",
            topics: ["Data Foundations", "AI Basics"],
            link: "#"
        },
        {
            name: "Power BI Certified",
            provider: "(Provider)",
            year: "2024",
            achievement: "Certified",
            topics: ["Power BI", "Data Visualization"],
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
                                            title={`Open ${cert.name} certificate`}
                                            aria-label={`Open ${cert.name} certificate`}
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
