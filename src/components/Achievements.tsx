import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const Achievements = () => {
  const platforms = [
    {
      name: "HackerRank",
      achievement: "Problem Solving (Intermediate)",
      url: "https://www.hackerrank.com/profile/samrudhdwivedul1",
    },
    {
      name: "LeetCode",
      achievement: "Active Problem Solver",
      url: "https://leetcode.com/u/samrudh2006/",
    },
    {
      name: "CodeChef",
      achievement: "Regular Participant",
      url: "https://www.codechef.com/users/samrudh123",
    },
    {
      name: "GeeksforGeeks",
      achievement: "Active Contributor",
      url: "https://www.geeksforgeeks.org/user/samrudhdwi8ff0/",
    },
    {
      name: "Codeforces",
      achievement: "Competitive Programmer",
      url: "https://codeforces.com/profile/samrudh2314",
    },
    {
      name: "GitHub",
      achievement: "Open Source Contributions",
      url: "https://github.com/Samrudh2006",
    },
  ];

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              ACHIEVEMENTS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Coding <span className="text-primary">Achievements</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all group cursor-pointer"
              >
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-2 block"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-foreground">{platform.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-muted-foreground">{platform.achievement}</p>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
