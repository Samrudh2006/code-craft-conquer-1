import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, Code2, TrendingUp } from "lucide-react";

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  languages: { [key: string]: number };
}

const GitHubStats = () => {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const username = "Samrudh2006";

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch repos
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposResponse.json();

        // Calculate stars and forks
        const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const totalForks = repos.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

        // Calculate language breakdown
        const languages: { [key: string]: number } = {};
        repos.forEach((repo: any) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        setGithubData({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          total_stars: totalStars,
          total_forks: totalForks,
          languages,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const stats = [
    {
      icon: Code2,
      label: "Public Repos",
      value: githubData?.public_repos || 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: githubData?.total_stars || 0,
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: githubData?.total_forks || 0,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      label: "Followers",
      value: githubData?.followers || 0,
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Get top languages
  const topLanguages = githubData?.languages
    ? Object.entries(githubData.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
    : [];

  const totalLanguageCount = topLanguages.reduce((acc, [, count]) => acc + count, 0);

  const languageColors: { [key: string]: string } = {
    Python: "from-blue-500 to-blue-600",
    JavaScript: "from-yellow-400 to-yellow-500",
    TypeScript: "from-blue-600 to-blue-700",
    "Jupyter Notebook": "from-orange-500 to-orange-600",
    HTML: "from-red-500 to-red-600",
    CSS: "from-blue-500 to-purple-500",
    Java: "from-red-600 to-orange-500",
    "C++": "from-pink-500 to-purple-600",
  };

  return (
    <section id="github-stats" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
              GITHUB ANALYTICS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Development <span className="text-primary glow-text">Activity</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Live statistics from my GitHub profile showcasing contributions and coding activity
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <motion.div
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Github className="h-12 w-12 text-primary" />
              </motion.div>
              <p className="mt-4 text-muted-foreground">Loading GitHub stats...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <Card className="p-6 glass-panel hover:shadow-2xl transition-all group relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                        
                        <div className="relative z-10 space-y-4">
                          <motion.div
                            className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} w-fit`}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </motion.div>
                          
                          <div>
                            <motion.div
                              className="text-3xl font-bold text-foreground"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                            >
                              {stat.value}
                            </motion.div>
                            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Language Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-8 glass-panel">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold font-heading">Language Breakdown</h3>
                  </div>

                  <div className="space-y-4">
                    {topLanguages.map(([language, count], index) => {
                      const percentage = ((count / totalLanguageCount) * 100).toFixed(1);
                      const gradientColor = languageColors[language] || "from-gray-500 to-gray-600";

                      return (
                        <motion.div
                          key={language}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradientColor}`} />
                              <span className="text-sm font-medium text-foreground">{language}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{count} repos</span>
                              <span className="text-sm font-semibold text-foreground">{percentage}%</span>
                            </div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${gradientColor} rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* GitHub Contribution Graph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-8 glass-panel">
                  <div className="flex items-center gap-3 mb-6">
                    <Github className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold font-heading">Contribution Graph</h3>
                  </div>

                  <div className="space-y-4">
                    <img
                      src={`https://ghchart.rshah.org/4f46e5/${username}`}
                      alt="GitHub Contribution Graph"
                      className="w-full rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      Last 12 months of contributions
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* GitHub Profile Link */}
              <div className="text-center">
                <motion.a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-panel hover:shadow-xl transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
                  <span className="font-medium">View Full GitHub Profile</span>
                </motion.a>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
