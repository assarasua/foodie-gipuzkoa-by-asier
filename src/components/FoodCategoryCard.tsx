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
        "group cursor-pointer transition-all duration-300 bg-gradient-card hover:shadow-hover border-0 overflow-hidden",
        "transform hover:-translate-y-2 hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-8 text-center relative">
        <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-float">
            {emoji}
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
          
          <Badge 
            variant="secondary" 
            className="mt-4 bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Explorar
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};