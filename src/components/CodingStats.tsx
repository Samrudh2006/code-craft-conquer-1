import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Code, Terminal, Zap, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { wakaTimeService } from "@/services/wakatime";

const CodingStats = () => {
    const [activityData, setActivityData] = useState<Array<{ day: string; hours: number }>>([]);
    const [languageData, setLanguageData] = useState<Array<{ name: string; value: number; color: string }>>([]);
    const [totalHours, setTotalHours] = useState<string>("0.0");
    const [isLoading, setIsLoading] = useState(true);

    // Fallback mock data
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
        Vue: "#4FC08D",
        HTML: "#E34F26",
        CSS: "#1572B6",
        Go: "#00ADD8",
        Rust: "#000000",
        PHP: "#777BB4",
        Ruby: "#CC342D",
        Swift: "#FA7343",
        Kotlin: "#7F52FF",
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // Fetch weekly activity
            const weeklyActivity = await wakaTimeService.getWeeklyActivity();

            // Fetch stats for language distribution
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
        <section id="stats" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
                            LIVE ACTIVITY
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Coding <span className="text-primary glow-text">Stats</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Real-time metrics tracking my development journey and coding habits
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Weekly Activity Chart */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-6 h-full glass-panel hover:shadow-2xl transition-all">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <Terminal className="h-5 w-5 text-primary" />
                                            <h3 className="text-xl font-semibold font-heading">Weekly Activity</h3>
                                        </div>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                                            <Zap className="h-3 w-3 mr-1 fill-current" />
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
                                                <XAxis
                                                    dataKey="day"
                                                    stroke="hsl(var(--muted-foreground))"
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <YAxis
                                                    stroke="hsl(var(--muted-foreground))"
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickFormatter={(value) => `${value}h`}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "hsl(var(--background))",
                                                        borderColor: "hsl(var(--border))",
                                                        borderRadius: "8px"
                                                    }}
                                                    itemStyle={{ color: "hsl(var(--foreground))" }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="hours"
                                                    stroke="hsl(var(--primary))"
                                                    strokeWidth={2}
                                                    fillOpacity={1}
                                                    fill="url(#colorHours)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Language Distribution */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-6 h-full glass-panel hover:shadow-2xl transition-all">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <Code className="h-5 w-5 text-secondary" />
                                            <h3 className="text-xl font-semibold font-heading">Top Languages</h3>
                                        </div>
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
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: "hsl(var(--background))",
                                                            borderColor: "hsl(var(--border))",
                                                            borderRadius: "8px"
                                                        }}
                                                        itemStyle={{ color: "hsl(var(--foreground))" }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="space-y-4">
                                            {languageData.map((lang, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: lang.color }}
                                                        />
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
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default CodingStats;
