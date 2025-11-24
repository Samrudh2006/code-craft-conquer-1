import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GitFork, Star, Code, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";
import { wakaTimeService } from "@/services/wakatime";

const DeveloperActivity = () => {
    // WakaTime state
    const [activityData, setActivityData] = useState<Array<{ day: string; hours: number }>>([]);
    const [languageData, setLanguageData] = useState<Array<{ name: string; value: number; color: string }>>([]);
    const [totalHours, setTotalHours] = useState<string>("0.0");
    const [isLoading, setIsLoading] = useState(true);

    // GitHub stats (static for now)
    const githubStats = {
        totalRepos: 42,
        totalStars: 156,
        totalForks: 28,
        contributions: 847
    };

    const mockActivityData = [
        { day: "Mon", hours: 4.5 },
        { day: "Tue", hours: 6.2 },
        { day: "Wed", hours: 5.8 },
        { day: "Thu", hours: 7.5 },
        { day: "Fri", hours: 5.0 },
        { day: "Sat", hours: 3.2 },
        { day: "Sun", hours: 2.5 },
    ];

    const mockLanguageData = [
        { name: "TypeScript", value: 45, color: "#3178C6" },
        { name: "Python", value: 30, color: "#3776AB" },
        { name: "React", value: 15, color: "#61DAFB" },
        { name: "Other", value: 10, color: "#6e7681" },
    ];

    const languageColors: { [key: string]: string } = {
        TypeScript: "#3178C6",
        JavaScript: "#F7DF1E",
        Python: "#3776AB",
        Java: "#007396",
        "C++": "#00599C",
        C: "#A8B9CC",
        React: "#61DAFB",
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const weeklyActivity = await wakaTimeService.getWeeklyActivity();
            const stats = await wakaTimeService.getStats('last_7_days');

            if (weeklyActivity && weeklyActivity.length > 0) {
                setActivityData(weeklyActivity);
                const total = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
                setTotalHours(total.toFixed(1));
            } else {
                setActivityData(mockActivityData);
                setTotalHours("34.7");
            }

            if (stats?.data?.languages && stats.data.languages.length > 0) {
                const languages = stats.data.languages
                    .slice(0, 4)
                    .map((lang) => ({
                        name: lang.name,
                        value: parseFloat(lang.percent.toFixed(1)),
                        color: languageColors[lang.name] || "#6e7681",
                    }));
                setLanguageData(languages);
            } else {
                setLanguageData(mockLanguageData);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <section id="developer-activity" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
                            DEVELOPER METRICS
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Developer <span className="text-primary glow-text">Activity</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Real-time coding stats and GitHub contributions
                        </p>
                    </div>

                    {/* GitHub Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { label: "Repositories", value: githubStats.totalRepos, icon: Code, color: "from-blue-500 to-cyan-500" },
                            { label: "Stars Earned", value: githubStats.totalStars, icon: Star, color: "from-yellow-500 to-orange-500" },
                            { label: "Forks", value: githubStats.totalForks, icon: GitFork, color: "from-green-500 to-emerald-500" },
                            { label: "Contributions", value: githubStats.contributions, icon: Activity, color: "from-purple-500 to-pink-500" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-4 glass-panel hover:shadow-xl transition-all hover-lift text-center">
                                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 mb-2`}>
                                        <stat.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Coding Activity Charts */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Weekly Activity */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 h-full glass-panel hover:shadow-2xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold font-heading">Weekly Coding Time</h3>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                                        {totalHours} hrs
                                    </Badge>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={activityData}>
                                            <defs>
                                                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.2} />
                                            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" fill="url(#colorHours)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Top Languages */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 h-full glass-panel hover:shadow-2xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold font-heading">Top Languages</h3>
                                    <span className="text-sm text-muted-foreground">Last 7 Days</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8 items-center h-[300px]">
                                    <div className="h-full w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={languageData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {languageData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-4">
                                        {languageData.map((lang, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                                                    <span className="font-medium">{lang.name}</span>
                                                </div>
                                                <span className="text-muted-foreground">{lang.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DeveloperActivity;
