import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Youtube, WifiOff } from 'lucide-react';

// Simulação de estado da API do YouTube
const useYouTubeLiveStatus = (channelId) => {
  const [isLive, setIsLive] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula uma chamada à API do YouTube
    const fetchLiveStatus = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay da API

      // Simulação de resposta:
      // Mude esta lógica para testar diferentes cenários
      const mockApiResponse = Math.random() > 0.5 ? { live: true, id: 'dQw4w9WgXcQ' } : { live: false }; 
      
      if (mockApiResponse.live) {
        setIsLive(true);
        setVideoId(mockApiResponse.id);
      } else {
        setIsLive(false);
        setVideoId(null);
      }
      setIsLoading(false);
    };

    if (channelId) {
      fetchLiveStatus();
    } else {
      setIsLoading(false); // Se não houver channelId, não carrega
    }
  }, [channelId]);

  return { isLive, videoId, isLoading };
};


const AoVivoPage = () => {
  const churchChannelId = 'UCdummyChannelId12345'; // Substitua pelo ID real do canal da igreja
  const { isLive, videoId, isLoading } = useYouTubeLiveStatus(churchChannelId);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
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
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Transmissão Ao Vivo</h1>

      <Card className="shadow-xl glass-card overflow-hidden">
        {isLoading ? (
          <CardContent className="p-6 min-h-[400px] flex flex-col items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"
            />
            <p className="text-muted-foreground">Verificando transmissão ao vivo...</p>
          </CardContent>
        ) : isLive && videoId ? (
          <>
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Transmissão ao Vivo da Igreja"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <CardContent className="p-6 text-center">
              <CardTitle className="text-2xl text-primary mb-2">Estamos Ao Vivo Agora!</CardTitle>
              <CardDescription className="mb-4">
                Acompanhe nossa transmissão e participe conosco.
              </CardDescription>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                <a href={`https://youtube.com/channel/${churchChannelId}`} target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5 mr-2" /> Abrir no YouTube
                </a>
              </Button>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-10 min-h-[400px] flex flex-col items-center justify-center text-center">
            <WifiOff className="w-20 h-20 text-muted-foreground mb-6" />
            <CardTitle className="text-2xl text-primary mb-3">Nenhuma Transmissão Ao Vivo</CardTitle>
            <CardDescription className="mb-6 max-w-md">
              Não há nenhuma transmissão acontecendo no momento. Confira nossos horários ou visite nosso canal no YouTube para ver gravações anteriores.
            </CardDescription>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={`https://youtube.com/channel/${churchChannelId}`} target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 mr-2" /> Visitar Canal no YouTube
              </a>
            </Button>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default AoVivoPage;