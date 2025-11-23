import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Senior Software Architect",
      company: "Tech Innovations Ltd",
      content:
        "Samrudh demonstrated exceptional problem-solving skills and a deep understanding of full-stack development. His ability to tackle complex algorithmic challenges while maintaining clean, scalable code is impressive. A true asset to any engineering team.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      company: "Digital Solutions Inc",
      content:
        "Working with Samrudh on the FarmIntellect project was outstanding. He brought innovative ideas to the table and executed them flawlessly. His expertise in AI/ML integration and user-centric design made a significant impact on our product's success.",
      rating: 5,
    },
    {
      name: "Prof. Anand Verma",
      role: "Computer Science Department",
      company: "University of Technology",
      content:
        "As a competitive programmer and student, Samrudh shows remarkable dedication to continuous learning. His contributions to open-source projects and consistent performance in coding competitions reflect his passion for technology and engineering excellence.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-primary text-primary-foreground">
              TESTIMONIALS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              What People <span className="text-primary">Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Feedback from colleagues, mentors, and collaborators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 space-y-4 hover:shadow-xl transition-all">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
