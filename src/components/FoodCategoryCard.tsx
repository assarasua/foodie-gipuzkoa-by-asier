import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FoodCategoryCardProps {
  title: string;
  emoji: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export const FoodCategoryCard = ({ 
  title, 
  emoji, 
  description, 
  onClick,
  className 
}: FoodCategoryCardProps) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 glassmorphism hover:shadow-hover border border-border/30 overflow-hidden relative",
        "transform hover:-translate-y-2 hover:scale-[1.01]",
        "before:absolute before:inset-0 before:bg-gradient-accent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-5",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 md:p-8 text-center relative z-10">        
        <div className="relative z-20">
          <div className="text-4xl md:text-6xl mb-4 animate-float group-hover:animate-pulse-glow transition-all duration-500">
            {emoji}
          </div>
          
          <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary traditional-text transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 min-h-[60px] md:min-h-[70px] flex items-center justify-center">
            {description}
          </p>
          
          <Badge 
            variant="secondary" 
            className="bg-primary text-primary-foreground border-0 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium"
          >
            Descubrir
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};