import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

const ItemDetailModal = ({ isOpen, onClose, item }) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto glass-card p-0">
        <DialogHeader className="p-6 pb-0 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <DialogTitle className="text-3xl font-bold text-primary mb-1">{item.title}</DialogTitle>
          {item.date && (
            <DialogDescription className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-2" />
              {item.date}
            </DialogDescription>
          )}
           <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6"
        >
          {item.image && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
              <img-replace src={item.image} alt={item.title} className="w-full h-auto max-h-96 object-cover" />
            </div>
          )}
          <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90">
            {item.fullContent || item.description}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;