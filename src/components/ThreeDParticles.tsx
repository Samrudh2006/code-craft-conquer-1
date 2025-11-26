import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    z: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
}

export const ThreeDParticles = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Generate 3D-like particles
        const newParticles: Particle[] = [];
        const colors = [
            "hsl(var(--primary))",
            "hsl(var(--secondary))",
            "hsl(var(--accent))",
        ];

        for (let i = 0; i < 50; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                z: Math.random() * 100, // Depth
                size: Math.random() * 4 + 1,
                duration: Math.random() * 20 + 10,
                delay: Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => {
                // Calculate scale based on z-depth (closer = larger)
                const scale = 0.5 + (particle.z / 100) * 1.5;
                const opacity = 0.2 + (particle.z / 100) * 0.6;

                // Parallax effect based on mouse position
                const parallaxX = (mousePosition.x - 50) * (particle.z / 100) * 0.8;
                const parallaxY = (mousePosition.y - 50) * (particle.z / 100) * 0.8;

                return (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            opacity: opacity,
                            filter: `blur(${(1 - particle.z / 100) * 2}px)`,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                        }}
                        animate={{
                            x: [
                                parallaxX,
                                parallaxX + Math.sin(particle.id) * 30,
                                parallaxX,
                            ],
                            y: [
                                parallaxY,
                                parallaxY + Math.cos(particle.id) * 30,
                                parallaxY,
                            ],
                            scale: [scale, scale * 1.2, scale],
                            opacity: [opacity * 0.5, opacity, opacity * 0.5],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}

            {/* Floating Geometric Shapes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`shape-${i}`}
                    className="absolute opacity-20"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        width: 60 + (i % 3) * 20,
                        height: 60 + (i % 3) * 20,
                        perspective: "1000px",
                    }}
                    animate={{
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 25 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <div
                        className="w-full h-full border border-primary/30 relative preserve-3d"
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Cube faces simulation */}
                        <div className="absolute inset-0 border border-primary/30 translate-z-10" style={{ transform: "translateZ(30px)" }} />
                        <div className="absolute inset-0 border border-secondary/30 -translate-z-10" style={{ transform: "translateZ(-30px)" }} />
                        <div className="absolute inset-0 border border-accent/30 rotate-y-90" style={{ transform: "rotateY(90deg)" }} />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
