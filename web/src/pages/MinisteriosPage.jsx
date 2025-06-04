import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Music, ShieldQuestion, HeartHandshake, HelpingHand as HandHelping, Crosshair } from 'lucide-react';

const ministeriosData = [
  {
    id: '1',
    nome: 'Ministério de Louvor & Adoração',
    descricao: 'Conduzir a igreja em adoração genuína através da música e artes, criando uma atmosfera de celebração e encontro com Deus.',
    lider: 'Ana Clara Souza',
    icone: <Music className="w-12 h-12 text-primary" />,
    imagem: 'worship band playing on stage'
  },
  {
    id: '2',
    nome: 'Ministério Infantil Geração Futuro',
    descricao: 'Ensinar as crianças os princípios bíblicos de forma criativa e amorosa, formando uma base sólida de fé desde cedo.',
    lider: 'Marcos Oliveira',
    icone: <ShieldQuestion className="w-12 h-12 text-primary" />,
    imagem: 'children learning in a colorful classroom'
  },
  {
    id: '3',
    nome: 'Ministério de Ação Social Mãos que Ajudam',
    descricao: 'Servir a comunidade local com amor prático, atendendo necessidades básicas e demonstrando o cuidado de Cristo.',
    lider: 'Beatriz Costa',
    icone: <HandHelping className="w-12 h-12 text-primary" />,
    imagem: 'volunteers distributing food donations'
  },
  {
    id: '4',
    nome: 'Ministério de Intercessão Torre de Oração',
    descricao: 'Sustentar a igreja e seus membros através da oração contínua, buscando a direção e o poder de Deus para todas as áreas.',
    lider: 'José Ferreira',
    icone: <Crosshair className="w-12 h-12 text-primary" />,
    imagem: 'group of people praying together in a circle'
  },
  {
    id: '5',
    nome: 'Ministério de Casais Laços Eternos',
    descricao: 'Fortalecer os casamentos através de ensino bíblico, aconselhamento e fellowship, construindo famílias saudáveis.',
    lider: 'Pr. Ricardo e Pra. Sofia Almeida',
    icone: <HeartHandshake className="w-12 h-12 text-primary" />,
    imagem: 'happy couple holding hands'
  },
   {
    id: '6',
    nome: 'Ministério de Jovens Conectados',
    descricao: 'Engajar os jovens com a Palavra de Deus, promovendo comunhão, crescimento espiritual e impacto em sua geração.',
    lider: 'Lucas Mendes',
    icone: <Users className="w-12 h-12 text-primary" />,
    imagem: 'group of young people in a discussion'
  },
];

const MinisteriosPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
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
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Nossos Ministérios</h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {ministeriosData.map((ministerio) => (
          <motion.div key={ministerio.id} variants={itemVariants}>
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col glass-card overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <img-replace alt={ministerio.nome} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="z-10 p-4 text-center opacity-80 group-hover:opacity-100 transition-opacity">
                  {React.cloneElement(ministerio.icone, { className: "w-16 h-16 text-primary drop-shadow-lg mx-auto" })}
                </div>
              </div>
              <CardHeader className="pt-6">
                <CardTitle className="text-xl text-primary text-center">{ministerio.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col text-center">
                <CardDescription className="text-sm text-foreground/80 mb-3 flex-grow">{ministerio.descricao}</CardDescription>
                <p className="text-xs text-muted-foreground mt-auto">Líder: {ministerio.lider}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MinisteriosPage;