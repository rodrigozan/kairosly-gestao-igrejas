import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Globe, Users, HeartHandshake, Eye, ShieldCheck } from 'lucide-react';

const MinhaIgrejaPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const churchInfo = {
    name: "Comunidade da Fé Renovada",
    logoUrl: "church building with modern architecture",
    history: "Fundada em 1998 por um grupo de fiéis com o desejo de criar uma comunidade acolhedora e vibrante, a Comunidade da Fé Renovada tem crescido e impactado vidas ao longo de mais de duas décadas. Nossa jornada é marcada pela busca constante da presença de Deus e pelo serviço ao próximo.",
    mission: "Levar a mensagem transformadora do Evangelho a todas as pessoas, promovendo o crescimento espiritual e o desenvolvimento de relacionamentos saudáveis em um ambiente de amor e aceitação.",
    vision: "Ser uma igreja relevante, que influencia positivamente a sociedade através do exemplo de Cristo, formando discípulos comprometidos e servindo com excelência em todas as áreas.",
    values: [
      { icon: <HeartHandshake className="w-6 h-6 text-primary" />, text: "Amor e Comunhão" },
      { icon: <ShieldCheck className="w-6 h-6 text-primary" />, text: "Integridade e Transparência" },
      { icon: <Users className="w-6 h-6 text-primary" />, text: "Serviço e Generosidade" },
      { icon: <Eye className="w-6 h-6 text-primary" />, text: "Busca por Excelência" },
    ],
    address: "Rua da Esperança, 123 - Bairro Celestial, Cidade da Fé - UF",
    servicesTimes: [
      { day: "Domingo", time: "10:00 (Culto de Celebração) e 18:00 (Culto da Família)" },
      { day: "Quarta-feira", time: "19:30 (Culto de Ensino e Oração)" },
    ],
    phone: "(XX) XXXX-XXXX",
    email: "contato@comunidaderenovada.org",
    socialMedia: [
      { name: "Facebook", url: "https://facebook.com/comunidaderenovada", icon: <Globe className="w-5 h-5 mr-2" /> },
      { name: "Instagram", url: "https://instagram.com/comunidaderenovada", icon: <Globe className="w-5 h-5 mr-2" /> },
      { name: "YouTube", url: "https://youtube.com/comunidaderenovada", icon: <Globe className="w-5 h-5 mr-2" /> },
    ]
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
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{churchInfo.name}</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
          <Card className="shadow-xl glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Nossa História</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed">{churchInfo.history}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="shadow-xl h-full glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">{churchInfo.mission}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="shadow-xl h-full glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">{churchInfo.vision}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-xl glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Nossos Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {churchInfo.values.map((value, index) => (
                    <li key={index} className="flex items-center text-foreground/80">
                      {value.icon}
                      <span className="ml-3">{value.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
          <Card className="shadow-xl glass-card">
            <CardContent className="p-6">
              <img-replace alt={`Logo ou fachada da ${churchInfo.name}`} className="w-full h-auto rounded-lg mb-6 shadow-md object-cover max-h-60" />
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
                  <p className="text-sm text-foreground/80">{churchInfo.address}</p>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Horários dos Cultos:</p>
                    {churchInfo.servicesTimes.map(service => (
                      <p key={service.day} className="text-sm text-foreground/80">{service.day}: {service.time}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                  <a href={`tel:${churchInfo.phone}`} className="text-sm text-primary hover:underline">{churchInfo.phone}</a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                  <a href={`mailto:${churchInfo.email}`} className="text-sm text-primary hover:underline">{churchInfo.email}</a>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-xl glass-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {churchInfo.socialMedia.map(social => (
                  <li key={social.name}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary hover:underline">
                      {social.icon} {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MinhaIgrejaPage;