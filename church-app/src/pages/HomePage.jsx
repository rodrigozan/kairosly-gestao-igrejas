import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const bannerItems = [
    { title: 'Culto de Celebração', description: 'Participe conosco todos os Domingos às 10h e 18h.', image: 'modern church interior during service', alt: 'Culto de Celebração na igreja' },
    { title: 'Conferência Anual', description: 'Inscreva-se para nossa conferência de fé e renovo.', image: 'large conference hall with audience', alt: 'Conferência anual da igreja' },
    { title: 'Grupos de Relacionamento', description: 'Encontre um GR perto de você e cresça em comunidade.', image: 'diverse group of people smiling and talking', alt: 'Pessoas em um grupo de relacionamento' },
  ];

  const videoItems = [
    { title: 'Última Pregação: Fé Inabalável', pastor: 'Pr. João Silva', image: 'pastor preaching on stage', alt: 'Pastor pregando no púlpito' },
    { title: 'Louvor & Adoração: Noite de Clamor', image: 'worship band playing on stage with lights', alt: 'Banda de louvor tocando' },
    { title: 'Estudo Bíblico: Livro de Romanos', pastor: 'Pra. Ana Costa', image: 'open bible with glasses on a wooden table', alt: 'Bíblia aberta para estudo' },
  ];

  const newsItems = [
    { title: 'Ação Social de Inverno', date: '20 JUL, 2025', description: 'Nossa equipe realizou a entrega de agasalhos e alimentos...', image: 'volunteers distributing clothes and food', alt: 'Voluntários em ação social' },
    { title: 'Batismo nas Águas', date: '15 JUL, 2025', description: 'Celebramos a decisão de mais de 50 vidas pelo batismo.', image: 'people being baptized in a pool', alt: 'Pessoas sendo batizadas' },
    { title: 'Nova Fachada da Igreja', date: '10 JUL, 2025', description: 'Concluímos a reforma da nossa fachada. Venha conferir!', image: 'modern church building exterior', alt: 'Nova fachada da igreja' },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-12">
      <motion.section
        aria-labelledby="banners-destaque"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 id="banners-destaque" className="sr-only">Banners de Destaque</h1>
        <Carousel 
            className="w-full max-w-4xl mx-auto"
            opts={{ loop: true, delay: 7000 }}
        >
          <CarouselContent>
            {bannerItems.map((item, index) => (
              <CarouselItem key={index} index={index}>
                <Card className="overflow-hidden shadow-xl glass-card">
                  <div className="relative h-64 md:h-96">
                    <img  
                      className="absolute inset-0 object-cover w-full h-full" 
                      alt={item.alt}
                     src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                      <motion.h2 
                        className="text-3xl md:text-4xl font-bold mb-2"
                        initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.2 }}
                      >
                        {item.title}
                      </motion.h2>
                      <motion.p 
                        className="text-lg md:text-xl mb-4"
                        initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.3 }}
                      >
                        {item.description}
                      </motion.p>
                      <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.4 }}>
                        <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white shadow-lg">
                          Saiba Mais <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 sm:left-4 text-white bg-black/30 hover:bg-black/50 border-none" />
          <CarouselNext className="right-2 sm:right-4 text-white bg-black/30 hover:bg-black/50 border-none" />
        </Carousel>
      </motion.section>

      <motion.section
        aria-labelledby="videos-recentes"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-8"
      >
        <h2 id="videos-recentes" className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Vídeos Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoItems.map((video, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group glass-card">
                <CardHeader className="p-0 relative">
                  <img  
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                    alt={video.alt}
                   src="https://images.unsplash.com/photo-1587050007609-d9686b217bd6" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="w-16 h-16 text-white/80" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">{video.title}</CardTitle>
                  {video.pastor && <CardDescription className="text-sm">{video.pastor}</CardDescription>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        aria-labelledby="noticias-recentes"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-8"
      >
        <h2 id="noticias-recentes" className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Notícias da Igreja</h2>
        <div className="space-y-6">
          {newsItems.map((news, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group glass-card">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img  
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    alt={news.alt}
                   src="https://images.unsplash.com/photo-1579532582937-16c108930bf6" />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{news.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mb-2">{news.date}</CardDescription>
                  <p className="text-foreground/80 mb-4 text-sm">{news.description}</p>
                  <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                    Ler Mais <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;