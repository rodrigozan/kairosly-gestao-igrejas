import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, Church, CalendarDays, Newspaper, Youtube, PlaySquare, BookOpen, Coins as HandCoins, Cake, Users, MapPin, Briefcase, GraduationCap, Info } from 'lucide-react';

const menuItems = [
  { to: '/', label: 'Destaques', icon: Home },
  { to: '/minha-igreja', label: 'Minha Igreja', icon: Church },
  { to: '/eventos', label: 'Eventos', icon: CalendarDays },
  { to: '/noticias', label: 'Notícias', icon: Newspaper },
  { to: '/ao-vivo', label: 'Ao Vivo', icon: Youtube },
  { to: '/midias', label: 'Mídias', icon: PlaySquare },
  { to: '/biblia', label: 'Bíblia', icon: BookOpen },
  { to: '/contribuicoes', label: 'Contribuições', icon: HandCoins },
  { to: '/aniversariantes', label: 'Aniversariantes', icon: Cake },
  { to: '/contatos', label: 'Contatos', icon: Users },
  { to: '/procurar-grs', label: 'Procurar GRs', icon: MapPin },
  { to: '/ministerios', label: 'Ministérios', icon: Briefcase },
  { to: '/ensino', label: 'Ensino', icon: GraduationCap },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col bg-gradient-to-b from-background to-secondary/10">
        <SheetHeader className="p-6 border-b">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <Church className="w-8 h-8 text-primary" />
            <SheetTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Minha Igreja App</SheetTitle>
          </Link>
        </SheetHeader>
        <nav className="flex-grow px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.to;
              return (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={
                      `flex items-center p-3 text-base font-medium rounded-lg transition-all duration-200 ease-in-out group hover:bg-primary/10 hover:text-primary
                      ${isActive ? 'bg-primary/20 text-primary shadow-sm' : 'text-foreground/80'}`
                    }
                  >
                    <item.icon className={`w-6 h-6 mr-3 transition-colors duration-200 ease-in-out group-hover:text-primary ${isActive ? 'text-primary' : 'text-foreground/70'}`} />
                    {item.label}
                  </NavLink>
                </motion.li>
              );
            })}
          </ul>
        </nav>
        <div className="p-6 mt-auto border-t">
            <p className="text-xs text-muted-foreground text-center">
                Desenvolvido com ❤️ por Hostinger Horizons
            </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;