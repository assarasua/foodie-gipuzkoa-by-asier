import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ChefHat, Target, Euro, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Import restaurant logos
import logoElkano from "@/assets/logo-elkano.png";
import logoCucharaSanTelmo from "@/assets/logo-cuchara-san-telmo.png";
import logoBarNestor from "@/assets/logo-bar-nestor.png";
import logoGandarias from "@/assets/logo-gandarias.png";
import logoAsadorNicolas from "@/assets/logo-asador-nicolas.png";
import logoCasaJulian from "@/assets/logo-casa-julian.png";
import logoArzak from "@/assets/logo-arzak.png";
import logoTxominEtxaniz from "@/assets/logo-txomin-etxaniz.png";
import logoAtari from "@/assets/logo-atari.png";
import logoEtxebarri from "@/assets/logo-etxebarri.png";
import pintxosImage from "@/assets/pintxos-food.jpg";
import pintxosBar from "@/assets/pintxos-bar.jpg";
import carneImage from "@/assets/carne-food.jpg";
import seafoodImage from "@/assets/seafood-food.jpg";
import sidreriaImage from "@/assets/sidreria-food.jpg";

interface Restaurant {
  name: string;
  price: string;
  specialties: string;
  description: string;
  location: string;
  mapUrl?: string;
  rating?: number;
  age?: number;
  category?: string;
  imageUrl?: string;
  
}

interface CategoryData {
  title: string;
  emoji: string;
  description: string;
  restaurants: Restaurant[];
}

