import { motion } from 'motion/react';
import { ArrowLeft, Edit2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface NoteDetailScreenProps {
  note: Note;
  onBack: () => void;
  onEdit: () => void;
}

export function NoteDetailScreen({ note, onBack, onEdit }: NoteDetailScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen w-full bg-background flex flex-col"
    >
      {/* AppBar */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-white">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <h2 className="text-foreground">Note Details</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onEdit}
          className="text-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <Edit2 size={20} />
          <span>Edit</span>
        </motion.button>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 overflow-y-auto p-6"
      >
        <div className="max-w-2xl mx-auto">
          {/* Date */}
          <div className="text-sm text-muted-foreground mb-4">
            {note.date}
          </div>

          {/* Title */}
          <h1 className="text-foreground mb-6">
            {note.title}
          </h1>

          {/* Content */}
          <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
            {note.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
