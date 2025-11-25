import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

    useEffect(() => {
        let particleId = 0;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Create particle trail
            const newParticle = {
                id: particleId++,
                x: e.clientX,
                y: e.clientY,
            };

            setParticles((prev) => [...prev, newParticle].slice(-15));
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Clean up old particles
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) => prev.slice(1));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Particle Trail */}
            {particles.map((particle, index) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        opacity: index / particles.length,
                    }}
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            ))}

            {/* Main Cursor */}
            <motion.div
                className="absolute w-6 h-6 rounded-full border-2 border-primary mix-blend-difference"
                style={{
                    left: mousePosition.x - 12,
                    top: mousePosition.y - 12,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? "hsl(var(--secondary))" : "hsl(var(--primary))",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            {/* Cursor Glow */}
            <motion.div
                className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl"
                style={{
                    left: mousePosition.x - 24,
                    top: mousePosition.y - 24,
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.6 : 0.3,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Inner Dot */}
            <motion.div
                className="absolute w-1 h-1 rounded-full bg-primary"
                style={{
                    left: mousePosition.x - 2,
                    top: mousePosition.y - 2,
                }}
            />
        </div>
    );
};

export default CustomCursor;
