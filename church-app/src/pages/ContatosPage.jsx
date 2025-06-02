import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, UserCircle, Building } from 'lucide-react';

const contatosData = [
  {
    id: '1',
    tipo: 'pastor',
    nome: 'Pr. Ricardo Almeida',
    ministerio: 'Pastor Presidente',
    telefone: '+5511912345678',
    email: 'pr.ricardo@igreja.org',
    foto: 'pastor portrait smiling'
  },
  {
    id: '2',
    tipo: 'lider',
    nome: 'Líder Ana Clara Souza',
    ministerio: 'Ministério de Louvor',
    telefone: '+5511987654321',
    email: 'ana.louvor@igreja.org',
    foto: 'woman singing with microphone'
  },
  {
    id: '3',
    tipo: 'lider',
    nome: 'Líder Marcos Oliveira',
    ministerio: 'Ministério Infantil',
    telefone: '+5511911223344',
    email: 'marcos.infantil@igreja.org',
    foto: 'man playing with children'
  },
  {
    id: '4',
    tipo: 'secretaria',
    nome: 'Secretaria da Igreja',
    telefone: '+551133445566',
    email: 'secretaria@igreja.org',
    foto: 'church office reception'
  }
];

const ContatosPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const renderIcon = (tipo) => {
    if (tipo === 'pastor' || tipo === 'lider') return <UserCircle className="w-8 h-8 text-primary" />;
    if (tipo === 'secretaria') return <Building className="w-8 h-8 text-primary" />;
    return <UserCircle className="w-8 h-8 text-primary" />;
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
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Nossos Contatos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contatosData.map((contato) => (
          <motion.div key={contato.id} variants={itemVariants}>
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col glass-card">
              <CardHeader className="items-center text-center pt-6">
                <Avatar className="w-24 h-24 mb-3 border-4 border-primary">
                  <AvatarImage src={`https://source.unsplash.com/random/150x150/?${contato.foto}`} alt={contato.nome} />
                  <AvatarFallback>{renderIcon(contato.tipo)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-primary">{contato.nome}</CardTitle>
                {contato.ministerio && <p className="text-sm text-muted-foreground">{contato.ministerio}</p>}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end space-y-3 p-6 pt-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`tel:${contato.telefone}`}>
                    <Phone className="w-4 h-4 mr-2 text-green-500" /> Ligar: {contato.telefone}
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`mailto:${contato.email}`}>
                    <Mail className="w-4 h-4 mr-2 text-blue-500" /> E-mail: {contato.email}
                  </a>
                </Button>
                {contato.telefone && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`https://wa.me/${contato.telefone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="w-4 h-4 mr-2 text-teal-500" /> WhatsApp
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContatosPage;