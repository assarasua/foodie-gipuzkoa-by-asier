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
        "group cursor-pointer transition-all duration-500 glassmorphism hover:shadow-glow border-0 overflow-hidden relative",
        "transform hover:-translate-y-3 hover:scale-[1.02] hover:rotate-1",
        "before:absolute before:inset-0 before:bg-gradient-accent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-10",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 md:p-8 text-center relative z-10">        
        <div className="relative z-20">
          <div className="text-4xl md:text-6xl mb-4 animate-float group-hover:animate-pulse-glow transition-all duration-500">
            {emoji}
          </div>
          
          <h3 className="text-lg md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary group-hover:neon-text transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-4 min-h-[60px] md:min-h-[80px] flex items-center justify-center">
            {description}
          </p>
          
          <Badge 
            variant="secondary" 
            className="bg-gradient-accent text-white border-0 group-hover:animate-gradient transition-all duration-300 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold"
          >
            Explorar ✨
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};