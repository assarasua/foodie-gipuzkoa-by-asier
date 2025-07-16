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
  mapUrl?: string;
  rating?: number;
  age?: number;
  category?: string;
}

interface CategoryData {
  title: string;
  emoji: string;
  description: string;
  restaurants: Restaurant[];
}

const categoriesData: Record<string, CategoryData> = {
  "jovenes-talentos": {
    title: "Jóvenes Talentos",
    emoji: "🌟",
    description: "Los 100 Jóvenes Talentos de la Gastronomía del Basque Culinary Center. Profesionales menores de 30 años que están transformando la gastronomía vasca.",
    restaurants: [
      {
        name: "Gorka Rico - Ama",
        price: "€€€",
        specialties: "Cocina de mercado y temporada",
        description: "Jefe de cocina y copropietario del Ama de Tolosa. Reconocido con 2 'Soles' de Guía Repsol, la 'T de Oro' de 'Tapas Magazine' 2023, 'Restaurante Recomendado' en la Guía Michelin, premio 'Cocineros Revelación' de Madrid Fusión 2023.",
        location: "Tolosa",
        age: 28,
        category: "Chef"
      },
      {
        name: "Somos Bakery",
        price: "€€",
        specialties: "Café, repostería y cocina",
        description: "Copropietaria de Somos Bakery en Donostia, cafetería de especialidad donde el café, la repostería y la cocina son los tres pilares del proyecto. Trabajamos con los mejores productores y proveedores del sector.",
        location: "Donostia",
        age: 27,
        category: "Cafetería"
      },
      {
        name: "Galparsoro Okindegia",
        price: "€",
        specialties: "Panadería artesanal",
        description: "Nueva generación de la emblemática panadería Galparsoso de la Parte Vieja donostiarra. Maestro panadero formado en Francia, número uno de su promoción en el Instituto Nacional de Panadería de Normandía.",
        location: "Donostia - Parte Vieja",
        age: 26,
        category: "Panadería"
      },
      {
        name: "Quesos Ixidro",
        price: "€€",
        specialties: "Queso Idiazábal artesanal",
        description: "Pastor y maestro quesero en Lazkao. Mantiene la tradición en la elaboración del queso de oveja latxa con denominación Artzai Gazta Idiazabal Baserrikoa. En verano sube a la sierra de Aralar con las ovejas.",
        location: "Lazkao",
        age: 25,
        category: "Quesería"
      },
      {
        name: "Caserío Arriatzu",
        price: "€€",
        specialties: "Productos de caserío",
        description: "Hernaniarra, agricultora y ganadera, cuarta generación en el caserío Arriatzu que adapta la tradición a los nuevos tiempos. Venta directa y contacto cercano con los clientes.",
        location: "Hernani",
        age: 29,
        category: "Baserritarra"
      },
      {
        name: "Paul Arguinzoniz - Etxebarri",
        price: "€€€€",
        specialties: "Sala y sumillería",
        description: "Hijo de Bittor Arginzoniz, forma parte del equipo de sala y sumillería de Asador Etxebarri en Axpe. Especializado en el mundo del vino bajo la tutela de Mohamed Ben Abdallah.",
        location: "Axpe (Bizkaia)",
        age: 24,
        category: "Sumiller"
      },
      {
        name: "Trike Koffe Roasters",
        price: "€€",
        specialties: "Café especialidad",
        description: "Copropietaria en Vitoria, dedicada al mundo del café desde la semilla hasta la taza. Proyecto pequeño con esencia e identidad, enfocado en calidad y sabor.",
        location: "Vitoria",
        age: 28,
        category: "Café"
      },
      {
        name: "Gloop - Cubiertos Comestibles",
        price: "€€",
        specialties: "Innovación sostenible",
        description: "Cofundadora de startup foodtech en Bilbao que crea cubiertos comestibles como solución sostenible al plástico de un solo uso. Colaboran con marcas como Iberostar y Mahou.",
        location: "Bilbao",
        age: 27,
        category: "Innovación"
      },
      {
        name: "CookPlay Design",
        price: "€€",
        specialties: "Menaje innovador",
        description: "Marca vasca de menaje con propuestas innovadoras presentes en restaurantes de alto nivel. Diseño sostenible con libertad creativa, responsable del desarrollo de nuevos productos.",
        location: "Bizkaia",
        age: 26,
        category: "Diseño"
      },
      {
        name: "Chocolate Academy Barcelona",
        price: "€€€",
        specialties: "Pastelería de élite",
        description: "Chef pastelero donostiarra que trabaja en Chocolate Academy de Barcelona. Ha trabajado con la élite de la pastelería mundial y realiza proyectos en medios y demostraciones.",
        location: "Barcelona (origen Donostia)",
        age: 28,
        category: "Pastelería"
      },
      {
        name: "Bodega Área - Pequeños Viticultores",
        price: "€€€",
        specialties: "Vinos autóctonos",
        description: "Viticultor nacido en Labastida. Elaboraciones que reflejan filosofía de respeto al carácter autóctono. Vinos reconocidos por críticos importantes del mundo del vino.",
        location: "Labastida",
        age: 29,
        category: "Viticultor"
      },
      {
        name: "Bodegas Artadi",
        price: "€€€",
        specialties: "Coordinación vinícola",
        description: "Coordinadora y gestora en Laguardia. Empezó en finanzas y asumió mercados de exportación. Ejerce como coordinadora mientras continúa con labores comerciales.",
        location: "Laguardia",
        age: 27,
        category: "Gestión Vinícola"
      },
      {
        name: "Bodegas Quintana",
        price: "€€€",
        specialties: "Enología artesanal",
        description: "Viticultor, cosechero y enólogo. Tras formarse en el extranjero, regresó en 2020 con nuevas referencias y la culminación de su proyecto vitivinícola con parcelario exclusivo.",
        location: "Rioja Alavesa",
        age: 28,
        category: "Enólogo"
      },
      {
        name: "El Paladar by Zuriñe García",
        price: "€€€",
        specialties: "Cocina creativa",
        description: "Cocinera en hotel Puente Colgante de Portugalete. Trabaja con un equipo que le permite experimentar libremente. Ha encontrado su segunda casa en la cocina.",
        location: "Portugalete",
        age: 26,
        category: "Chef"
      },
      {
        name: "Rodrigo Gallego - Martín Berasategui",
        price: "€€€€",
        specialties: "Servicio de sala premium",
        description: "Segundo maitre de Martín Berasategui en Lasarte. Licenciado en Gastronomía por Universidad de las Américas, con prácticas internacionales en Estados Unidos en cocina y servicio.",
        location: "Lasarte",
        age: 29,
        category: "Maitre"
      }
    ]
  },
  "vegetarianos": {
    title: "Vegetarianos",
    emoji: "🌱",
    description: "Opciones vegetarianas y veganas innovadoras en Gipuzkoa. Cocina verde de alta calidad.",
    restaurants: [
      {
        name: "Green Garden",
        price: "€€",
        specialties: "Cocina vegana creativa",
        description: "Restaurante 100% vegano con propuestas innovadoras usando productos locales y de temporada. Menú que cambia semanalmente.",
        location: "Donostia"
      },
      {
        name: "Verdura & Co",
        price: "€€",
        specialties: "Vegetariano gourmet",
        description: "Cocina vegetariana de alta calidad con influencias mediterráneas y vascas. Especialistas en verduras de proximidad.",
        location: "Tolosa"
      },
      {
        name: "Plant Based Pintxos",
        price: "€",
        specialties: "Pintxos veganos",
        description: "Los mejores pintxos vegetarianos y veganos de la Parte Vieja. Innovación en cada bocado sin renunciar al sabor.",
        location: "Donostia - Parte Vieja"
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
        description: "Una de las txakolindegis más prestigiosas de Getaria. Txakoli elaborado con uvas Hondarrabi Zuri siguiendo métodos tradicionales.",
        location: "Getaria",
        mapUrl: "https://goo.gl/maps/txominexample"
      },
      {
        name: "Gaintza",
        price: "€€",
        specialties: "Txakoli premium",
        description: "Txakolindegia familiar en las colinas de Getaria. Vinos frescos y afrutados con carácter atlántico único.",
        location: "Getaria",
        mapUrl: "https://goo.gl/maps/gaintzaexample"
      },
      {
        name: "Ameztoi",
        price: "€€",
        specialties: "Txakoli ecológico",
        description: "Producción ecológica de txakoli con métodos sostenibles. Uno de los txakolis más reconocidos internacionalmente.",
        location: "Getaria",
        mapUrl: "https://goo.gl/maps/ameztoiexample"
      },
      {
        name: "Rezabal",
        price: "€€",
        specialties: "Txakoli artesanal",
        description: "Pequeña txakolindegia artesanal que mantiene la tradición familiar. Txakoli con personalidad propia y carácter único.",
        location: "Zarauz",
        mapUrl: "https://goo.gl/maps/rezabalexample"
      }
    ]
  },
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

  const renderAge = () => {
    if (!restaurant.age) return null;
    return (
      <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
        {restaurant.age} años
      </Badge>
    );
  };

  return (
    <Card className="group hover:shadow-hover transition-all duration-300 bg-gradient-card border-0">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-foreground group-hover:text-primary transition-colors">
            {restaurant.name}
          </CardTitle>
          <div className="flex gap-2">
            {renderAge()}
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {restaurant.price}
            </Badge>
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