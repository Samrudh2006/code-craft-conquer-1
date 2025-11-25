import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CardHoverEffectProps {
    children: ReactNode;
    className?: string;
}

const CardHoverEffect = ({ children, className = "" }: CardHoverEffectProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            animate={{
                rotateX,
                rotateY,
                scale: isHovering ? 1.05 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
        >
            {/* Glowing Border on Hover */}
            {isHovering && (
                <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                        background: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
                        filter: "blur(20px)",
                        opacity: 0.5,
                        zIndex: -1,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                />
            )}

            {/* Card Content */}
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>

            {/* Shine Effect */}
            {isHovering && (
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
                        }}
                        animate={{
                            x: ["-100%", "100%"],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

export default CardHoverEffect;
