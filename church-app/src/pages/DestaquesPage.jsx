import React from 'react';
import { motion } from 'framer-motion';

const DestaquesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Destaques</h1>
      <div className="p-6 bg-card rounded-lg shadow-xl min-h-[300px] flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Conteúdo da página de Destaques em breve...</p>
      </div>
    </motion.div>
  );
};

export default DestaquesPage;