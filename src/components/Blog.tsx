import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {

=======

const Blog = () => {
  const articles = [
    {
      title: "Building Intelligent Agricultural Systems with Machine Learning",
      excerpt: "Exploring how AI and ML can revolutionize farming practices through predictive analytics, crop recommendations, and yield optimization for sustainable agriculture.",
      date: "2024-03-15",
      readTime: "8 min read",
      category: "AI/ML",
      image: "🌾",
      tags: ["Machine Learning", "Agriculture", "TensorFlow", "Python"],
    },
    {
      title: "Advanced Network Security: Penetration Testing Best Practices",
      excerpt: "A comprehensive guide to ethical hacking, vulnerability assessment, and penetration testing methodologies for securing enterprise networks.",
      date: "2024-03-10",
      readTime: "12 min read",
      category: "Security",
      image: "🛡️",
      tags: ["Cybersecurity", "Penetration Testing", "Kali Linux", "Network Security"],
    },
    {
      title: "Full-Stack Development with Next.js and TypeScript",
      excerpt: "Learn how to build scalable, type-safe web applications using Next.js 14, React Server Components, and modern development practices.",
      date: "2024-03-05",
      readTime: "10 min read",
      category: "Web Development",
      image: "💻",
      tags: ["Next.js", "TypeScript", "React", "Full-Stack"],
    },
    {
      title: "Data Visualization Techniques for Competitive Programming Analytics",
      excerpt: "Techniques and tools for creating insightful visualizations of coding performance metrics, progress tracking, and skill development over time.",
      date: "2024-02-28",
      readTime: "6 min read",
      category: "Data Science",
      image: "📊",
      tags: ["Data Visualization", "Python", "Pandas", "Streamlit"],
    },
    {
      title: "Deep Learning with PyTorch: From Theory to Production",
      excerpt: "A practical guide to building, training, and deploying deep learning models using PyTorch, covering neural networks, CNNs, and transfer learning.",
      date: "2024-02-20",
      readTime: "15 min read",
      category: "AI/ML",
      image: "🧠",
      tags: ["Deep Learning", "PyTorch", "Neural Networks", "AI"],
    },
    {
      title: "Cloud Architecture Patterns for Scalable Applications",
      excerpt: "Exploring modern cloud architecture patterns, microservices design, and best practices for building resilient applications on AWS and GCP.",
      date: "2024-02-15",
      readTime: "9 min read",
      category: "Cloud",
      image: "☁️",
      tags: ["Cloud Computing", "AWS", "Microservices", "DevOps"],
    },
  ];
>>>>>>> c0dd471edb195a443114de073c51d45fe1219e68

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "AI/ML": "from-purple-500 to-pink-500",
      "Security": "from-red-500 to-orange-500",
      "Web Development": "from-blue-500 to-cyan-500",
      "Data Science": "from-green-500 to-emerald-500",
      "Cloud": "from-yellow-500 to-amber-500",
    };
    return colors[category] || "from-gray-500 to-gray-700";
  };

  return (
    <section id="blog" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30 pointer-events-none" />
<<<<<<< HEAD

=======
      
>>>>>>> c0dd471edb195a443114de073c51d45fe1219e68
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
              BLOG & ARTICLES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Technical <span className="text-primary glow-text">Writings</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing insights, tutorials, and case studies on AI, Security, and Full-Stack Development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
<<<<<<< HEAD
            {blogPosts.map((article, index) => (
=======
            {articles.map((article, index) => (
>>>>>>> c0dd471edb195a443114de073c51d45fe1219e68
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full glass-panel hover:shadow-2xl transition-all group overflow-hidden">
                  <div className="relative">
                    <div className={`h-48 bg-gradient-to-br ${getCategoryColor(article.category)} flex items-center justify-center text-8xl`}>
                      {article.image}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

<<<<<<< HEAD
                    <Button
                      variant="ghost"
                      className="w-full group/btn justify-between"
                      asChild
                    >
                      <Link to={`/blog/${article.slug}`}>
=======
                    <Button 
                      variant="ghost" 
                      className="w-full group/btn justify-between"
                      asChild
                    >
                      <a href="#blog">
>>>>>>> c0dd471edb195a443114de073c51d45fe1219e68
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Read Article
                        </span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
<<<<<<< HEAD
                      </Link>
=======
                      </a>
>>>>>>> c0dd471edb195a443114de073c51d45fe1219e68
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <a href="#blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
