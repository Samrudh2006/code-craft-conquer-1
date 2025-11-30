import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useMemo } from "react";

const palettes = [
  {
    name: "Oceanic Teal",
    vars: [
      "hsl(var(--background))",
      "hsl(var(--primary))",
      "hsl(var(--glow-cyan))",
      "hsl(var(--secondary))",
    ],
    desc: "Vibrant cyan/teal highlights on a deep background — great for tech portfolios.",
  },
  {
    name: "Violet Night",
    vars: ["hsl(var(--background))", "hsl(var(--accent))", "hsl(var(--glow-violet))", "hsl(var(--primary))"],
    desc: "Purple-accented palette for a modern, creative look.",
  },
  {
    name: "Clean Light",
    vars: ["hsl(var(--light-background))", "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"],
    desc: "High-contrast light theme ideal for printed resumes and formal audiences.",
  },
];

const skills = [
  "Python",
  "pandas",
  "NumPy",
  "SQL",
  "React",
  "TypeScript",
  "Machine Learning",
  "Data Visualization",
];

const ContactExtras = () => {
  const paletteItems = useMemo(() => palettes, []);

  return (
    <section id="contact-extras" className="mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Enhance & Customize</h3>
            <p className="text-muted-foreground">Color palettes, quick skills and small UI extras to make your portfolio shine.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div>
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Quick Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">Add or remove skills in <code>src/components/ContactExtras.tsx</code>.</p>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Suggested Color Palettes</h4>
                <div className="flex flex-col gap-4">
                  {paletteItems.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {p.vars.map((v, vi) => {
                          // Use Tailwind arbitrary value classes for backgrounds to avoid inline styles
                          const cls = `w-12 h-12 rounded-md border border-white/5 bg-[${v}]`;
                          return <div key={vi} className={cls} />;
                        })}
                      </div>
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">To apply a palette project-wide, update the CSS variables in <code>src/index.css</code>.</p>
              </Card>
            </div>
          </div>

          <div>
            <Card className="p-6">
              <h4 className="font-semibold mb-3">Design Notes</h4>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                <li>Use a primary accent for call-to-action buttons (e.g., cyan/teal).</li>
                <li>Limit accent hues to 1-2 colors for consistency.</li>
                <li>Ensure text contrast meets WCAG for accessibility.</li>
                <li>Keep micro-interactions subtle and consistent across components.</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactExtras;
