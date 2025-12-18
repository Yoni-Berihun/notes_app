import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image, X } from 'lucide-react';

interface ImagePickerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCamera: () => void;
  onSelectGallery: () => void;
}

export function ImagePickerBottomSheet({
  isOpen,
  onClose,
  onSelectCamera,
  onSelectGallery
}: ImagePickerBottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-foreground">Choose Photo</h3>
              <button onClick={onClose} className="text-muted-foreground">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {/* Camera Option */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelectCamera();
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera size={24} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-foreground">Take Photo</div>
                  <div className="text-xs text-muted-foreground">Use your camera</div>
                </div>
              </motion.button>

              {/* Gallery Option */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelectGallery();
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Image size={24} className="text-accent" />
                </div>
                <div className="text-left">
                  <div className="text-foreground">Choose from Gallery</div>
                  <div className="text-xs text-muted-foreground">Select existing photo</div>
                </div>
              </motion.button>

              {/* Cancel Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
