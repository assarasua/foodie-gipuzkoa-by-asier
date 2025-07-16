import { HeroSection } from "@/components/HeroSection";
import { FoodCategoryCard } from "@/components/FoodCategoryCard";

const foodCategories = [
  {
    title: "Pintxos Donosti",
    emoji: "🍤",
    description: "Los mejores pintxos de San Sebastián. Tradición y creatividad en cada bocado de la capital gastronómica."
  },
  {
    title: "Pescados & Mariscos",
    emoji: "🌊",
    description: "Del mar Cantábrico a tu mesa. Pescados frescos y mariscos de la costa vasca con sabor auténtico."
  },
  {
    title: "Carnes",
    emoji: "🐄",
    description: "Carnes de primera calidad. Desde el famoso chuletón a la brasa hasta las mejores carnes rojas de la región."
  },
  {
    title: "Sidrería",
    emoji: "🍎",
    description: "La tradición sidrera vasca. Sidra natural, bacalao al pil pil y la experiencia auténtica de las sidrerías."
  },
  {
    title: "Estrellas Desconocidas",
    emoji: "⭐",
    description: "Joyas ocultas de la gastronomía gipuzkoana. Lugares secretos que solo conocen los locales."
  }
];

const Index = () => {
  const handleCategoryClick = (title: string) => {
    // Here we would navigate to the specific category page
    // For now, we'll just log it
    console.log(`Clicked on ${title}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Categories Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Explora Nuestras Categorías
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada categoría te llevará a un viaje gastronómico único por los sabores más auténticos de Gipuzkoa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodCategories.map((category, index) => (
              <div 
                key={category.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <FoodCategoryCard
                  title={category.title}
                  emoji={category.emoji}
                  description={category.description}
                  onClick={() => handleCategoryClick(category.title)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-hero text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">👨‍🍳</span>
            <h3 className="text-2xl font-bold">Asier Sarasua</h3>
          </div>
          <p className="text-white/80 text-lg">
            Guía gastronómica apasionada por los sabores auténticos del País Vasco
          </p>
          <p className="text-white/60 mt-4">
            © 2024 Gipuzkoa Foodie. Hecho con ❤️ en Euskadi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
