import { HeroSection } from "@/components/HeroSection";
import { FoodCategoryCard } from "@/components/FoodCategoryCard";
import { useNavigate } from "react-router-dom";

const foodCategories = [
  {
    title: "Pintxos Donosti",
    emoji: "🍤",
    description: "Lo mejor de una ruta de pintxos es ir a 3-4 lugares diferentes y probar los diferentes estilos de la cocina vasca.",
    slug: "pintxos"
  },
  {
    title: "Pescados & Mariscos",
    emoji: "🌊",
    description: "Los mejores sabores del mar cantábrico en Gipuzkoa.",
    slug: "pescados-mariscos"
  },
  {
    title: "Carnes",
    emoji: "🐄",
    description: "Los mejores chuletones y carnes de Gipuzkoa en sus templos gastronómicos.",
    slug: "carnes"
  },
  {
    title: "Sidrería",
    emoji: "🍎",
    description: "Auténticas sidrerías donde disfrutar del menú tradicional vasco.",
    slug: "sidreria"
  },
  {
    title: "Estrellas Desconocidas",
    emoji: "⭐",
    description: "Restaurantes con estrella Michelin y propuestas gastronómicas únicas en Gipuzkoa.",
    slug: "estrellas-desconocidas"
  }
];

const Index = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
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
                  onClick={() => handleCategoryClick(category.slug)}
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
