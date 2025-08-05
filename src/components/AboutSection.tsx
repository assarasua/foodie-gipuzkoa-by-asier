import { Card, CardContent } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphism border border-border/30 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/a6d93fda-c011-458a-8b81-fe144a606939.png"
                    alt="Asier Sarasua"
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-primary/20 shadow-elegant"
                  />
                  <div className="absolute -bottom-1 -right-1 text-2xl md:text-3xl">👨‍🍳</div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4 traditional-text">
                  Sobre Asier Sarasua
                </h2>
                
                <div className="space-y-4 text-muted-foreground font-body">
                  <p className="text-base md:text-lg leading-relaxed">
                    <strong className="text-foreground">Asier Sarasua</strong> es un gastronómico de paladar refinado con una experiencia excepcional en la degustación y análisis culinario. 
                    Ha visitado y evaluado los mejores restaurantes de Euskadi, Gipuzkoa y Madrid, desarrollando un conocimiento profundo de la alta gastronomía.
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    Su experiencia trasciende fronteras: con <strong className="text-foreground">51 países visitados</strong>, Asier ha explorado y degustado la gastronomía mundial, 
                    lo que le permite ofrecer una perspectiva única sobre la cocina vasca en el contexto gastronómico internacional. Esta experiencia global 
                    enriquece su comprensión de los sabores locales y su capacidad para identificar la excelencia culinaria.
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    "La gastronomía vasca no es solo comida, es cultura, tradición y pasión", dice Asier. 
                    "Cada pintxo, cada plato, cuenta una historia de nuestro pueblo y nuestra tierra. Mi misión es compartir estos tesoros con el paladar más exigente."
                  </p>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    Paladar Refinado
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    51 Países Visitados
                  </span>
                  <span className="px-3 py-1 bg-basque-green/10 text-basque-green rounded-full text-sm font-medium">
                    Experto en Degustación
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};