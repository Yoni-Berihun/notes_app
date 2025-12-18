import { motion } from 'motion/react';
import { StickyNote } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#1e40af]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl"
        >
          <StickyNote size={64} className="text-white" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-white text-3xl font-semibold">NotesApp</h1>
          <p className="text-white/80 mt-2">Your personal notes companion</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
