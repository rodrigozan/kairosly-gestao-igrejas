import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

const Carousel = React.forwardRef(({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount);
  }, [itemsCount]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemsCount) % itemsCount);
  }, [itemsCount]);
  
  useEffect(() => {
    if (opts?.loop && itemsCount > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, opts.delay || 5000);
      return () => clearInterval(interval);
    }
  }, [itemsCount, opts, handleNext]);


  return (
    <CarouselContext.Provider value={{ orientation, currentIndex, setCurrentIndex, itemsCount, setItemsCount, handleNext, handlePrev, opts }}>
      <div
        ref={ref}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation, itemsCount, setItemsCount } = useCarousel();
  
  useEffect(() => {
    const count = React.Children.count(props.children);
    setItemsCount(count);
  }, [props.children, setItemsCount]);

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef(({ className, index, ...props }, ref) => {
  const { orientation, currentIndex } = useCarousel();
  const isActive = currentIndex === index;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={ref}
          role="group"
          aria-roledescription="slide"
          className={cn(
            'min-w-0 shrink-0 grow-0 basis-full',
            orientation === 'horizontal' ? 'pl-4' : 'pt-4',
            className
          )}
          initial={{ opacity: 0, x: orientation === 'horizontal' ? 100 : 0, y: orientation === 'vertical' ? 100 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: orientation === 'horizontal' ? -100 : 0, y: orientation === 'vertical' ? -100 : 0 }}
          transition={{ duration: 0.5 }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
});
CarouselItem.displayName = 'CarouselItem';


const CarouselPrevious = React.forwardRef(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, handlePrev, itemsCount } = useCarousel();
  if (itemsCount <= 1) return null;
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      onClick={handlePrev}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, handleNext, itemsCount } = useCarousel();
  if (itemsCount <= 1) return null;
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      onClick={handleNext}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };