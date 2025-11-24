import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react";

const Internships = () => {
    const internships = [
        {
            role: "Cybersecurity Intern",
            company: "SecureNet Inc.",
            location: "Remote",
            duration: "May - July 2024",
            achievements: [
                "Automated network audit tools using Python",
                "Improved incident response time by 20%",
                "Implemented security monitoring dashboards"
            ],
            skills: ["Python", "Network Security", "SIEM", "Penetration Testing"]
        },
        {
            role: "AI/ML Research Intern",
            company: "TechVision Labs",
            location: "Bangalore, India",
            duration: "Jan - Apr 2024",
            achievements: [
                "Developed ML models for predictive analytics",
                "Achieved 92% accuracy on classification tasks",
                "Published research paper on neural networks"
            ],
            skills: ["TensorFlow", "PyTorch", "Data Analysis", "Research"]
        }
    ];

    return (
        <section id="internships" className="py-20 relative overflow-hidden bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
                            WORK EXPERIENCE
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Internships
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Professional experience and key achievements
                        </p>
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {internships.map((internship, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 glass-panel hover:shadow-2xl transition-all hover-lift">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-secondary/10">
                                                <Briefcase className="h-5 w-5 text-secondary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-xl">{internship.role}</h3>
                                                <p className="text-lg text-primary">{internship.company}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{internship.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span>{internship.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        {internship.achievements.map((achievement, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <TrendingUp className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                                <p className="text-sm text-foreground/90">{achievement}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {internship.skills.map((skill, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {skill}
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

export default Internships;
