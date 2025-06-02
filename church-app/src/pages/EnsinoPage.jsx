import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BarChart3, Clock, Award, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const cursosData = [
  {
    id: '1',
    nome: 'Fundamentos da Fé Cristã',
    descricao: 'Uma jornada pelos pilares essenciais da crença cristã, ideal para novos convertidos e para quem deseja revisitar as bases.',
    cargaHoraria: '12 horas (6 semanas)',
    nivel: 'Iniciante',
    imagem: 'open bible with a bright light shining from it'
  },
  {
    id: '2',
    nome: 'Discipulado Transformador',
    descricao: 'Aprenda a caminhar com Cristo e a fazer discípulos, seguindo o modelo de Jesus e impactando vidas.',
    cargaHoraria: '20 horas (10 semanas)',
    nivel: 'Intermediário',
    imagem: 'group of people studying the bible together'
  },
  {
    id: '3',
    nome: 'Liderança Servidora',
    descricao: 'Desenvolva habilidades de liderança com base nos princípios bíblicos de serviço, humildade e integridade.',
    cargaHoraria: '16 horas (8 semanas)',
    nivel: 'Avançado',
    imagem: 'leader speaking to a group of attentive people'
  },
  {
    id: '4',
    nome: 'Hermenêutica Bíblica Aplicada',
    descricao: 'Domine as técnicas de interpretação das Escrituras para um entendimento mais profundo e preciso da Palavra de Deus.',
    cargaHoraria: '24 horas (12 semanas)',
    nivel: 'Avançado',
    imagem: 'person studying ancient texts with a magnifying glass'
  },
];

const EnsinoPage = () => {
  const { toast } = useToast();

  const handleInscricao = (cursoNome) => {
    toast({
      title: "Inscrição Solicitada (Simulação)",
      description: `Sua solicitação de inscrição para "${cursoNome}" foi registrada. Entraremos em contato em breve.`,
      duration: 5000,
    });
    // Futuramente, aqui iria a lógica de integração com backend
  };

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
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Cursos e Ensino</h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cursosData.map((curso) => (
          <motion.div key={curso.id} variants={itemVariants}>
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col glass-card overflow-hidden">
              <div className="h-52 overflow-hidden">
                 <img-replace alt={`Imagem ilustrativa para o curso ${curso.nome}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <CardHeader className="pt-6">
                <CardTitle className="text-xl text-primary">{curso.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <CardDescription className="text-sm text-foreground/80 mb-4 flex-grow">{curso.descricao}</CardDescription>
                <div className="space-y-1 text-xs text-muted-foreground mb-4">
                  <p className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> Carga Horária: {curso.cargaHoraria}</p>
                  <p className="flex items-center"><BarChart3 className="w-3.5 h-3.5 mr-1.5" /> Nível: {curso.nivel}</p>
                </div>
                <Button 
                  onClick={() => handleInscricao(curso.nome)} 
                  className="w-full bg-primary/80 hover:bg-primary text-primary-foreground mt-auto"
                >
                  Inscrever-se <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EnsinoPage;