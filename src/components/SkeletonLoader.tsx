import { motion } from "framer-motion";

const SkeletonCard = () => {
    return (
        <div className="glass-panel p-6 rounded-xl animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-muted rounded w-full mb-2"></div>
            <div className="h-3 bg-muted rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-muted rounded w-4/6"></div>
        </div>
    );
};

const SkeletonLoader = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export default SkeletonLoader;
