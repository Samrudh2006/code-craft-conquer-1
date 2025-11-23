import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hi! I'm Samrudh's AI assistant. Ask me about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState("");

  const quickResponses: Record<string, string> = {
    skills: "Samrudh specializes in AI/ML (TensorFlow, PyTorch), Security Tools (Kali Linux, Wireshark), Cloud (AWS, GCP), and full-stack development with Python, C++, Java, React, and Node.js.",
    projects: "Key projects include FarmIntellect (agricultural AI platform), CureCoders (coding learning platform), VerityGuard (security tool), and a Competitive Programming Tracker.",
    experience: "Samrudh is a Computer Science & Engineering student focused on AI, Data Science, and Network Security. He's completed certifications from NPTEL and IIT Mandi, and participated in multiple hackathons.",
    contact: "You can reach Samrudh at samrudhdwivedula1@gmail.com, connect on LinkedIn at linkedin.com/in/samrudhdwivedula, or view his code on GitHub at github.com/Samrudh2006",
    education: "Samrudh is currently pursuing Computer Science & Engineering with a specialization in Artificial Intelligence, Data Science, and Network Security.",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    let response = "I can help you learn about Samrudh's skills, projects, experience, education, or contact information. What would you like to know?";

    for (const [key, value] of Object.entries(quickResponses)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 500);

    setInput("");
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:shadow-xl"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="glass-panel overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-background/20 flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
                    <p className="text-xs text-primary-foreground/80">Ask me anything!</p>
                  </div>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about skills, projects..."
                    className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={handleSend} size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
