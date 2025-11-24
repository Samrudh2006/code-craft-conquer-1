import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";
import NotFound from "./NotFound";
import SocialShare from "@/components/SocialShare";

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                        <Link to="/#blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Articles
                        </Link>
                    </Button>

                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 items-center justify-between">
                            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                    {post.category}
                                </Badge>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                            <SocialShare
                                title={post.title}
                                url={`${window.location.origin}/blog/${post.slug}`}
                            />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-9xl">
                        {post.image}
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <div className="pt-8 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-sm py-1 px-3">
                                    <Tag className="mr-2 h-3 w-3" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPost;
