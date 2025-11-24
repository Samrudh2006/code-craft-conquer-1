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
                const parallaxX = (mousePosition.x - 50) * (particle.z / 100) * 0.5;
                const parallaxY = (mousePosition.y - 50) * (particle.z / 100) * 0.5;

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
                        }}
                        animate={{
                            x: [
                                parallaxX,
                                parallaxX + Math.sin(particle.id) * 50,
                                parallaxX,
                            ],
                            y: [
                                parallaxY,
                                parallaxY + Math.cos(particle.id) * 50,
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

            {/* Floating geometric shapes */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`shape-${i}`}
                    className="absolute"
                    style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 10}%`,
                        width: 100,
                        height: 100,
                    }}
                    animate={{
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                        rotateZ: [0, 180],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <div
                        className="w-full h-full border-2 opacity-10"
                        style={{
                            borderColor: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                            transform: "perspective(1000px) rotateX(45deg) rotateY(45deg)",
                        }}
                    />
                </motion.div>
            ))}

            {/* Gradient orbs */}
            <motion.div
                className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
                style={{
                    background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
                    left: "10%",
                    top: "20%",
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
                style={{
                    background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
                    right: "10%",
                    bottom: "20%",
                }}
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};
