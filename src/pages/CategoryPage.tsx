import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ChefHat, Target, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Restaurant {
  name: string;
  price: string;
  specialties: string;
  description: string;
  location: string;
  mapUrl: string;
  rating?: number;
}

interface CategoryData {
  title: string;
  emoji: string;
  description: string;
  restaurants: Restaurant[];
}

const categoriesData: Record<string, CategoryData> = {
  "pintxos": {
    title: "Pintxos Donosti",
    emoji: "🍤",
    description: "Lo mejor de una ruta de pintxos es ir a 3-4 lugares diferentes y probar los diferentes estilos de la cocina vasca.",
    restaurants: []
  },
  "pescados-mariscos": {
    title: "Pescados & Mariscos",
    emoji: "🌊",
    description: "Los mejores sabores del mar cantábrico en Gipuzkoa.",
    restaurants: []
  },
  "carnes": {
    title: "Carnes",
    emoji: "🐄",
    description: "Los mejores chuletones y carnes de Gipuzkoa en sus templos gastronómicos.",
    restaurants: [
      {
        name: "Asador Nicolas",
        price: "€€€€",
        specialties: "Pimientos de piquillo y chuleton",
        description: "Dos de los templos de carne en España se encuentran en Tolosa y la tradición y calidad se unen en este lugar espectacular donde la carne se encuentra siempre en la maduración idonea, un manjar",
        location: "Tolosa",
        mapUrl: "https://goo.gl/maps/8k6REkhgQf4nzSqF8",
        rating: 3
      },
      {
        name: "Casa Julian",
        price: "€€€",
        specialties: "Pimientos de piquillo y chuleton",
        description: "El segundo de los templos de la carne y una parada obligatoria",
        location: "Tolosa",
        mapUrl: "https://goo.gl/maps/gtarmBfgXEeeprmdA",
        rating: 3
      },
      {
        name: "Maun Grill bar",
        price: "€€€",
        specialties: "Chuleta",
        description: "Una buena chuleta en el mercado de san martin de san sebastian",
        location: "Donostia",
        mapUrl: "https://goo.gl/maps/xoaNQDFM8SD4r1S89",
        rating: 3
      }
    ]
  },
  "sidreria": {
    title: "Sidreria",
    emoji: "🍎",
    description: "Auténticas sidrerías donde disfrutar del menú tradicional vasco.",
    restaurants: [
      {
        name: "Saizar Sagardotegia",
        price: "€€",
        specialties: "menú sidrería",
        description: "Auténtica experiencia de sidrería tradicional vasca",
        location: "Usúrbil",
        mapUrl: "https://maps.app.goo.gl/vrzeNMdZ1M2L8EhP9?g_st=ic"
      },
      {
        name: "Zabala Sagardotegia",
        price: "€€",
        specialties: "menú sidrería",
        description: "Tradición y calidad en cada sorbo de sidra",
        location: "Aduna",
        mapUrl: "https://maps.app.goo.gl/PuZtCkTVp6wjTca16?g_st=ic"
      },
      {
        name: "Lizeaga Sagardotegia",
        price: "€€",
        specialties: "menú sidrería",
        description: "Experiencia auténtica en el corazón de Gipuzkoa",
        location: "Martutene",
        mapUrl: "https://maps.app.goo.gl/WGFSzf3cN38xji3g8?g_st=ic"
      },
      {
        name: "Zelaia Sagardotegia",
        price: "€€",
        specialties: "menú sidrería",
        description: "Tradición familiar en un entorno incomparable",
        location: "Hernani",
        mapUrl: "https://maps.app.goo.gl/6BG2wBwJqU6gEZSEA?g_st=ic"
      }
    ]
  },
  "estrellas-desconocidas": {
    title: "Estrellas Desconocidas",
    emoji: "⭐",
    description: "Restaurantes con estrella Michelin y propuestas gastronómicas únicas en Gipuzkoa.",
    restaurants: [
      {
        name: "Ama",
        price: "€€€",
        specialties: "menú degustación, 1 ⭐️ Michelin",
        description: "chefs de mercado y temporada jóvenes",
        location: "Tolosa",
        mapUrl: "https://maps.app.goo.gl/batHyFFoDRaHtHRA9?g_st=ic",
        rating: 1
      },
      {
        name: "Arrea",
        price: "€€€",
        specialties: "menú degustación, 1 ⭐️ Michelin",
        description: "chefs de mercado y caza, antiguos dueños de \"a fuego negro\"",
        location: "Kanpezu",
        mapUrl: "https://maps.app.goo.gl/SSJMPRYK4RKEsU919?g_st=ic",
        rating: 1
      },
      {
        name: "Molino de Urdaniz",
        price: "€€€",
        specialties: "menú degustación, 2 ⭐️⭐️ Michelin",
        description: "verduras",
        location: "Urdániz",
        mapUrl: "https://maps.app.goo.gl/fgGmZHvf5tFaF4Bw9?g_st=ic",
        rating: 2
      }
    ]
  }
};

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const renderStars = () => {
    if (!restaurant.rating) return null;
    return (
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: restaurant.rating }, (_, i) => (
          <span key={i} className="text-accent">⭐</span>
        ))}
        <span className="text-sm text-muted-foreground ml-1">
          {restaurant.rating === 1 ? "Michelin" : "Michelin"}
        </span>
      </div>
    );
  };

  return (
    <Card className="group hover:shadow-hover transition-all duration-300 bg-gradient-card border-0">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-foreground group-hover:text-primary transition-colors">
            {restaurant.name}
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {restaurant.price}
          </Badge>
        </div>
        {renderStars()}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <ChefHat className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground font-medium">
            {restaurant.specialties}
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <Target className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {restaurant.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              {restaurant.location}
            </span>
          </div>
          
          {restaurant.mapUrl && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(restaurant.mapUrl, '_blank')}
              className="text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
            >
              Ver Mapa
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const categoryData = category ? categoriesData[category] : null;
  
  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Categoría no encontrada</h1>
          <Button onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-gradient-accent/10 border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>
          
          <div className="text-center">
            <div className="text-6xl mb-4">{categoryData.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {categoryData.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {categoryData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {categoryData.restaurants.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Próximamente
            </h3>
            <p className="text-muted-foreground">
              Estamos preparando el contenido para esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};