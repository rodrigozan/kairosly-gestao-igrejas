import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PerfilPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 max-w-2xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Meu Perfil</h1>
      
      <Card className="shadow-xl glass-card">
        <CardHeader className="items-center text-center">
          <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-lg">
            <AvatarImage src="https://source.unsplash.com/random/200x200/?user-profile" alt="Foto do perfil do usuário" />
            <AvatarFallback>
              <User className="w-16 h-16 text-primary" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Nome do Usuário</CardTitle>
          <p className="text-muted-foreground">usuario@example.com</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-primary">Informações Pessoais</h2>
            <p><span className="font-medium">Telefone:</span> (XX) XXXXX-XXXX</p>
            <p><span className="font-medium">Data de Nascimento:</span> DD/MM/AAAA</p>
            <p><span className="font-medium">Membro Desde:</span> MM/AAAA</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-primary">Preferências</h2>
            <p><span className="font-medium">Notificações:</span> Ativadas</p>
            <p><span className="font-medium">Tema:</span> Claro</p>
          </div>

          <div className="flex justify-center pt-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white shadow-lg">
              Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerfilPage;