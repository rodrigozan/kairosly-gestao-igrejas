import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, Phone } from 'lucide-react';

// Dados mocados para simular GRs
const mockGRs = [
  { id: '1', nome: 'GR Família Unida', endereco: 'Rua das Acácias, 10 - Centro', diaHorario: 'Terça-feira, 19:30', lider: 'João e Maria Silva', contatoLider: '+5511912340001', lat: -23.550520, lng: -46.633308 },
  { id: '2', nome: 'GR Jovens Conectados', endereco: 'Av. Principal, 500 - Bairro Novo', diaHorario: 'Quinta-feira, 20:00', lider: 'Carlos Andrade', contatoLider: '+5511912340002', lat: -23.561320, lng: -46.649900 },
  { id: '3', nome: 'GR Mulheres Virtuosas', endereco: 'Praça da Fé, 25 - Jardim Esperança', diaHorario: 'Quarta-feira, 15:00', lider: 'Ana Pereira', contatoLider: '+5511912340003', lat: -23.540000, lng: -46.630000 },
];

const ProcurarGRsPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Encontre um Grupo de Relacionamento</h1>

      <Card className="mb-8 shadow-xl glass-card">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            A integração com o mapa interativo (Google Maps API) será implementada em breve. 
            Por enquanto, veja abaixo uma lista de Grupos de Relacionamento (GRs) disponíveis.
          </p>
          <div className="mt-4 text-center">
             <img-replace alt="Mapa placeholder mostrando pontos de localização" className="w-full max-w-xl mx-auto h-auto rounded-lg shadow-md object-contain" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGRs.map((gr) => (
          <motion.div key={gr.id} variants={itemVariants}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Users className="w-6 h-6 mr-2" /> {gr.nome}
                </CardTitle>
                <CardDescription>Líder: {gr.lider}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <div className="flex items-start text-sm">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                  <span>{gr.endereco}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
                  <span>{gr.diaHorario}</span>
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full bg-primary/80 hover:bg-primary text-primary-foreground" asChild>
                  <a href={`tel:${gr.contatoLider}`}>
                    <Phone className="w-4 h-4 mr-2" /> Contatar Líder
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcurarGRsPage;