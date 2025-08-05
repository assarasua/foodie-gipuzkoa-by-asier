import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  es: {
    // Hero Section
    'hero.subtitle': 'Descubre los mejores sabores del País Vasco.',
    'hero.description': 'Una guía gastronómica auténtica por Gipuzkoa.',
    
    // About Section
    'about.title': 'Sobre Asier Sarasua',
    'about.description1': 'Asier Sarasua es un gastronómico de paladar refinado con una experiencia excepcional en la degustación y análisis culinario. Ha visitado y evaluado los mejores restaurantes de Euskadi, Gipuzkoa y Madrid, desarrollando un conocimiento profundo de la alta gastronomía.',
    'about.description2': 'Su experiencia trasciende fronteras: con 51 países visitados, Asier ha explorado y degustado la gastronomía mundial, lo que le permite ofrecer una perspectiva única sobre la cocina vasca en el contexto gastronómico internacional. Esta experiencia global enriquece su comprensión de los sabores locales y su capacidad para identificar la excelencia culinaria.',
    'about.quote': '"La gastronomía vasca no es solo comida, es cultura, tradición y pasión", dice Asier. "Cada pintxo, cada plato, cuenta una historia de nuestro pueblo y nuestra tierra. Mi misión es compartir estos tesoros con el paladar más exigente."',
    'about.badge1': 'Paladar Refinado',
    'about.badge2': '51 Países Visitados',
    'about.badge3': 'Experto en Degustación',
    
    // Categories
    'categories.title': 'Explora Nuestras Categorías',
    'categories.subtitle': 'Cada categoría te llevará a un viaje gastronómico único por los sabores más auténticos de Gipuzkoa con valoración personal',
    
    // Food Categories
    'category.pintxos.title': 'Pintxos Donosti',
    'category.pintxos.description': 'Lo mejor de una ruta de pintxos es ir a 3-4 lugares diferentes y probar los diferentes estilos de la cocina vasca tradicional y moderna.',
    
    'category.vegetarianos.title': 'Vegetarianos',
    'category.vegetarianos.description': 'Opciones vegetarianas y veganas innovadoras en Gipuzkoa. Cocina verde de alta calidad con productos locales y de temporada únicos.',
    
    'category.txakolindegis.title': 'Txakolindegis',
    'category.txakolindegis.description': 'Las mejores txakolindegis de Gipuzkoa. Vinos blancos frescos con denominación de origen Getariako Txakolina y tradición familiar única.',
    
    'category.pescados-mariscos.title': 'Pescados & Mariscos',
    'category.pescados-mariscos.description': 'Los mejores sabores del mar cantábrico en Gipuzkoa. Pescados frescos y mariscos de primera calidad en restaurantes excepcionales.',
    
    'category.carnes.title': 'Carnes',
    'category.carnes.description': 'Los mejores chuletones y carnes de Gipuzkoa en sus templos gastronómicos. Tradición, calidad y maduración perfecta en cada bocado.',
    
    'category.sidreria.title': 'Sidrería',
    'category.sidreria.description': 'Auténticas sidrerías donde disfrutar del menú tradicional vasco. Experiencia completa con sidra natural y ambiente familiar acogedor.',
    
    'category.estrellas-desconocidas.title': 'Estrellas Desconocidas',
    'category.estrellas-desconocidas.description': 'Restaurantes con estrella Michelin y propuestas gastronómicas únicas en Gipuzkoa. Alta cocina y jóvenes talentos en un mismo lugar.',
    
    // Bonus Section
    'bonus.title': 'Sección Bonus: 100 Jóvenes Talentos 2024',
    'bonus.description': 'Descubre los 100 profesionales menores de 30 años que están transformando la gastronomía según el Basque Culinary Center en toda España',
    'bonus.button': 'Ver los 100 Talentos ✨',
    
    // Footer
    'footer.description': 'Guía gastronómica apasionada por los sabores auténticos del País Vasco 🇪🇸',
    'footer.copyright': '© 2024 Gipuzkoa Foodie. Hecho con ❤️ en Euskadi'
  },
  en: {
    // Hero Section
    'hero.subtitle': 'Discover the best flavors of the Basque Country.',
    'hero.description': 'An authentic gastronomic guide through Gipuzkoa.',
    
    // About Section
    'about.title': 'About Asier Sarasua',
    'about.description1': 'Asier Sarasua is a gastronome with a refined palate and exceptional experience in culinary tasting and analysis. He has visited and evaluated the best restaurants in Euskadi, Gipuzkoa, and Madrid, developing deep knowledge of haute cuisine.',
    'about.description2': 'His experience transcends borders: having visited 51 countries, Asier has explored and tasted global gastronomy, allowing him to offer a unique perspective on Basque cuisine in the international culinary context. This global experience enriches his understanding of local flavors and his ability to identify culinary excellence.',
    'about.quote': '"Basque gastronomy is not just food, it\'s culture, tradition, and passion," says Asier. "Every pintxo, every dish, tells a story of our people and our land. My mission is to share these treasures with the most demanding palate."',
    'about.badge1': 'Refined Palate',
    'about.badge2': '51 Countries Visited',
    'about.badge3': 'Tasting Expert',
    
    // Categories
    'categories.title': 'Explore Our Categories',
    'categories.subtitle': 'Each category will take you on a unique gastronomic journey through the most authentic flavors of Gipuzkoa with personal evaluation',
    
    // Food Categories
    'category.pintxos.title': 'Pintxos Donosti',
    'category.pintxos.description': 'The best part of a pintxos route is going to 3-4 different places and trying the different styles of traditional and modern Basque cuisine.',
    
    'category.vegetarianos.title': 'Vegetarian',
    'category.vegetarianos.description': 'Innovative vegetarian and vegan options in Gipuzkoa. High-quality green cuisine with unique local and seasonal products.',
    
    'category.txakolindegis.title': 'Txakolindegis',
    'category.txakolindegis.description': 'The best txakolindegis in Gipuzkoa. Fresh white wines with Getariako Txakolina designation of origin and unique family tradition.',
    
    'category.pescados-mariscos.title': 'Fish & Seafood',
    'category.pescados-mariscos.description': 'The best flavors of the Cantabrian Sea in Gipuzkoa. Fresh fish and premium seafood in exceptional restaurants.',
    
    'category.carnes.title': 'Meats',
    'category.carnes.description': 'The best steaks and meats from Gipuzkoa in their gastronomic temples. Tradition, quality, and perfect aging in every bite.',
    
    'category.sidreria.title': 'Cider House',
    'category.sidreria.description': 'Authentic cider houses to enjoy the traditional Basque menu. Complete experience with natural cider and cozy family atmosphere.',
    
    'category.estrellas-desconocidas.title': 'Unknown Stars',
    'category.estrellas-desconocidas.description': 'Michelin-starred restaurants and unique gastronomic proposals in Gipuzkoa. Haute cuisine and young talent in one place.',
    
    // Bonus Section
    'bonus.title': 'Bonus Section: 100 Young Talents 2024',
    'bonus.description': 'Discover the 100 professionals under 30 who are transforming gastronomy according to the Basque Culinary Center throughout Spain',
    'bonus.button': 'View the 100 Talents ✨',
    
    // Footer
    'footer.description': 'Gastronomic guide passionate about the authentic flavors of the Basque Country 🇪🇸',
    'footer.copyright': '© 2024 Gipuzkoa Foodie. Made with ❤️ in Euskadi'
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('gipuzkoa-foodie-language') as Language;
    if (saved && (saved === 'es' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('gipuzkoa-foodie-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};