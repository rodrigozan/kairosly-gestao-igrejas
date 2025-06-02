import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ItemDetailModal from '@/components/ItemDetailModal';
import { Newspaper, CalendarDays, ArrowRight } from 'lucide-react';

const mockNoticias = [
  { id: '1', title: 'Nova Série de Estudos Bíblicos', date: '25 JUL, 2025', description: 'Iniciamos uma nova série sobre os Profetas Menores. Participe!', image: 'open bible with study notes', fullContent: 'Junte-se a nós todas as quartas-feiras para uma profunda exploração dos Profetas Menores. Aprenda sobre o contexto histórico, as mensagens divinas e a relevância para os dias atuais. Materiais de estudo disponíveis.' },
  { id: '2', title: 'Ação Social Comunitária', date: '18 JUL, 2025', description: 'Nossa igreja realizou um evento de apoio à comunidade local.', image: 'volunteers serving food to community', fullContent: 'No último sábado, nossa equipe de voluntários distribuiu cestas básicas, roupas e ofereceu serviços de corte de cabelo e aferição de pressão para mais de 100 famílias da nossa comunidade. Agradecemos a todos os envolvidos!' },
  { id: '3', title: 'Reforma do Salão Principal Concluída', date: '10 JUL, 2025', description: 'O salão principal da igreja foi totalmente reformado e modernizado.', image: 'modern church interior after renovation', fullContent: 'Após meses de trabalho, estamos felizes em anunciar a conclusão da reforma do nosso salão principal. Com novas instalações, sistema de som e iluminação, estamos prontos para recebê-lo com ainda mais conforto.' },
];

const NoticiasPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Notícias</h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockNoticias.map((noticia) => (
          <motion.div key={noticia.id} variants={itemVariants}>
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col glass-card">
              <CardHeader className="p-0">
                <img  
                  alt={noticia.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                 src="https://images.unsplash.com/photo-1579532582937-16c108930bf6" />
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{noticia.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{noticia.date}</span>
                </div>
                <CardDescription className="text-sm text-foreground/80 mb-4 flex-grow">{noticia.description}</CardDescription>
                <Button onClick={() => handleOpenModal(noticia)} className="mt-auto w-full bg-primary/80 hover:bg-primary text-primary-foreground">
                  Ler Notícia <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <ItemDetailModal isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} />
    </motion.div>
  );
};

export default NoticiasPage;