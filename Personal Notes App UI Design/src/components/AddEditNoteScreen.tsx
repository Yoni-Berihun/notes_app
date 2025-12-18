import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface AddEditNoteScreenProps {
  note?: Note;
  onSave: (title: string, content: string) => void;
  onBack: () => void;
}

export function AddEditNoteScreen({ note, onSave, onBack }: AddEditNoteScreenProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="h-screen w-full bg-background flex flex-col"
    >
      {/* AppBar */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-white">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <h2 className="text-foreground">{note ? 'Edit Note' : 'New Note'}</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSave}
          className="text-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <Save size={20} />
          <span>Save</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Title Input */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full px-4 py-3 bg-transparent border-b-2 border-border focus:border-primary focus:outline-none transition-colors text-xl"
          />
        </div>

        {/* Content Textarea */}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note..."
            className="w-full h-[calc(100vh-200px)] px-4 py-3 bg-transparent focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Save Button (Fixed at Bottom) */}
      <div className="p-6 border-t border-border bg-white">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          Save Note
        </motion.button>
      </div>
    </motion.div>
  );
}
