import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KonamiCode = () => {
    const [isActivated, setIsActivated] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if (key === konamiCode[currentIndex]) {
                setCurrentIndex((prev) => prev + 1);

                if (currentIndex + 1 === konamiCode.length) {
                    setIsActivated(true);
                    setShowMessage(true);
                    setCurrentIndex(0);

                    // Log secret message to console
                    console.log("%c🎮 KONAMI CODE ACTIVATED! 🎮", "color: #00ffff; font-size: 24px; font-weight: bold;");
                    console.log("%c🚀 Welcome, Elite Developer! 🚀", "color: #ff00ff; font-size: 18px;");
                    console.log("%cYou've unlocked the secret developer mode!", "color: #00ff00; font-size: 14px;");
                    console.log("%c✨ May your code be bug-free and your coffee strong! ✨", "color: #ffff00; font-size: 12px;");

                    // Hide message after 5 seconds
                    setTimeout(() => setShowMessage(false), 5000);
                }
            } else {
                setCurrentIndex(0);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, konamiCode]);

    return (
        <>
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-2xl glass-panel border-2 border-primary shadow-2xl"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <motion.div
                                className="text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-6xl mb-4">🎮</div>
                                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    KONAMI CODE ACTIVATED!
                                </h2>
                                <p className="text-lg text-white/80">
                                    Elite Developer Mode Unlocked! 🚀
                                </p>
                                <div className="mt-4 flex gap-2 justify-center">
                                    {[...Array(10)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 bg-white rounded-full"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.5, 1, 0.5],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.1,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Confetti Effect */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(50)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-3 h-3 rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: "-10%",
                                        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                                    }}
                                    animate={{
                                        y: ["0vh", "110vh"],
                                        x: [0, (Math.random() - 0.5) * 200],
                                        rotate: [0, 360],
                                        opacity: [1, 0],
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        delay: Math.random() * 0.5,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Permanent effect when activated */}
            {isActivated && (
                <div className="fixed top-4 right-4 z-50 pointer-events-none">
                    <motion.div
                        className="text-2xl"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        🎮
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default KonamiCode;
