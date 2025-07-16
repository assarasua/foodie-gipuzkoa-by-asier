import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ChefHat, Target, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Talent {
  name: string;
  role: string;
  company: string;
  location: string;
  sector: string;
  description?: string;
}

// The complete list of 100 young talents from Basque Culinary Center 2024
const jovenesTalentos: Talent[] = [
  {
    name: "Taborda, Catarina",
    role: "Senior Food Designer",
    company: "REMY Robotics",
    location: "Barcelona",
    sector: "start-ups"
  },
  {
    name: "Baccon, Francesca",
    role: "Maître",
    company: "Quique Dacosta Restaurante",
    location: "Alicante",
    sector: "restauracion"
  },
  {
    name: "Bernabé Calderón, Juan Bosco",
    role: "Jefe de producción y eventos",
    company: "DSTAgE",
    location: "Madrid",
    sector: "restauracion"
  },
  {
    name: "Labayru Lavandero, Jasone",
    role: "Cocinera",
    company: "El Paladar by Zuriñe García",
    location: "Bizkaia",
    sector: "restauracion"
  },
  {
    name: "Civettini, Andrea",
    role: "Bartender",
    company: "Paradiso",
    location: "Barcelona",
    sector: "sector-del-vino"
  },
  {
    name: "Moreira, Nacho",
    role: "Chef",
    company: "La Esquina de Valentina",
    location: "A Coruña",
    sector: "restauracion"
  },
  {
    name: "Cantallops, Maira",
    role: "Maître",
    company: "Montbar",
    location: "Barcelona",
    sector: "restauracion"
  },
  {
    name: "Arguinzoniz, Paul",
    role: "Equipo de sala y sumiller",
    company: "Asador Etxebarri",
    location: "Bizkaia",
    sector: "restauracion"
  },
  {
    name: "Príncipe, Juan",
    role: "Viticultor y comunicador",
    company: "Bodega César Principe",
    location: "Valladolid",
    sector: "sector-del-vino"
  },
  {
    name: "Mato, Miguel Ángel",
    role: "Fundador",
    company: "Bodega Al Galope",
    location: "La Rioja",
    sector: "sector-del-vino"
  },
  {
    name: "Clot, Marta",
    role: "Creadora de contenido",
    company: "La Marta Clot",
    location: "Barcelona",
    sector: "comunicacion"
  },
  {
    name: "De Luca, Alba",
    role: "Jefa de cocina",
    company: "Restaurante Deluca",
    location: "Málaga",
    sector: "restauracion"
  },
  {
    name: "Hernández Galarraga, David",
    role: "Supervisor",
    company: "Smoked Room",
    location: "Madrid",
    sector: "restauracion"
  },
  {
    name: "Suárez, Juan Miguel",
    role: "Cofundador",
    company: "AgroSuárez",
    location: "Almería",
    sector: "productor"
  },
  {
    name: "Loza, Álvaro",
    role: "Fundador, viticultor y elaborador",
    company: "Alvaro Loza Viticultor",
    location: "La Rioja",
    sector: "sector-del-vino"
  },
  {
    name: "Mondéjar, Jaime",
    role: "Jefe de cocina",
    company: "Restaurante Barro",
    location: "Ávila",
    sector: "restauracion"
  },
  {
    name: "Fafián, Tania",
    role: "Apicultora y fundadora",
    company: "Mel Os Catro Ventos",
    location: "Pontevedra",
    sector: "productor"
  },
  {
    name: "Sancho, Silvia",
    role: "Creadora de contenido",
    company: "Foodichii",
    location: "Madrid",
    sector: "comunicacion"
  },
  {
    name: "Hidalgo, Alfonso David",
    role: "Fundador",
    company: "Taller Góngora Cerámica",
    location: "Jaén",
    sector: "otros-perfiles"
  },
  {
    name: "Ballesteros Martínez, Ignacio",
    role: "International Trade Marketing & Product Specialist",
    company: "Europastry",
    location: "España",
    sector: "otros-perfiles"
  },
  {
    name: "Fernández Morales, Clara",
    role: "Investigadora",
    company: "Libre Foods",
    location: "Barcelona",
    sector: "start-ups"
  },
  {
    name: "García, Nerea",
    role: "Cofundadora",
    company: "Mad Wine",
    location: "Madrid",
    sector: "sector-del-vino"
  },
  {
    name: "Cabrera, Tomás",
    role: "Jefe de I+D y Producción",
    company: "Circular Powder",
    location: "Barcelona",
    sector: "start-ups"
  },
  {
    name: "Oliva, Frederic",
    role: "Head Sommelier",
    company: "Enigma",
    location: "Barcelona",
    sector: "sector-del-vino"
  },
  {
    name: "Roquero, Sara",
    role: "Responsable de desarrollo de producto y comunicación",
    company: "CookPlay",
    location: "Bizkaia",
    sector: "otros-perfiles"
  },
  {
    name: "Llorens Merelo, Alejandro",
    role: "Adjunto a operaciones",
    company: "Ricard Camarena Restaurante",
    location: "Valencia",
    sector: "otros-perfiles"
  },
  {
    name: "Puigvert Puigdevall, Carlota",
    role: "Cocinera y segunda generación",
    company: "Les Cols",
    location: "Girona",
    sector: "restauracion"
  },
  {
    name: "Sastre, Jorge",
    role: "Cocinero y cofundador",
    company: "Sartoria Panatieri, Brabo y Molla",
    location: "Barcelona",
    sector: "restauracion"
  },
  {
    name: "Villaseca, María Magdalena",
    role: "Diseñadora Gastronómica",
    company: "MM Studio & Funky Bakers",
    location: "Barcelona / Copenhague",
    sector: "otros-perfiles"
  },
  {
    name: "Megías, Cristina",
    role: "Head of Production & Development",
    company: "Noma Projects",
    location: "Copenhague",
    sector: "investigacion"
  },
  {
    name: "Shen, Ken",
    role: "Creadora de contenido",
    company: "Cocina con Coqui",
    location: "Madrid",
    sector: "comunicacion"
  },
  {
    name: "García, Erika",
    role: "Ganadera y Quesera",
    company: "Dehesa de los Llanos",
    location: "Albacete",
    sector: "productor"
  },
  {
    name: "Egea, María",
    role: "Jefa de Sala, sumiller y copropietaria",
    company: "Frases",
    location: "Murcia",
    sector: "restauracion"
  },
  {
    name: "Joher, Dana",
    role: "Propietaria",
    company: "AVE Pasteleria Artesanal",
    location: "Gran Canaria",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Rico, Gorka",
    role: "Jefe de Cocina y copropietario",
    company: "AMA Tolosa",
    location: "Gipuzkoa",
    sector: "restauracion"
  },
  {
    name: "Serra Nilsson, Ingrid",
    role: "Pastelera",
    company: "I+Desserts",
    location: "Barcelona",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Ruiz, Jorge",
    role: "Jefe de Cocina y Pastelería",
    company: "Vandelvira",
    location: "Jaén",
    sector: "restauracion"
  },
  {
    name: "Pagano, Antonia",
    role: "Jefa de cocina",
    company: "Mediamanga y Montbar",
    location: "Barcelona",
    sector: "restauracion"
  },
  {
    name: "Alcaide, Adrián",
    role: "Cocreador y copresentador",
    company: "Podcast La Picaeta",
    location: "Valencia",
    sector: "comunicacion"
  },
  {
    name: "Méndez, Jorge",
    role: "Productor y segunda generación",
    company: "Bodegas Vinatigo",
    location: "Santa Cruz de Tenerife",
    sector: "sector-del-vino"
  },
  {
    name: "Galparsoro, Aitor",
    role: "Panadero",
    company: "Galparsoro",
    location: "Gipuzkoa",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Moreno, Ricard",
    role: "Director de marketing",
    company: "Bumerang",
    location: "Barcelona",
    sector: "start-ups"
  },
  {
    name: "Arenzana, Lucía",
    role: "Fundadora",
    company: "Luk Beer",
    location: "Madrid",
    sector: "sector-del-vino"
  },
  {
    name: "Oyanguren, Ainhoa",
    role: "Copropietaria",
    company: "Trike Koffee Roasters",
    location: "Álava",
    sector: "otros-perfiles"
  },
  {
    name: "Garrido, Juan",
    role: "Cofundador y COO",
    company: "Breadfree",
    location: "Navarra",
    sector: "start-ups"
  },
  {
    name: "De la Rosa, José",
    role: "Fundador",
    company: "Fermented Freelance",
    location: "Huelva",
    sector: "investigacion"
  },
  {
    name: "Aspas, Carlos",
    role: "Fundador",
    company: "Trufas La finesse",
    location: "Teruel",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Misut Molina, Francisco Manuel",
    role: "Jefe de partida de postres",
    company: "El Celler de Can Roca",
    location: "Girona",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Touceda, Alejandra",
    role: "Doctoranda",
    company: "Basque Culinary Center / Harvard",
    location: "Gipuzkoa / Cambridge",
    sector: "investigacion"
  },
  {
    name: "Catalán Cases, Pablo",
    role: "Sumiller y barman",
    company: "Lasarte",
    location: "Barcelona",
    sector: "sector-del-vino"
  },
  {
    name: "Camps, Martí",
    role: "Jefe de cocina",
    company: "Mugaritz",
    location: "Gipuzkoa",
    sector: "restauracion"
  },
  {
    name: "Cano Figueira, Esperança",
    role: "Segunda de cocina",
    company: "Restaurante el Xato i Cristina Figueira",
    location: "Alicante",
    sector: "restauracion"
  },
  {
    name: "Martín Minguélez, José María",
    role: "Cofundador e investigador",
    company: "CHACINO (Universidad de Extremadura)",
    location: "Cáceres",
    sector: "investigacion"
  },
  {
    name: "Sukia, Iker",
    role: "Pastor y maestro quesero",
    company: "Quesos Ixidro",
    location: "Gipuzkoa",
    sector: "productor"
  },
  {
    name: "Zeberio, Ane",
    role: "Productora",
    company: "Caserío Arriatzu",
    location: "Gipuzkoa",
    sector: "productor"
  },
  {
    name: "Sua, Aitor",
    role: "Jefe de cocina y copropietario",
    company: "Trèsde",
    location: "Madrid",
    sector: "restauracion"
  },
  {
    name: "Subías, Arnau",
    role: "Biólogo marino",
    company: "Estimar",
    location: "Barcelona",
    sector: "investigacion"
  },
  {
    name: "Ferrón, Adrián",
    role: "Sumiller",
    company: "Restaurante Lera",
    location: "Zamora",
    sector: "sector-del-vino"
  },
  {
    name: "De Haro Soler, Ángela",
    role: "Directora de Operaciones",
    company: "Cooking Numbers",
    location: "Barcelona",
    sector: "otros-perfiles"
  },
  {
    name: "Herreros, Arlette",
    role: "Control de sala y sumillería",
    company: "Umma / Bena Santander",
    location: "Cantabria",
    sector: "sector-del-vino"
  },
  {
    name: "Morales, Francisco",
    role: "Responsable de impresión 3D",
    company: "Noor",
    location: "Córdoba",
    sector: "otros-perfiles"
  },
  {
    name: "Córnago, Lander",
    role: "Responsable de I+D",
    company: "Arzak",
    location: "Gipuzkoa",
    sector: "restauracion"
  },
  {
    name: "Quintana, Alain",
    role: "Viticultor, cosechero y enólogo",
    company: "Bodegas Quintana",
    location: "Álava",
    sector: "sector-del-vino"
  },
  {
    name: "Sánchez Manzano, Jesús",
    role: "Jefe de Cocina",
    company: "Casa San Marcial",
    location: "Asturias",
    sector: "restauracion"
  },
  {
    name: "Kupervaser, Denise",
    role: "Directora de Calidad y Sostenibilidad",
    company: "Casa Montaña",
    location: "Valencia",
    sector: "otros-perfiles"
  },
  {
    name: "Romeo, Elena",
    role: "Investigadora",
    company: "BCC Innovation",
    location: "Gipuzkoa",
    sector: "investigacion"
  },
  {
    name: "Elorriaga, Ander",
    role: "Gestión",
    company: "Azurmendi",
    location: "Bizkaia",
    sector: "otros-perfiles"
  },
  {
    name: "Maccarone, Vicky",
    role: "Directora y copropietaria",
    company: "Alapar",
    location: "Barcelona",
    sector: "restauracion"
  },
  {
    name: "Rábade, Erlinda",
    role: "Jefa de sala",
    company: "Toki (Grupo Marcos Granda)",
    location: "Madrid",
    sector: "restauracion"
  },
  {
    name: "Tracchia, Graziano",
    role: "Chef pastry",
    company: "DiverXO",
    location: "Madrid",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Juez Martínez, María",
    role: "Coordinadora de innovación",
    company: "Makro Innovación",
    location: "Madrid",
    sector: "otros-perfiles"
  },
  {
    name: "López García, Elio",
    role: "Cofundador y CEO",
    company: "Innogando",
    location: "Lugo",
    sector: "start-ups"
  },
  {
    name: "Santamaría, Sergio",
    role: "Propietario",
    company: "La Mesedora",
    location: "Valencia",
    sector: "restauracion"
  },
  {
    name: "Rivera Contreras, Ninitzen",
    role: "Segunda de cocina y jefa de pastelería",
    company: "Bardal",
    location: "Málaga",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Mateo, Ignasi",
    role: "I+D",
    company: "Investigador independiente",
    location: "Cádiz",
    sector: "investigacion"
  },
  {
    name: "López de Lacalle, Patricia",
    role: "Gestión y segunda generación",
    company: "Bodegas Artadi",
    location: "Álava",
    sector: "sector-del-vino"
  },
  {
    name: "Berbegall, Iván",
    role: "Marinero en barco de artes menores",
    company: "Barco Verge del Rebollet",
    location: "Valencia",
    sector: "productor"
  },
  {
    name: "Aguiar, Alba",
    role: "Chef y copropietaria",
    company: "D'Leria",
    location: "Pontevedra",
    sector: "restauracion"
  },
  {
    name: "Cruz, Adrià",
    role: "Cofundador",
    company: "B3tter",
    location: "Girona",
    sector: "start-ups"
  },
  {
    name: "Linares, Pablo",
    role: "Jefe de cocina y pastelero",
    company: "Restaurante OBA",
    location: "Albacete",
    sector: "restauracion"
  },
  {
    name: "Jurado, Javier",
    role: "Jefe de cocina y copropietario",
    company: "Malak",
    location: "Jaén",
    sector: "restauracion"
  },
  {
    name: "García Lamas, Mauro",
    role: "Jefe de cocina y restaurant manager",
    company: "Amós",
    location: "Madrid",
    sector: "restauracion"
  },
  {
    name: "Ruiz Lafita, Lucía",
    role: "Fundadora",
    company: "Catering Delirium",
    location: "Madrid",
    sector: "otros-perfiles"
  },
  {
    name: "Ruiz, Óscar",
    role: "Jefe de partida",
    company: "Martín Berasategui",
    location: "Gipuzkoa",
    sector: "restauracion"
  },
  {
    name: "Castro, Laura",
    role: "Directora de cuentas",
    company: "Agencia de comunicación Brava",
    location: "Valencia",
    sector: "comunicacion"
  },
  {
    name: "Gutiérrez, Lucía",
    role: "Chef y copropietaria",
    company: "Lur",
    location: "Madrid",
    sector: "restauracion"
  },
  {
    name: "Valencia, Martín",
    role: "Segundo maître",
    company: "Martín Berasategui",
    location: "Gipuzkoa",
    sector: "restauracion"
  },
  {
    name: "Arrate, Paula",
    role: "Copropietaria",
    company: "Somos Bakery",
    location: "Gipuzkoa",
    sector: "pasteleria-panaderia"
  },
  {
    name: "García, Diego",
    role: "Investigador y activista; presentador y guionista",
    company: "HBOMax \"Zero Waste Chef\"",
    location: "Madrid",
    sector: "comunicacion"
  },
  {
    name: "Galán Corbacho, Miguel",
    role: "Gerente y miembro de la directiva",
    company: "Fundación y Grupo Atrio",
    location: "Cáceres",
    sector: "otros-perfiles"
  },
  {
    name: "Oldenburg, Sara",
    role: "Sumiller y cofundadora",
    company: "Fondo Supper Club (catering)",
    location: "Madrid",
    sector: "otros-perfiles"
  },
  {
    name: "Rebollo, Mónica",
    role: "Pastelera",
    company: "Desde 1911",
    location: "Madrid",
    sector: "pasteleria-panaderia"
  },
  {
    name: "García Quintana, Koldo",
    role: "Viticultor",
    company: "Bodega Área Pequeña Viticultores",
    location: "Álava",
    sector: "sector-del-vino"
  },
  {
    name: "Gómez, Vero",
    role: "Creadora de contenido, fundadora de la 'despensa online' COL y chef privada",
    company: "COL y Vero Gómez",
    location: "Madrid",
    sector: "comunicacion"
  },
  {
    name: "Ciaurriz, Adrián",
    role: "Pastelero",
    company: "Chocolate Academy",
    location: "Barcelona",
    sector: "pasteleria-panaderia"
  },
  {
    name: "Jordán, Iris",
    role: "Jefa de cocina y copropietaria",
    company: "Ansils",
    location: "Huesca",
    sector: "restauracion"
  },
  {
    name: "Sánchez, Andoni",
    role: "Jefe de cocina y segunda generación",
    company: "Villa de Fromista",
    location: "Palencia",
    sector: "restauracion"
  },
  {
    name: "Beltrán, Juan",
    role: "Cofundador y CEO",
    company: "The Hype",
    location: "Madrid",
    sector: "restauracion"
  },
  {
    name: "Seguí, Antonio",
    role: "Agricultor, ganadero y socio",
    company: "SOT Son Jover",
    location: "Baleares",
    sector: "productor"
  },
  {
    name: "Maneja, Marta",
    role: "Cofundadora y socia",
    company: "Gloop",
    location: "Bizkaia",
    sector: "start-ups"
  }
];

