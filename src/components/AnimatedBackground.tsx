import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Animated Gradient Mesh */}
            <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                    background: `
                        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15), transparent 40%), 
                        radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, hsl(var(--secondary) / 0.15), transparent 40%),
                        radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.05), transparent 60%)
                    `,
                }}
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Floating Particles/Stars */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Animated Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                <defs>
                    <pattern
                        id="grid"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 60 0 L 0 0 0 60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Glowing Orbs */}
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
                    style={{
                        background: i === 0
                            ? "radial-gradient(circle, hsl(var(--primary) / 0.1), transparent 70%)"
                            : "radial-gradient(circle, hsl(var(--secondary) / 0.1), transparent 70%)",
                        left: i === 0 ? "10%" : "auto",
                        right: i === 1 ? "10%" : "auto",
                        top: i === 0 ? "20%" : "60%",
                    }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 5,
                    }}
                />
            ))}
        </div>
    );
};

export default AnimatedBackground;
