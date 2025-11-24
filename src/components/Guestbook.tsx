import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, Calendar, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface GuestbookEntry {
    id: string;
    name: string;
    message: string;
    timestamp: number;
}

const Guestbook = () => {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    // Load entries from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("guestbook-entries");
        if (stored) {
            try {
                setEntries(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse guestbook entries:", e);
            }
        }
    }, []);

    // Save entries to localStorage whenever they change
    useEffect(() => {
        if (entries.length > 0) {
            localStorage.setItem("guestbook-entries", JSON.stringify(entries));
        }
    }, [entries]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) {
            toast.error("Please fill in both name and message");
            return;
        }

        const newEntry: GuestbookEntry = {
            id: Date.now().toString(),
            name: name.trim(),
            message: message.trim(),
            timestamp: Date.now(),
        };

        setEntries([newEntry, ...entries]);
        setName("");
        setMessage("");
        toast.success("Message added to guestbook!");
    };

    const handleDelete = (id: string) => {
        setEntries(entries.filter(entry => entry.id !== id));
        toast.success("Message removed");
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section id="guestbook" className="py-20 relative overflow-hidden bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
                            VISITOR MESSAGES
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            <span className="text-primary glow-text">Guestbook</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Leave a message and be part of my journey!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Sign Guestbook Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 glass-panel hover:shadow-2xl transition-all">
                                <div className="flex items-center gap-2 mb-6">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    <h3 className="text-xl font-semibold font-heading">Sign the Guestbook</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium mb-2 block">
                                            Your Name
                                        </label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-background/50"
                                            maxLength={50}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="text-sm font-medium mb-2 block">
                                            Your Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            placeholder="Leave a message, feedback, or just say hi!"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="bg-background/50 min-h-[120px]"
                                            maxLength={500}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {message.length}/500 characters
                                        </p>
                                    </div>
                                    <Button type="submit" className="w-full group">
                                        <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                        Sign Guestbook
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>

                        {/* Guestbook Entries */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 glass-panel hover:shadow-2xl transition-all h-[500px] overflow-hidden flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-secondary" />
                                        <h3 className="text-xl font-semibold font-heading">Recent Messages</h3>
                                    </div>
                                    <Badge variant="secondary">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</Badge>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                    <AnimatePresence mode="popLayout">
                                        {entries.length === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-12 text-muted-foreground"
                                            >
                                                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                                <p>No messages yet. Be the first to sign!</p>
                                            </motion.div>
                                        ) : (
                                            entries.map((entry) => (
                                                <motion.div
                                                    key={entry.id}
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    layout
                                                    className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors group"
                                                >
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                                                                {entry.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-sm">{entry.name}</p>
                                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                    <Calendar className="h-3 w-3" />
                                                                    {formatDate(entry.timestamp)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                                            onClick={() => handleDelete(entry.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm text-foreground/90 leading-relaxed">
                                                        {entry.message}
                                                    </p>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Guestbook;