const TalentCard = ({ talent }: { talent: Talent }) => {
  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'restauracion':
        return <ChefHat className="h-5 w-5 text-orange-500" />;
      case 'sector-del-vino':
        return <span className="text-purple-500">🍷</span>;
      case 'pasteleria-panaderia':
        return <span className="text-yellow-500">🍰</span>;
      case 'comunicacion':
        return <span className="text-blue-500">📱</span>;
      case 'start-ups':
        return <span className="text-green-500">🚀</span>;
      case 'investigacion':
        return <span className="text-indigo-500">🔬</span>;
      case 'productor':
        return <span className="text-green-600">🌾</span>;
      case 'otros-perfiles':
        return <span className="text-gray-500">💼</span>;
      default:
        return <Target className="h-5 w-5 text-primary" />;
    }
  };

  const getSectorName = (sector: string) => {
    switch (sector) {
      case 'restauracion': return 'Restauración';
      case 'sector-del-vino': return 'Vino y Bebidas';
      case 'pasteleria-panaderia': return 'Pastelería/Panadería';
      case 'comunicacion': return 'Comunicación';
      case 'start-ups': return 'Start-ups';
      case 'investigacion': return 'Investigación';
      case 'productor': return 'Productor';
      case 'otros-perfiles': return 'Otros Perfiles';
      default: return sector;
    }
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 glassmorphism border-0 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {talent.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              {getSectorIcon(talent.sector)}
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                {getSectorName(talent.sector)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-start gap-3">
          <Target className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {talent.role}
            </p>
            <p className="text-sm text-muted-foreground">
              {talent.company}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" />
          <span className="text-sm text-muted-foreground">
            {talent.location}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
            <Calendar className="h-3 w-3 mr-1" />
            ≤ 30 años
          </Badge>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
              BCC 2024
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const JovenesTalentos = () => {
  const navigate = useNavigate();

  // Group talents by sector for better organization
  const groupedTalents = jovenesTalentos.reduce((acc, talent) => {
    if (!acc[talent.sector]) {
      acc[talent.sector] = [];
    }
    acc[talent.sector].push(talent);
    return acc;
  }, {} as Record<string, Talent[]>);

  const sectorStats = Object.entries(groupedTalents).map(([sector, talents]) => ({
    sector,
    count: talents.length,
    name: {
      'restauracion': 'Restauración',
      'sector-del-vino': 'Vino y Bebidas',
      'pasteleria-panaderia': 'Pastelería/Panadería',
      'comunicacion': 'Comunicación',
      'start-ups': 'Start-ups',
      'investigacion': 'Investigación',
      'productor': 'Productores',
      'otros-perfiles': 'Otros Perfiles'
    }[sector] || sector
  })).sort((a, b) => b.count - a.count);

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
            <div className="text-6xl mb-4">🌟</div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              100 Jóvenes Talentos 2024
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              Los profesionales menores de 30 años que están transformando la gastronomía. 
              Reconocidos por el Basque Culinary Center por su contribución positiva a la cadena de valor gastronómica.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {sectorStats.map(({ sector, count, name }) => (
                <Badge key={sector} variant="secondary" className="bg-primary/10 text-primary px-3 py-1">
                  {name}: {count}
                </Badge>
              ))}
            </div>

            <div className="bg-primary/5 rounded-lg p-4 inline-block">
              <h3 className="text-lg font-semibold text-foreground mb-2">Criterios de Selección</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>1.</strong> Tener 30 años o menos</p>
                <p><strong>2.</strong> Contribuir positivamente a la cadena de valor gastronómica</p>
                <p><strong>3.</strong> No haber formado parte de ediciones anteriores</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Todos los Talentos ({jovenesTalentos.length})
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jovenesTalentos.map((talent, index) => (
            <TalentCard key={index} talent={talent} />
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Basque Culinary Center
            </h3>
            <p className="text-muted-foreground mb-4">
              Centro de investigación e innovación gastronómica de la Universidad de Mondragon
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Paseo Juan Avelino Barriola, 101</p>
              <p>20009 Donostia, Gipuzkoa</p>
              <p>+34 943 574 500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};