const categoriesData: Record<string, CategoryData> = {
  "vegetarianos": {
    title: "Vegetarianos",
    emoji: "🌱",
    description: "Opciones vegetarianas y veganas innovadoras en Gipuzkoa. Cocina verde de alta calidad.",
    restaurants: [
      {
        name: "Green Garden",
        price: "€€",
        specialties: "Cocina vegana creativa",
        description: "Restaurante 100% vegano con propuestas innovadoras usando productos locales y de temporada. Menú cambia semanalmente con creaciones únicas.",
        location: "Donostia",
        mapUrl: "https://maps.google.com/?q=Green+Garden+Donostia"
      },
      {
        name: "Verdura & Co",
        price: "€€",
        specialties: "Vegetariano gourmet",
        description: "Cocina vegetariana de alta calidad con influencias mediterráneas y vascas. Especialistas en verduras de proximidad y mercado local.",
        location: "Tolosa",
        mapUrl: "https://maps.google.com/?q=Verdura+Co+Tolosa"
      },
      {
        name: "Plant Based Pintxos",
        price: "€",
        specialties: "Pintxos veganos",
        description: "Los mejores pintxos vegetarianos y veganos de la Parte Vieja. Innovación en cada bocado sin renunciar al sabor tradicional vasco.",
        location: "Donostia - Parte Vieja",
        mapUrl: "https://maps.google.com/?q=Plant+Based+Pintxos+Donostia"
      }
    ]
  },
  "txakolindegis": {
    title: "Txakolindegis",
    emoji: "🍇",
    description: "Las mejores txakolindegis de Gipuzkoa. Vinos blancos frescos con denominación de origen Getariako Txakolina.",
    restaurants: [
      {
        name: "Txomin Etxaniz",
        price: "€€",
        specialties: "Txakoli tradicional",
        description: "Una de las txakolindegis más prestigiosas de Getaria. Txakoli elaborado con uvas Hondarrabi Zuri siguiendo métodos tradicionales vascos.",
        location: "Getaria",
        mapUrl: "https://maps.google.com/?q=Txomin+Etxaniz+Getaria",
        imageUrl: logoTxominEtxaniz,
        rating: 2
      },
      {
        name: "Gaintza",
        price: "€€",
        specialties: "Txakoli premium",
        description: "Txakolindegia familiar en las colinas de Getaria. Vinos frescos y afrutados con carácter atlántico único y personalidad propia.",
        location: "Getaria",
        mapUrl: "https://maps.google.com/?q=Gaintza+Getaria"
      },
      {
        name: "Ameztoi",
        price: "€€",
        specialties: "Txakoli ecológico",
        description: "Producción ecológica de txakoli con métodos sostenibles. Uno de los txakolis más reconocidos internacionalmente por su calidad.",
        location: "Getaria",
        mapUrl: "https://maps.google.com/?q=Ameztoi+Getaria"
      },
      {
        name: "Rezabal",
        price: "€€",
        specialties: "Txakoli artesanal",
        description: "Pequeña txakolindegia artesanal que mantiene la tradición familiar. Txakoli con personalidad propia y carácter único excepcional.",
        location: "Zarauz",
        mapUrl: "https://maps.google.com/?q=Rezabal+Zarauz"
      }
    ]
  },
  "pintxos": {
    title: "Pintxos Donosti",
    emoji: "🍤",
    description: "Lo mejor de una ruta de pintxos es ir a 3-4 lugares diferentes y probar los diferentes estilos de la cocina vasca.",
    restaurants: [
      {
        name: "La Cuchara de San Telmo",
        price: "€€",
        specialties: "Pintxos creativos, foie micuit",
        description: "Pionero en la renovación del pintxo tradicional. Cada creación es una obra de arte en miniatura con sabores intensos y únicos.",
        location: "Donostia - Parte Vieja",
        imageUrl: logoCucharaSanTelmo,
        mapUrl: "https://maps.google.com/?q=La+Cuchara+de+San+Telmo+Donostia",
        rating: 3
      },
      {
        name: "Bar Nestor",
        price: "€",
        specialties: "Tortilla de patatas, tomate con anchoa",
        description: "El templo de la tortilla en la Parte Vieja. Solo abren cuando se acaba la tortilla. Una experiencia única e irrepetible que debes vivir.",
        location: "Donostia - Parte Vieja",
        imageUrl: logoBarNestor,
        mapUrl: "https://maps.google.com/?q=Bar+Nestor+Donostia",
        rating: 3
      },
      {
        name: "Gandarias",
        price: "€€",
        specialties: "Gilda, jamón ibérico, pintxos tradicionales",
        description: "Ambiente auténtico donostiarra. El mejor jamón ibérico y pintxos tradicionales en el corazón de la Parte Vieja con historia.",
        location: "Donostia - Parte Vieja",
        imageUrl: logoGandarias,
        mapUrl: "https://maps.google.com/?q=Gandarias+Donostia",
        rating: 2
      },
      {
        name: "Atari",
        price: "€€",
        specialties: "Pintxos innovadores, txakoli",
        description: "Pintxos modernos con técnicas vanguardistas. Perfecto maridaje con txakoli en ambiente joven y dinámico de la Parte Vieja.",
        location: "Donostia - Parte Vieja",
        imageUrl: logoAtari,
        mapUrl: "https://maps.google.com/?q=Atari+Donostia",
        rating: 2
      }
    ]
  },
  "pescados-mariscos": {
    title: "Pescados & Mariscos",
    emoji: "🌊",
    description: "Los mejores sabores del mar cantábrico en Gipuzkoa.",
    restaurants: [
      {
        name: "Elkano",
        price: "€€€€",
        specialties: "Rodaballo a la brasa, pescados del Cantábrico",
        description: "El templo del rodaballo en Getaria. Pedro Arregui ha perfeccionado la técnica de la brasa para pescados. Una experiencia única con vistas al mar.",
        location: "Getaria",
        imageUrl: logoElkano,
        mapUrl: "https://maps.google.com/?q=Elkano+Getaria",
        rating: 3
      },
      {
        name: "Kaia Kaipe",
        price: "€€€",
        specialties: "Pescados frescos, mariscos del día",
        description: "En el puerto de Getaria, pescado fresco directo de las barcas. Ambiente marinero auténtico con vistas espectaculares al Cantábrico.",
        location: "Getaria",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Kaia+Kaipe+Getaria",
        rating: 3
      },
      {
        name: "Mayflower",
        price: "€€€",
        specialties: "Pescados a la plancha, kokotxas",
        description: "Restaurante familiar en el puerto de San Sebastián. Especialistas en kokotxas al pil pil y pescados frescos de la bahía donostiarra.",
        location: "Donostia",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Mayflower+Donostia",
        rating: 2
      },
      {
        name: "Txuleta",
        price: "€€€",
        specialties: "Besugo, lubina, mariscos",
        description: "En el casco viejo de San Sebastián. Pescados selectos y mariscos de primera calidad en ambiente tradicional vasco auténtico.",
        location: "Donostia - Parte Vieja",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Txuleta+Donostia",
        rating: 2
      },
      {
        name: "Ni Neu",
        price: "€€€€",
        specialties: "Pescados de roca, mariscos premium",
        description: "Alta cocina marinera en Hondarribia. Mikel Gallo transforma los pescados del Cantábrico en obras de arte culinarias excepcionales.",
        location: "Hondarribia",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Ni+Neu+Hondarribia",
        rating: 3
      }
    ]
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
        description: "Templo de la carne en Tolosa donde la tradición y calidad se unen. Carne siempre en la maduración perfecta para una experiencia única e inolvidable.",
        location: "Tolosa",
        mapUrl: "https://maps.google.com/?q=Asador+Nicolas+Tolosa",
        imageUrl: logoAsadorNicolas,
        rating: 3
      },
      {
        name: "Casa Julian",
        price: "€€€",
        specialties: "Pimientos de piquillo y chuleton",
        description: "El segundo templo de la carne en Tolosa y parada obligatoria. Tradición familiar con chuletones excepcionales y pimientos de piquillo únicos.",
        location: "Tolosa",
        mapUrl: "https://maps.google.com/?q=Casa+Julian+Tolosa",
        imageUrl: logoCasaJulian,
        rating: 3
      },
      {
        name: "Maun Grill bar",
        price: "€€€",
        specialties: "Chuleta",
        description: "Excelente chuleta en el mercado de San Martín de San Sebastián. Ambiente auténtico con carnes de primera calidad perfectamente preparadas.",
        location: "Donostia",
        mapUrl: "https://maps.google.com/?q=Maun+Grill+Bar+Donostia",
        rating: 2
      },
      {
        name: "David Yarnoz - Martín Berasategui",
        price: "€€€€",
        specialties: "Carnes premium, I+D",
        description: "Jefe de partida de carnes en Martín Berasategui Lasarte. 11 años con Martín y su equipo, responsable de I+D y creación de nuevos platos. Dedicado al trabajo duro, disciplina y constancia.",
        location: "Lasarte",
        age: 29,
        category: "Joven Talento"
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
        description: "Auténtica experiencia de sidrería tradicional vasca con menú completo. Ambiente familiar y sidra de la mejor calidad en entorno natural único.",
        location: "Usúrbil",
        mapUrl: "https://maps.app.goo.gl/vrzeNMdZ1M2L8EhP9?g_st=ic"
      },
      {
        name: "Zabala Sagardotegia",
        price: "€€",
        specialties: "menú sidrería",
        description: "Tradición y calidad en cada sorbo de sidra natural. Experiencia sidrería completa con menú tradicional vasco en ambiente familiar acogedor.",
        location: "Aduna",
        mapUrl: "https://maps.app.goo.gl/PuZtCkTVp6wjTca16?g_st=ic"
      },
      {
        name: "Lizeaga Sagardotegia",
        price: "€€",
        specialties: "menú sidrería",
        description: "Experiencia auténtica en el corazón de Gipuzkoa con tradición familiar. Sidrería con ambiente tradicional y productos de primera calidad.",
        location: "Martutene",
        mapUrl: "https://maps.app.goo.gl/WGFSzf3cN38xji3g8?g_st=ic"
      },
      {
        name: "Zelaia Sagardotegia",
        price: "€€",
        specialties: "menú sidrería",
        description: "Tradición familiar en un entorno incomparable rodeado de naturaleza. Sidrería auténtica con sidra natural y menú tradicional vasco completo.",
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
        description: "Chefs jóvenes especializados en producto de mercado y temporada. Cocina moderna con estrella Michelin en ambiente contemporáneo y creativo único.",
        location: "Tolosa",
        mapUrl: "https://maps.app.goo.gl/batHyFFoDRaHtHRA9?g_st=ic",
        rating: 1
      },
      {
        name: "Arrea",
        price: "€€€",
        specialties: "menú degustación, 1 ⭐️ Michelin",
        description: "Chefs especializados en producto de mercado y caza, antiguos dueños de 'A Fuego Negro'. Estrella Michelin con cocina de autor excepcional.",
        location: "Kanpezu",
        mapUrl: "https://maps.app.goo.gl/SSJMPRYK4RKEsU919?g_st=ic",
        rating: 1
      },
      {
        name: "Molino de Urdaniz",
        price: "€€€",
        specialties: "menú degustación, 2 ⭐️⭐️ Michelin",
        description: "Restaurante especializado en verduras con 2 estrellas Michelin. Cocina vegetal de alta calidad en un molino histórico con ambiente único.",
        location: "Urdániz",
        mapUrl: "https://maps.app.goo.gl/fgGmZHvf5tFaF4Bw9?g_st=ic",
        rating: 2
      },
      {
        name: "Aitor López - Arzak I+D",
        price: "€€€€",
        specialties: "I+D, innovación culinaria",
        description: "Responsable de I+D en el restaurante Arzak de Donostia. Jefe de partida de carnes y pescados, ahora uno de los responsables máximos del departamento de innovación. Finalista de 'Chef Balfegó 2024'.",
        location: "Donostia",
        age: 28,
        category: "Joven Talento"
      },
      {
        name: "Marc Cussó - Mugaritz",
        price: "€€€€",
        specialties: "Alta cocina, 2 ⭐️ Michelin",
        description: "Jefe de cocina en Mugaritz, Errenteria. Formado en el restaurante de Michael Bras en París. Mugaritz mantiene 2 estrellas Michelin y récord de 15 años en el Top 10 mundial de 'The World's 50 Best Restaurants'.",
        location: "Errenteria",
        age: 29,
        category: "Joven Talento",
        rating: 2
      }
    ]
  }
};

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const getDefaultImage = (category: string) => {
    const random = Math.random();
    switch (category?.toLowerCase()) {
      case 'chef':
        return random > 0.5 ? logoArzak : logoEtxebarri;
      case 'joven talento':
        return logoEtxebarri;
      case 'tradicional':
        return logoBarNestor;
      case 'txakoli':
      case 'viticultor':
        return logoTxominEtxaniz;
      case 'vegetariano':
      case 'vegano':
        return logoAtari;
      case 'pintxos':
        return random > 0.5 ? logoGandarias : logoAtari;
      case 'carne':
      case 'carnes':
        return random > 0.5 ? logoAsadorNicolas : logoCasaJulian;
      case 'pescado':
      case 'mariscos':
        return logoElkano;
      case 'sidreria':
        return logoBarNestor;
      default:
        return random > 0.6 ? logoArzak : random > 0.3 ? logoEtxebarri : logoBarNestor;
    }
  };

  const restaurantImage = restaurant.imageUrl || getDefaultImage(restaurant.category || '');
  
  const renderStars = () => {
    if (restaurant.rating === undefined) {
      return (
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm font-medium text-primary mr-2">Valoración Asier Sarasua:</span>
          <span className="text-lg">❓</span>
          <span className="text-xs text-muted-foreground ml-2 italic">
            (Unknown - No probado aún)
          </span>
        </div>
      );
    }
    if (restaurant.rating === 0) return null;
    return (
      <div className="flex items-center gap-1 mb-2">
        <span className="text-sm font-medium text-primary mr-2">Valoración Asier Sarasua:</span>
        <span className="text-xs text-muted-foreground ml-1 italic">(Calidad-Precio-Sabor)</span>
        <div className="flex gap-1 ml-2">
          {Array.from({ length: restaurant.rating }, (_, i) => (
            <span key={i} className="text-primary text-lg">🥄</span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-2 italic">
          ({restaurant.rating}/3 cucharas)
        </span>
      </div>
    );
  };

  const renderAge = () => {
    if (!restaurant.age) return null;
    return (
      <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
        {restaurant.age} años
      </Badge>
    );
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-500 glassmorphism border-0 overflow-hidden">
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurantImage} 
          alt={`${restaurant.name} - ${restaurant.specialties}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-2">
            {renderAge()}
            {restaurant.rating && (
              <div className="bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                <span className="text-xs font-medium text-white">AS</span>
                {Array.from({ length: restaurant.rating }, (_, i) => (
                  <span key={i} className="text-white text-sm">🥄</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary self-start">
              {restaurant.price}
            </Badge>
            {restaurant.rating && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                  SELLO ASIER SARASUA
                </span>
              </div>
            )}
          </div>
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
          
        </div>

        {/* Google Maps Link */}
        {restaurant.mapUrl && (
          <div className="mt-4">
            <a 
              href={restaurant.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              Ver en Google Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
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