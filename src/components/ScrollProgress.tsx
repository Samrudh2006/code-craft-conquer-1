import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener("scroll", updateScrollProgress);
        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    return (
        <>
            {/* Top Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
                style={{ scaleX: scrollProgress / 100 }}
                initial={{ scaleX: 0 }}
            />

            {/* Circular Progress Indicator */}
            <div className="fixed bottom-28 right-8 z-50 hidden lg:block">
                <svg className="w-16 h-16 -rotate-90">
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="hsl(var(--border))"
                        strokeWidth="4"
                        fill="none"
                    />
                    <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={176}
                        strokeDashoffset={176 - (176 * scrollProgress) / 100}
                        style={{ transition: "stroke-dashoffset 0.3s ease" }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="50%" stopColor="hsl(var(--secondary))" />
                            <stop offset="100%" stopColor="hsl(var(--accent))" />
                        </linearGradient>
                    </defs>
                </svg>

            </div>
        </>
    );
};

export default ScrollProgress;
