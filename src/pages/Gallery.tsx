import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/data/staticData";
import { GalleryImageSkeleton } from "@/components/GalleryImageSkeleton";
import { LazyImage } from "@/components/LazyImage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImageLoading, setLightboxImageLoading] = useState(false);
  const headerRef = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Preload adjacent images
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const preloadImage = (index: number) => {
      if (index >= 0 && index < galleryImages.length) {
        const img = new Image();
        img.src = galleryImages[index].image_url;
      }
    };

    // Preload previous and next images
    preloadImage(selectedImageIndex - 1);
    preloadImage(selectedImageIndex + 1);
  }, [selectedImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  const handlePrevious = () => {
    if (selectedImageIndex === null) return;
    setLightboxImageLoading(true);
    setSelectedImageIndex((prev) => 
      prev === null || prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setLightboxImageLoading(true);
    setSelectedImageIndex((prev) => 
      prev === null || prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        <div ref={headerRef.ref} className={`text-center mb-8 scroll-animate ${headerRef.isVisible ? 'visible' : ''}`}>
          <h1 className="mb-2">Our Work Gallery</h1>
          <p className="text-muted-foreground text-sm">
            See our professional AC installation, servicing, and repair work
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <GalleryImageSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <LazyImage
                  src={image.image_url}
                  alt={image.title || "AC Service"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                  <div className="p-3 text-background">
                    <h3 className="font-medium text-sm">{image.title}</h3>
                    {image.description && (
                      <p className="text-xs opacity-80">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
              ))}
            </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImageIndex(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 text-background hover:text-background/70 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(null);
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Previous Button */}
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 transition-colors bg-foreground/50 rounded-full p-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Next Button */}
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 transition-colors bg-foreground/50 rounded-full p-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Image Container */}
              <motion.div 
                className="max-w-4xl max-h-[90vh] flex flex-col items-center relative touch-none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  // Swipe threshold - 50px minimum swipe distance
                  const swipeThreshold = 50;
                  const swipeVelocity = 500;
                  
                  if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocity) {
                    if (info.offset.x > 0) {
                      // Swiped right - go to previous
                      handlePrevious();
                    } else {
                      // Swiped left - go to next
                      handleNext();
                    }
                  }
                }}
              >
                {lightboxImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 border-4 border-background/30 border-t-background rounded-full animate-spin" />
                  </div>
                )}
                <motion.img
                  key={selectedImage.image_url}
                  src={selectedImage.image_url}
                  alt={selectedImage.title || "Gallery Image"}
                  className={`max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300 select-none ${
                    lightboxImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: lightboxImageLoading ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  onLoad={() => setLightboxImageLoading(false)}
                  draggable={false}
                />
                <div className="text-background mt-3 text-center select-none">
                  <p className="text-sm font-medium">{selectedImage.title}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {selectedImageIndex !== null && `${selectedImageIndex + 1} / ${galleryImages.length}`}
                  </p>
                  <p className="text-xs opacity-50 mt-2">
                    Swipe or use arrow keys to navigate
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
