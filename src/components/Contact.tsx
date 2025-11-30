import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, Send, FileText, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name cannot be empty" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message cannot be empty" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      contactSchema.parse(formData);
      setErrors({});

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        'service_bf4baay',
        'template_d7j9d9k',
        templateParams,
        'dfbyum6uGBhzV6LsT'
      );

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errorMap[err.path[0].toString()] = err.message;
          }
        });
        setErrors(errorMap);
        toast.error("Please fix the errors in the form");
      } else {
        toast.error("Failed to send message. Please try again or email me directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Primary CTA buttons (left column) - keep minimal and prominent
  const connectLinks = [
    { icon: Mail, label: "Email", href: "mailto:samrudhdwivedula1@gmail.com", color: "from-red-500 to-orange-500" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/samrudhdwivedula", color: "from-blue-500 to-cyan-500" },
    { icon: Github, label: "GitHub", href: "https://github.com/Samrudh2006", color: "from-purple-500 to-pink-500" },
  ];

  // Right column: consolidated, non-redundant quick action cards
  const rightCards = [
    { icon: Mail, title: "Email", subtitle: "samrudhdwivedula1@gmail.com", href: "mailto:samrudhdwivedula1@gmail.com" },
    { icon: FileText, title: "Resume", subtitle: "Download CV (PDF)", href: "/resume.pdf" },
    { icon: Calendar, title: "Schedule", subtitle: "Book a 15-min call", href: "https://calendly.com/your-link" },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-badge text-badge-foreground border-border">
              CONTACT
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold hero-title">
              Let's <span className="gradient-accent">Connect & Collaborate</span>
            </h2>
            <p className="lead max-w-3xl mx-auto">
              I respond to all messages within 24 hours. Use the form for detailed messages or quick links to email,
              view my resume, or book a short call. Looking for internships, remote roles, or collaborations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Connect Buttons */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Connect</h3>
                {connectLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Button
                        variant="outline"
                        className={`w-full justify-start gap-3 h-14 text-lg group relative overflow-hidden`}
                        asChild
                      >
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                          <motion.div
                            className="relative z-10"
                            animate={{
                              boxShadow: [
                                "0 0 0px hsl(var(--primary))",
                                "0 0 20px hsl(var(--primary) / 0.5)",
                                "0 0 0px hsl(var(--primary))",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Icon className="h-5 w-5" />
                          </motion.div>
                          <span className="relative z-10">{link.label}</span>
                        </a>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Contact Form */}
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full group" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">You'll receive a response within 24 hours. If urgent, email me directly.</p>
                </form>
              </Card>
            </div>

            {/* Right Column - Quick Action Cards */}
            <div className="space-y-4">
              {rightCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                  >
                    <Card className="p-6 hover:shadow-xl transition-all group">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-3 bg-primary/10 rounded-lg"
                          whileHover={{ scale: 1.05, rotate: 3 }}
                        >
                          <Icon className="h-6 w-6 text-primary group-hover:animate-glow" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                          <a
                            href={card.href}
                            className="text-base font-medium hover:text-primary transition-colors truncate block"
                            target={card.href.startsWith("http") ? "_blank" : "_self"}
                            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {card.subtitle}
                          </a>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Location Map placed inline in the right column for better visual balance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="text-base font-medium mb-3">India — Open to remote opportunities and internships.</p>
                      <div className="w-full h-48 rounded-md overflow-hidden">
                        <iframe
                          title="location-map"
                          src="https://www.openstreetmap.org/export/embed.html?bbox=68.0%2C6.5%2C97.4%2C35.5&layer=mapnik"
                          className="w-full h-full border-0"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Map / Location moved into the right column (was previously below the grid) */}

          {/* Extras removed as requested */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
