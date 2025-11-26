import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ThreeDCardProps {
    children: React.ReactNode;
    className?: string;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
        const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            className={`perspective-1000 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="card-3d w-full h-full"
                animate={{
                    rotateX: isHovered ? rotation.x : 0,
                    rotateY: isHovered ? rotation.y : 0,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default ThreeDCard;
