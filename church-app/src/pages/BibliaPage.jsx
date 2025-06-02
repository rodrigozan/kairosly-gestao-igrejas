import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Bookmark } from 'lucide-react';
import { books as bibleBooksList, getChapters, getVerses } from '@/data/bibleData';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/use-toast';

const BibliaPage = () => {
  const [selectedBook, setSelectedBook] = useState(bibleBooksList[0]);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [verses, setVerses] = useState([]);
  const [highlightedVerses, setHighlightedVerses] = useLocalStorage('highlightedVerses', {});
  const { toast } = useToast();

  const updateChapters = useCallback(() => {
    const bookChapters = getChapters(selectedBook);
    setChapters(bookChapters);
    if (bookChapters.length > 0) {
      setSelectedChapter(prevChapter => 
        bookChapters.includes(prevChapter) ? prevChapter : bookChapters[0] || '1'
      );
    } else {
      setSelectedChapter('1'); 
      setVerses([]); 
    }
  }, [selectedBook]);

  useEffect(() => {
    updateChapters();
  }, [selectedBook, updateChapters]);

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      const chapterVerses = getVerses(selectedBook, selectedChapter);
      setVerses(chapterVerses);
    } else {
      setVerses([]);
    }
  }, [selectedBook, selectedChapter]);

  const handleHighlightVerse = (verseIndex) => {
    const verseKey = `${selectedBook}-${selectedChapter}-${verseIndex}`;
    setHighlightedVerses(prev => {
      const newHighlights = {...prev};
      if (newHighlights[verseKey]) {
        delete newHighlights[verseKey];
        toast({ title: "Destaque Removido", description: `${selectedBook} ${selectedChapter}:${verseIndex + 1} não está mais destacado.`});
      } else {
        newHighlights[verseKey] = true;
        toast({ title: "Versículo Destacado!", description: `${selectedBook} ${selectedChapter}:${verseIndex + 1} foi destacado.`});
      }
      return newHighlights;
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const verseVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
      },
    }),
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 inline-flex items-center">
          <BookOpen className="w-10 h-10 mr-3" />
          Bíblia Sagrada
        </h1>
      </header>

      <Card className="shadow-xl mb-8 glass-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="book-select" className="block text-sm font-medium text-muted-foreground mb-1">Livro</label>
              <Select value={selectedBook} onValueChange={(value) => setSelectedBook(value)}>
                <SelectTrigger id="book-select" className="w-full bg-background/70">
                  <SelectValue placeholder="Selecione um livro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Livros</SelectLabel>
                    {bibleBooksList.map(book => (
                      <SelectItem key={book} value={book}>{book}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="chapter-select" className="block text-sm font-medium text-muted-foreground mb-1">Capítulo</label>
              <Select value={selectedChapter} onValueChange={(value) => setSelectedChapter(value)} disabled={chapters.length === 0}>
                <SelectTrigger id="chapter-select" className="w-full bg-background/70">
                  <SelectValue placeholder="Selecione um capítulo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Capítulos</SelectLabel>
                    {chapters.map(chapter => (
                      <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl glass-card">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{selectedBook} {selectedChapter}</CardTitle>
        </CardHeader>
        <CardContent>
          {verses && verses.length > 0 ? (
            <div className="space-y-3">
              {verses.map((verse, index) => {
                const verseKey = `${selectedBook}-${selectedChapter}-${index}`;
                const isHighlighted = highlightedVerses[verseKey];
                return (
                  <motion.p
                    key={index}
                    custom={index}
                    variants={verseVariants}
                    initial="hidden"
                    animate="visible"
                    className={`text-base md:text-lg leading-relaxed cursor-pointer p-2 rounded-md transition-all duration-200 ease-in-out
                                ${isHighlighted ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-secondary/50'}`}
                    onClick={() => handleHighlightVerse(index)}
                  >
                    <span className="font-semibold text-primary/80 mr-1">{index + 1}</span> {verse}
                    {isHighlighted && <Bookmark className="inline-block w-4 h-4 ml-2 text-primary" />}
                  </motion.p>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Selecione um livro e capítulo para ver os versículos, ou este capítulo não possui versículos.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BibliaPage;