import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Church } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const Header = ({ onMenuClick }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 shadow-md bg-background/80 backdrop-blur-md"
    >
      <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Abrir menu">
        <Menu className="w-6 h-6 text-primary" />
      </Button>
      
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
        <Church className="w-7 h-7 text-primary" />
        <span className="hidden sm:inline">Minha Igreja App</span>
        <span className="sm:hidden">IgrejaApp</span>
      </Link>

      <Link to="/perfil">
        <Button variant="ghost" size="icon" aria-label="Perfil do usuário">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://source.unsplash.com/random/100x100/?portrait" alt="Foto do perfil" />
            <AvatarFallback>
              <User className="w-5 h-5 text-primary" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </Link>
    </motion.header>
  );
};

export default Header;