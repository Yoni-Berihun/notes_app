import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface NotesListScreenProps {
  activeTab: 'notes' | 'profile';
  onTabChange: (tab: 'notes' | 'profile') => void;
  onAddNote: () => void;
  onEditNote: (note: Note) => void;
  onViewNote: (note: Note) => void;
}

export function NotesListScreen({ 
  activeTab, 
  onTabChange, 
  onAddNote, 
  onEditNote,
  onViewNote 
}: NotesListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Meeting Notes',
      content: 'Discussed the new project timeline and deliverables. Need to follow up with the team on Monday.',
      date: 'Dec 18, 2025'
    },
    {
      id: '2',
      title: 'Grocery List',
      content: 'Milk, Eggs, Bread, Cheese, Apples, Chicken, Rice, Pasta, Tomatoes',
      date: 'Dec 17, 2025'
    },
    {
      id: '3',
      title: 'Book Ideas',
      content: 'Fiction novel about a time traveler who accidentally changes history and must fix it before the timeline collapses.',
      date: 'Dec 15, 2025'
    },
    {
      id: '4',
      title: 'Workout Plan',
      content: 'Monday: Chest & Triceps, Wednesday: Back & Biceps, Friday: Legs & Shoulders',
      date: 'Dec 14, 2025'
    },
    {
      id: '5',
      title: 'Trip Planning',
      content: 'Tokyo itinerary: Shibuya, Akihabara, Mount Fuji day trip, Traditional tea ceremony',
      date: 'Dec 12, 2025'
    }
  ]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* AppBar */}
      <div className="bg-white border-b border-border">
        <div className="h-14 flex items-center justify-between px-6">
          <h2 className="text-foreground">My Notes</h2>
          <div className="text-muted-foreground text-sm">{notes.length} notes</div>
        </div>
        
        {/* Search Bar */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-12 pr-4 py-2.5 bg-input-background rounded-xl border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <AnimatePresence>
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-border hover:shadow-md transition-shadow"
                onClick={() => onViewNote(note)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-foreground flex-1 line-clamp-1 pr-2">{note.title}</h3>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditNote(note);
                      }}
                      className="text-primary p-1.5 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note.id);
                      }}
                      className="text-destructive p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                  {note.content}
                </p>
                <div className="flex justify-end">
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="text-muted-foreground mb-2">No notes found</div>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try a different search term' : 'Tap the + button to create your first note'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddNote}
        className="absolute bottom-20 right-6 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center"
      >
        <Plus size={28} />
      </motion.button>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
