import { Star } from "lucide-react";
import { motion } from "framer-motion";

const GoogleReviewWidget = () => {
  const handleClick = () => {
    window.open("https://www.google.com/search?q=comfort+technical+services+pune", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-24 left-4 z-40 hidden sm:block"
    >
      <button
        onClick={handleClick}
        className="bg-card border-2 border-primary/20 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
            ))}
          </div>
          <span className="text-sm font-bold text-foreground">5.0</span>
        </div>
        <p className="text-xs text-muted-foreground mb-1">57 Google reviews</p>
        <div className="text-xs font-medium text-primary group-hover:underline">
          Leave a review →
        </div>
      </button>
    </motion.div>
  );
};

export default GoogleReviewWidget;
