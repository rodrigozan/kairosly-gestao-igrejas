import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Coins as HandCoins, QrCode, CreditCard, Landmark } from 'lucide-react';

const ContribuicoesPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    valor: '',
    tipoContribuicao: 'dizimo',
    formaPagamento: 'pix',
  });
  const [showPixInfo, setShowPixInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, tipoContribuicao: value }));
  };

  const handleSelectChange = (value) => {
     setFormData(prev => ({ ...prev, formaPagamento: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.valor) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha seu nome e o valor da contribuição.",
        variant: "destructive",
      });
      return;
    }

    if (formData.formaPagamento === 'pix') {
      setShowPixInfo(true);
      toast({
        title: "Instruções para PIX",
        description: "Use a chave PIX ou QR Code abaixo para completar sua contribuição.",
      });
    } else {
      setShowPixInfo(false);
      toast({
        title: "Contribuição Registrada (Simulação)",
        description: `Obrigado, ${formData.nome}! Sua ${formData.tipoContribuicao} de R$ ${formData.valor} via ${formData.formaPagamento} foi registrada.`,
        duration: 7000,
      });
      // Reset form or redirect
      setFormData({ nome: '', valor: '', tipoContribuicao: 'dizimo', formaPagamento: 'pix' });
    }
  };
  
  const pixKey = "contato@comunidaderenovada.org"; // Exemplo de chave PIX

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
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Contribuições</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl glass-card">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <HandCoins className="w-7 h-7 mr-2" /> Faça sua Contribuição
            </CardTitle>
            <CardDescription>Selecione o tipo, valor e forma de pagamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" type="text" placeholder="Seu nome" value={formData.nome} onChange={handleChange} required className="bg-background/70" />
              </div>
              <div>
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input id="valor" name="valor" type="number" placeholder="0,00" value={formData.valor} onChange={handleChange} required step="0.01" min="1" className="bg-background/70" />
              </div>
              <div>
                <Label>Tipo de Contribuição</Label>
                <RadioGroup name="tipoContribuicao" value={formData.tipoContribuicao} onValueChange={handleRadioChange} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dizimo" id="dizimo" />
                    <Label htmlFor="dizimo">Dízimo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oferta" id="oferta" />
                    <Label htmlFor="oferta">Oferta</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                <Select name="formaPagamento" value={formData.formaPagamento} onValueChange={handleSelectChange}>
                  <SelectTrigger id="formaPagamento" className="w-full bg-background/70">
                    <SelectValue placeholder="Selecione a forma de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix"><QrCode className="w-4 h-4 mr-2 inline-block" />PIX</SelectItem>
                    <SelectItem value="cartao"><CreditCard className="w-4 h-4 mr-2 inline-block" />Cartão de Crédito (Em Breve)</SelectItem>
                    <SelectItem value="boleto"><Landmark className="w-4 h-4 mr-2 inline-block" />Boleto (Em Breve)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full text-lg py-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white shadow-lg">
                Confirmar Contribuição
              </Button>
            </form>

            {showPixInfo && formData.formaPagamento === 'pix' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 border border-primary/30 rounded-lg bg-primary/5"
              >
                <h3 className="text-xl font-semibold text-primary mb-3">Pagamento via PIX</h3>
                <p className="text-sm text-foreground/80 mb-2">Copie a chave PIX abaixo ou escaneie o QR Code:</p>
                <div className="bg-background p-3 rounded-md shadow-sm mb-4">
                  <p className="font-mono text-primary break-all">{pixKey}</p>
                </div>
                <div className="flex justify-center mb-4">
                   <img-replace alt="QR Code para pagamento PIX" className="w-48 h-48 border rounded-md p-1 bg-white" />
                </div>
                <p className="text-xs text-muted-foreground text-center">Após a transferência, sua contribuição será processada.</p>
                <Button variant="outline" onClick={() => setShowPixInfo(false)} className="w-full mt-4">
                  Fechar Instruções PIX
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ContribuicoesPage;