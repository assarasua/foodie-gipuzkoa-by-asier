import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ChefHat, Target, Euro, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTranslation } from '@/contexts/TranslationContext';

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
  nameKey: string;
  price: string;
  specialtyKey: string;
  descriptionKey: string;
  location: string;
  mapUrl?: string;
  rating?: number;
  age?: number;
  category?: string;
  imageUrl?: string;
}

interface CategoryData {
  titleKey: string;
  emoji: string;
  descriptionKey: string;
  restaurants: Restaurant[];
}

const categoriesData: Record<string, CategoryData> = {
  "vegetarianos": {
    titleKey: "category.vegetarianos.title",
    emoji: "🌱",
    descriptionKey: "category.vegetarianos.description",
    restaurants: [
      {
        nameKey: "restaurant.greenGarden.name",
        price: "€€",
        specialtyKey: "specialty.veganCuisine",
        descriptionKey: "restaurant.greenGarden.description",
        location: "Donostia",
        mapUrl: "https://maps.google.com/?q=Green+Garden+Donostia"
      },
      {
        nameKey: "restaurant.verduraCo.name",
        price: "€€",
        specialtyKey: "specialty.vegetarianGourmet",
        descriptionKey: "restaurant.verduraCo.description",
        location: "Tolosa",
        mapUrl: "https://maps.google.com/?q=Verdura+Co+Tolosa"
      },
      {
        nameKey: "restaurant.plantBasedPintxos.name",
        price: "€",
        specialtyKey: "specialty.veganPintxos",
        descriptionKey: "restaurant.plantBasedPintxos.description",
        location: "Donostia - Parte Vieja",
        mapUrl: "https://maps.google.com/?q=Plant+Based+Pintxos+Donostia"
      }
    ]
  },
  "txakolindegis": {
    titleKey: "category.txakolindegis.title",
    emoji: "🍇",
    descriptionKey: "category.txakolindegis.description",
    restaurants: [
      {
        nameKey: "Txomin Etxaniz",
        price: "€€",
        specialtyKey: "specialty.traditionalTxakoli",
        descriptionKey: "restaurant.txominEtxaniz.description",
        location: "Getaria",
        mapUrl: "https://maps.google.com/?q=Txomin+Etxaniz+Getaria",
        imageUrl: logoTxominEtxaniz,
        rating: 2
      },
      {
        nameKey: "Gaintza",
        price: "€€",
        specialtyKey: "specialty.premiumTxakoli",
        descriptionKey: "restaurant.gaintza.description",
        location: "Getaria",
        mapUrl: "https://maps.google.com/?q=Gaintza+Getaria"
      },
      {
        nameKey: "Ameztoi",
        price: "€€",
        specialtyKey: "specialty.organicTxakoli",
        descriptionKey: "restaurant.ameztoi.description",
        location: "Getaria",
        mapUrl: "https://maps.google.com/?q=Ameztoi+Getaria"
      },
      {
        nameKey: "Rezabal",
        price: "€€",
        specialtyKey: "specialty.artisanTxakoli",
        descriptionKey: "restaurant.rezabal.description",
        location: "Zarauz",
        mapUrl: "https://maps.google.com/?q=Rezabal+Zarauz"
      }
    ]
  },
  "pintxos": {
    titleKey: "category.pintxos.title",
    emoji: "🍤",
    descriptionKey: "category.pintxos.description",
    restaurants: [
      {
        nameKey: "La Cuchara de San Telmo",
        price: "€€",
        specialtyKey: "specialty.creativePintxos",
        descriptionKey: "restaurant.cucharaSanTelmo.description",
        location: "Donostia - Parte Vieja",
        imageUrl: logoCucharaSanTelmo,
        mapUrl: "https://maps.google.com/?q=La+Cuchara+de+San+Telmo+Donostia",
        rating: 3
      },
      {
        nameKey: "Bar Nestor",
        price: "€",
        specialtyKey: "specialty.tortillaTomato",
        descriptionKey: "restaurant.barNestor.description",
        location: "Donostia - Parte Vieja",
        imageUrl: logoBarNestor,
        mapUrl: "https://maps.google.com/?q=Bar+Nestor+Donostia",
        rating: 3
      },
      {
        nameKey: "Gandarias",
        price: "€€",
        specialtyKey: "specialty.gildaJamon",
        descriptionKey: "restaurant.gandarias.description",
        location: "Donostia - Parte Vieja",
        imageUrl: logoGandarias,
        mapUrl: "https://maps.google.com/?q=Gandarias+Donostia",
        rating: 2
      },
      {
        nameKey: "Atari",
        price: "€€",
        specialtyKey: "specialty.innovativePintxos",
        descriptionKey: "restaurant.atari.description",
        location: "Donostia - Parte Vieja",
        imageUrl: logoAtari,
        mapUrl: "https://maps.google.com/?q=Atari+Donostia",
        rating: 2
      }
    ]
  },
  "pescados-mariscos": {
    titleKey: "category.pescados-mariscos.title",
    emoji: "🌊",
    descriptionKey: "category.pescados-mariscos.description",
    restaurants: [
      {
        nameKey: "Elkano",
        price: "€€€€",
        specialtyKey: "specialty.turbot",
        descriptionKey: "restaurant.elkano.description",
        location: "Getaria",
        imageUrl: logoElkano,
        mapUrl: "https://maps.google.com/?q=Elkano+Getaria",
        rating: 3
      },
      {
        nameKey: "Kaia Kaipe",
        price: "€€€",
        specialtyKey: "specialty.freshFish",
        descriptionKey: "restaurant.kaiaKaipe.description",
        location: "Getaria",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Kaia+Kaipe+Getaria",
        rating: 3
      },
      {
        nameKey: "Mayflower",
        price: "€€€",
        specialtyKey: "specialty.grilledFish",
        descriptionKey: "restaurant.mayflower.description",
        location: "Donostia",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Mayflower+Donostia",
        rating: 2
      },
      {
        nameKey: "Txuleta",
        price: "€€€",
        specialtyKey: "specialty.seaBream",
        descriptionKey: "restaurant.txuleta.description",
        location: "Donostia - Parte Vieja",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Txuleta+Donostia",
        rating: 2
      },
      {
        nameKey: "Ni Neu",
        price: "€€€€",
        specialtyKey: "specialty.rockFish",
        descriptionKey: "restaurant.niNeu.description",
        location: "Hondarribia",
        imageUrl: seafoodImage,
        mapUrl: "https://maps.google.com/?q=Ni+Neu+Hondarribia",
        rating: 3
      }
    ]
  },
  "carnes": {
    titleKey: "category.carnes.title",
    emoji: "🐄",
    descriptionKey: "category.carnes.description",
    restaurants: [
      {
        nameKey: "Asador Nicolas",
        price: "€€€€",
        specialtyKey: "specialty.peppersChuleton",
        descriptionKey: "restaurant.asadorNicolas.description",
        location: "Tolosa",
        mapUrl: "https://maps.google.com/?q=Asador+Nicolas+Tolosa",
        imageUrl: logoAsadorNicolas,
        rating: 3
      },
      {
        nameKey: "Casa Julian",
        price: "€€€",
        specialtyKey: "specialty.peppersChuleton",
        descriptionKey: "restaurant.casaJulian.description",
        location: "Tolosa",
        mapUrl: "https://maps.google.com/?q=Casa+Julian+Tolosa",
        imageUrl: logoCasaJulian,
        rating: 3
      },
      {
        nameKey: "Maun Grill bar",
        price: "€€€",
        specialtyKey: "specialty.chuleta",
        descriptionKey: "restaurant.maunGrill.description",
        location: "Donostia",
        mapUrl: "https://maps.google.com/?q=Maun+Grill+Bar+Donostia",
        rating: 2
      },
      {
        nameKey: "David Yarnoz - Martín Berasategui",
        price: "€€€€",
        specialtyKey: "specialty.premiumMeats",
        descriptionKey: "restaurant.davidYarnoz.description",
        location: "Lasarte",
        age: 29,
        category: "Joven Talento"
      }
    ]
  },
  "sidreria": {
    titleKey: "category.sidreria.title",
    emoji: "🍎",
    descriptionKey: "category.sidreria.description",
    restaurants: [
      {
        nameKey: "Saizar Sagardotegia",
        price: "€€",
        specialtyKey: "specialty.ciderMenu",
        descriptionKey: "restaurant.saizar.description",
        location: "Usúrbil",
        mapUrl: "https://maps.app.goo.gl/vrzeNMdZ1M2L8EhP9?g_st=ic"
      },
      {
        nameKey: "Zabala Sagardotegia",
        price: "€€",
        specialtyKey: "specialty.ciderMenu",
        descriptionKey: "restaurant.zabala.description",
        location: "Aduna",
        mapUrl: "https://maps.app.goo.gl/PuZtCkTVp6wjTca16?g_st=ic"
      },
      {
        nameKey: "Lizeaga Sagardotegia",
        price: "€€",
        specialtyKey: "specialty.ciderMenu",
        descriptionKey: "restaurant.lizeaga.description",
        location: "Martutene",
        mapUrl: "https://maps.app.goo.gl/WGFSzf3cN38xji3g8?g_st=ic"
      },
      {
        nameKey: "Zelaia Sagardotegia",
        price: "€€",
        specialtyKey: "specialty.ciderMenu",
        descriptionKey: "restaurant.zelaia.description",
        location: "Hernani",
        mapUrl: "https://maps.app.goo.gl/6BG2wBwJqU6gEZSEA?g_st=ic"
      }
    ]
  },
  "estrellas-desconocidas": {
    titleKey: "category.estrellas-desconocidas.title",
    emoji: "⭐",
    descriptionKey: "category.estrellas-desconocidas.description",
    restaurants: [
      {
        nameKey: "Ama",
        price: "€€€",
        specialtyKey: "specialty.tastingMenu1Star",
        descriptionKey: "restaurant.ama.description",
        location: "Tolosa",
        mapUrl: "https://maps.app.goo.gl/batHyFFoDRaHtHRA9?g_st=ic",
        rating: 1
      },
      {
        nameKey: "Arrea",
        price: "€€€",
        specialtyKey: "specialty.tastingMenu1Star",
        descriptionKey: "restaurant.arrea.description",
        location: "Kanpezu",
        mapUrl: "https://maps.app.goo.gl/SSJMPRYK4RKEsU919?g_st=ic",
        rating: 1
      },
      {
        nameKey: "Molino de Urdaniz",
        price: "€€€",
        specialtyKey: "specialty.tastingMenu2Stars",
        descriptionKey: "restaurant.molinoUrdaniz.description",
        location: "Urdániz",
        mapUrl: "https://maps.app.goo.gl/fgGmZHvf5tFaF4Bw9?g_st=ic",
        rating: 2
      },
      {
        nameKey: "Aitor López - Arzak I+D",
        price: "€€€€",
        specialtyKey: "specialty.rdInnovation",
        descriptionKey: "restaurant.aitorLopez.description",
        location: "Donostia",
        age: 28,
        category: "Joven Talento"
      },
      {
        nameKey: "Marc Cussó - Mugaritz",
        price: "€€€€",
        specialtyKey: "specialty.hauteCuisine2Stars",
        descriptionKey: "restaurant.marcCusso.description",
        location: "Errenteria",
        age: 29,
        category: "Joven Talento",
        rating: 2
      }
    ]
  }
};

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const { t } = useTranslation();
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
          <span className="text-sm font-medium text-primary mr-2">{t('category.asierRating')}</span>
          <span className="text-lg">❓</span>
          <span className="text-xs text-muted-foreground ml-2 italic">
            {t('category.unknownRating')}
          </span>
        </div>
      );
    }
    if (restaurant.rating === 0) return null;
    return (
      <div className="flex items-center gap-1 mb-2">
        <span className="text-sm font-medium text-primary mr-2">{t('category.asierRating')}</span>
        <span className="text-xs text-muted-foreground ml-1 italic">{t('category.qualityPrice')}</span>
        <div className="flex gap-1 ml-2">
          {Array.from({ length: restaurant.rating }, (_, i) => (
            <span key={i} className="text-primary text-lg">🥄</span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-2 italic">
          ({restaurant.rating}/3 {t('category.spoons')})
        </span>
      </div>
    );
  };

  const renderAge = () => {
    if (!restaurant.age) return null;
    return (
      <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
        {restaurant.age} {t('category.years')}
      </Badge>
    );
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-500 glassmorphism border-0 overflow-hidden">
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurantImage}
          alt={t(restaurant.nameKey) || restaurant.nameKey}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">
            {t(restaurant.nameKey) || restaurant.nameKey}
          </h3>
          <div className="flex items-center gap-2">
            {restaurant.rating !== undefined && restaurant.rating > 0 && (
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
            {restaurant.category === "Joven Talento" && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                  {t('category.youngTalent')}
                </span>
                {renderAge()}
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
            <span className="font-semibold text-foreground">{t('category.specialties')}:</span> {t(restaurant.specialtyKey) || restaurant.specialtyKey}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Target className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t(restaurant.descriptionKey) || restaurant.descriptionKey}
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

        {restaurant.mapUrl && (
          <div className="mt-4">
            <a
              href={restaurant.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              {t('category.viewLocation')}
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
  const { t } = useTranslation();

  const categoryData = category ? categoriesData[category] : null;

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t('notFound.message')}</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            {t('notFound.returnHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header Section */}
      <div className="bg-gradient-accent/10 border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('category.back')}
          </Button>

          <div className="text-center">
            <div className="text-6xl mb-4">{categoryData.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t(categoryData.titleKey)}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t(categoryData.descriptionKey)}
            </p>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
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
              {t('category.comingSoon')}
            </h3>
            <p className="text-muted-foreground">
              {t('category.comingSoonDesc')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};