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
    
    
    // Food Category Card
    'category.card.discover': 'Descubrir',
    
    // Category Page
    'category.back': 'Volver al Inicio',
    'category.asierRating': 'Valoración Asier Sarasua:',
    'category.qualityPrice': '(Calidad-Precio-Sabor)',
    'category.spoons': 'cucharas',
    'category.unknownRating': '(Unknown - No probado aún)',
    'category.youngTalent': 'Joven Talento',
    'category.years': 'años',
    'category.viewLocation': 'Ver Ubicación',
    'category.viewWebsite': 'Visitar Web',
    'category.price': 'Precio',
    'category.specialties': 'Especialidades',
    'category.location': 'Ubicación',
    
    // NotFound Page
    'notFound.title': '404',
    'notFound.message': '¡Ops! Página no encontrada',
    'notFound.returnHome': 'Volver al Inicio',
    
    // Young Talents Page
    'talents.title': '100 Jóvenes Talentos de la Gastronomía Española 2024',
    'talents.subtitle': 'Seleccionados por el Basque Culinary Center',
    'talents.description': 'Descubre a los 100 profesionales menores de 30 años que están transformando la gastronomía española según el prestigioso Basque Culinary Center. Una nueva generación de talento que marca el futuro de nuestra cocina.',
    'talents.filterAll': 'Todos',
    'talents.filterRestaurant': 'Restauración',
    'talents.filterWine': 'Sector del Vino',
    'talents.filterBakery': 'Pastelería/Panadería',
    'talents.filterProducer': 'Productores',
    'talents.filterCommunication': 'Comunicación',
    'talents.filterStartups': 'Start-ups',
    'talents.filterResearch': 'Investigación',
    'talents.filterOthers': 'Otros Perfiles',
    'talents.searchPlaceholder': 'Buscar por nombre, empresa o ubicación...',
    'talents.clearSearch': 'Limpiar búsqueda',
    'talents.resultsFound': 'talentos encontrados',
    'talents.noResults': 'No se encontraron talentos que coincidan con tu búsqueda.',
    'talents.backButton': 'Volver al Inicio',
    
    // Restaurant Categories Translations
    'restaurant.vegetarians': 'Vegetarianos',
    'restaurant.txakolindegis': 'Txakolindegis',
    'restaurant.pintxos': 'Pintxos Donosti',
    'restaurant.fishSeafood': 'Pescados & Mariscos',
    'restaurant.meats': 'Carnes',
    'restaurant.ciderHouse': 'Sidrería',
    'restaurant.unknownStars': 'Estrellas Desconocidas',
    
    // Bonus Section
    'bonus.title': 'Sección Bonus: 100 Jóvenes Talentos 2024',
    'bonus.description': 'Descubre los 100 profesionales menores de 30 años que están transformando la gastronomía según el Basque Culinary Center en toda España',
    'bonus.button': 'Ver los 100 Talentos ✨',
    
    // Footer
    'footer.description': 'Guía gastronómica apasionada por los sabores auténticos del País Vasco 🇪🇸',
    'footer.copyright': '© 2024 Gipuzkoa Foodie. Hecho con ❤️ en Euskadi',
    
    // Restaurant Data Translations
    'restaurant.greenGarden.name': 'Green Garden',
    'restaurant.greenGarden.description': 'Restaurante 100% vegano con propuestas innovadoras usando productos locales y de temporada. Menú cambia semanalmente con creaciones únicas.',
    'restaurant.verduraCo.name': 'Verdura & Co',
    'restaurant.verduraCo.description': 'Cocina vegetariana de alta calidad con influencias mediterráneas y vascas. Especialistas en verduras de proximidad y mercado local.',
    'restaurant.plantBasedPintxos.name': 'Plant Based Pintxos',
    'restaurant.plantBasedPintxos.description': 'Los mejores pintxos vegetarianos y veganos de la Parte Vieja. Innovación en cada bocado sin renunciar al sabor tradicional vasco.',
    
    'restaurant.txominEtxaniz.description': 'Una de las txakolindegis más prestigiosas de Getaria. Txakoli elaborado con uvas Hondarrabi Zuri siguiendo métodos tradicionales vascos.',
    'restaurant.gaintza.description': 'Txakolindegia familiar en las colinas de Getaria. Vinos frescos y afrutados con carácter atlántico único y personalidad propia.',
    'restaurant.ameztoi.description': 'Producción ecológica de txakoli con métodos sostenibles. Uno de los txakolis más reconocidos internacionalmente por su calidad.',
    'restaurant.rezabal.description': 'Pequeña txakolindegia artesanal que mantiene la tradición familiar. Txakoli con personalidad propia y carácter único excepcional.',
    
    'restaurant.cucharaSanTelmo.description': 'Pionero en la renovación del pintxo tradicional. Cada creación es una obra de arte en miniatura con sabores intensos y únicos.',
    'restaurant.barNestor.description': 'El templo de la tortilla en la Parte Vieja. Solo abren cuando se acaba la tortilla. Una experiencia única e irrepetible que debes vivir.',
    'restaurant.gandarias.description': 'Ambiente auténtico donostiarra. El mejor jamón ibérico y pintxos tradicionales en el corazón de la Parte Vieja con historia.',
    'restaurant.atari.description': 'Pintxos modernos con técnicas vanguardistas. Perfecto maridaje con txakoli en ambiente joven y dinámico de la Parte Vieja.',
    
    'restaurant.elkano.description': 'El templo del rodaballo en Getaria. Pedro Arregui ha perfeccionado la técnica de la brasa para pescados. Una experiencia única con vistas al mar.',
    'restaurant.kaiaKaipe.description': 'En el puerto de Getaria, pescado fresco directo de las barcas. Ambiente marinero auténtico con vistas espectaculares al Cantábrico.',
    'restaurant.mayflower.description': 'Restaurante familiar en el puerto de San Sebastián. Especialistas en kokotxas al pil pil y pescados frescos de la bahía donostiarra.',
    'restaurant.txuleta.description': 'En el casco viejo de San Sebastián. Pescados selectos y mariscos de primera calidad en ambiente tradicional vasco auténtico.',
    'restaurant.niNeu.description': 'Alta cocina marinera en Hondarribia. Mikel Gallo transforma los pescados del Cantábrico en obras de arte culinarias excepcionales.',
    
    'restaurant.asadorNicolas.description': 'Templo de la carne en Tolosa donde la tradición y calidad se unen. Carne siempre en la maduración perfecta para una experiencia única e inolvidable.',
    'restaurant.casaJulian.description': 'El segundo templo de la carne en Tolosa y parada obligatoria. Tradición familiar con chuletones excepcionales y pimientos de piquillo únicos.',
    'restaurant.maunGrill.description': 'Excelente chuleta en el mercado de San Martín de San Sebastián. Ambiente auténtico con carnes de primera calidad perfectamente preparadas.',
    'restaurant.davidYarnoz.description': 'Jefe de partida de carnes en Martín Berasategui Lasarte. 11 años con Martín y su equipo, responsable de I+D y creación de nuevos platos. Dedicado al trabajo duro, disciplina y constancia.',
    
    'restaurant.saizar.description': 'Auténtica experiencia de sidrería tradicional vasca con menú completo. Ambiente familiar y sidra de la mejor calidad en entorno natural único.',
    'restaurant.zabala.description': 'Tradición y calidad en cada sorbo de sidra natural. Experiencia sidrería completa con menú tradicional vasco en ambiente familiar acogedor.',
    'restaurant.lizeaga.description': 'Experiencia auténtica en el corazón de Gipuzkoa con tradición familiar. Sidrería con ambiente tradicional y productos de primera calidad.',
    'restaurant.zelaia.description': 'Tradición familiar en un entorno incomparable rodeado de naturaleza. Sidrería auténtica con sidra natural y menú tradicional vasco completo.',
    
    'restaurant.ama.description': 'Chefs jóvenes especializados en producto de mercado y temporada. Cocina moderna con estrella Michelin en ambiente contemporáneo y creativo único.',
    'restaurant.arrea.description': 'Chefs especializados en producto de mercado y caza, antiguos dueños de \'A Fuego Negro\'. Estrella Michelin con cocina de autor excepcional.',
    'restaurant.molinoUrdaniz.description': 'Restaurante especializado en verduras con 2 estrellas Michelin. Cocina vegetal de alta calidad en un molino histórico con ambiente único.',
    'restaurant.aitorLopez.description': 'Responsable de I+D en el restaurante Arzak de Donostia. Jefe de partida de carnes y pescados, ahora uno de los responsables máximos del departamento de innovación. Finalista de \'Chef Balfegó 2024\'.',
    'restaurant.marcCusso.description': 'Jefe de cocina en Mugaritz, Errenteria. Formado en el restaurante de Michael Bras en París. Mugaritz mantiene 2 estrellas Michelin y récord de 15 años en el Top 10 mundial de \'The World\'s 50 Best Restaurants\'.',
    
    // Specialties translations
    'specialty.veganCuisine': 'Cocina vegana creativa',
    'specialty.vegetarianGourmet': 'Vegetariano gourmet',
    'specialty.veganPintxos': 'Pintxos veganos',
    'specialty.traditionalTxakoli': 'Txakoli tradicional',
    'specialty.premiumTxakoli': 'Txakoli premium',
    'specialty.organicTxakoli': 'Txakoli ecológico',
    'specialty.artisanTxakoli': 'Txakoli artesanal',
    'specialty.creativePintxos': 'Pintxos creativos, foie micuit',
    'specialty.tortillaTomato': 'Tortilla de patatas, tomate con anchoa',
    'specialty.gildaJamon': 'Gilda, jamón ibérico, pintxos tradicionales',
    'specialty.innovativePintxos': 'Pintxos innovadores, txakoli',
    'specialty.turbot': 'Rodaballo a la brasa, pescados del Cantábrico',
    'specialty.freshFish': 'Pescados frescos, mariscos del día',
    'specialty.grilledFish': 'Pescados a la plancha, kokotxas',
    'specialty.seaBream': 'Besugo, lubina, mariscos',
    'specialty.rockFish': 'Pescados de roca, mariscos premium',
    'specialty.peppersChuleton': 'Pimientos de piquillo y chuleton',
    'specialty.chuleta': 'Chuleta',
    'specialty.premiumMeats': 'Carnes premium, I+D',
    'specialty.ciderMenu': 'menú sidrería',
    'specialty.tastingMenu1Star': 'menú degustación, 1 ⭐️ Michelin',
    'specialty.tastingMenu2Stars': 'menú degustación, 2 ⭐️⭐️ Michelin',
    'specialty.rdInnovation': 'I+D, innovación culinaria',
    'specialty.hauteCuisine2Stars': 'Alta cocina, 2 ⭐️ Michelin',
    
    // Category coming soon message
    'category.comingSoon': 'Próximamente disponible',
    'category.comingSoonDesc': 'Estamos trabajando en esta categoría para traerte los mejores restaurantes.'
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
    
    
    // Food Category Card
    'category.card.discover': 'Discover',
    
    // Category Page
    'category.back': 'Back to Home',
    'category.asierRating': 'Asier Sarasua Rating:',
    'category.qualityPrice': '(Quality-Price-Flavor)',
    'category.spoons': 'spoons',
    'category.unknownRating': '(Unknown - Not tried yet)',
    'category.youngTalent': 'Young Talent',
    'category.years': 'years old',
    'category.viewLocation': 'View Location',
    'category.viewWebsite': 'Visit Website',
    'category.price': 'Price',
    'category.specialties': 'Specialties',
    'category.location': 'Location',
    
    // NotFound Page
    'notFound.title': '404',
    'notFound.message': 'Oops! Page not found',
    'notFound.returnHome': 'Return to Home',
    
    // Young Talents Page
    'talents.title': '100 Young Talents of Spanish Gastronomy 2024',
    'talents.subtitle': 'Selected by the Basque Culinary Center',
    'talents.description': 'Discover the 100 professionals under 30 who are transforming Spanish gastronomy according to the prestigious Basque Culinary Center. A new generation of talent that marks the future of our cuisine.',
    'talents.filterAll': 'All',
    'talents.filterRestaurant': 'Restaurant',
    'talents.filterWine': 'Wine Sector',
    'talents.filterBakery': 'Bakery/Pastry',
    'talents.filterProducer': 'Producers',
    'talents.filterCommunication': 'Communication',
    'talents.filterStartups': 'Start-ups',
    'talents.filterResearch': 'Research',
    'talents.filterOthers': 'Other Profiles',
    'talents.searchPlaceholder': 'Search by name, company, or location...',
    'talents.clearSearch': 'Clear search',
    'talents.resultsFound': 'talents found',
    'talents.noResults': 'No talents found matching your search.',
    'talents.backButton': 'Back to Home',
    
    // Restaurant Categories Translations
    'restaurant.vegetarians': 'Vegetarian',
    'restaurant.txakolindegis': 'Txakolindegis',
    'restaurant.pintxos': 'Pintxos Donosti',
    'restaurant.fishSeafood': 'Fish & Seafood',
    'restaurant.meats': 'Meats',
    'restaurant.ciderHouse': 'Cider House',
    'restaurant.unknownStars': 'Unknown Stars',
    
    // Bonus Section
    'bonus.title': 'Bonus Section: 100 Young Talents 2024',
    'bonus.description': 'Discover the 100 professionals under 30 who are transforming gastronomy according to the Basque Culinary Center throughout Spain',
    'bonus.button': 'View the 100 Talents ✨',
    
    // Footer
    'footer.description': 'Gastronomic guide passionate about the authentic flavors of the Basque Country 🇪🇸',
    'footer.copyright': '© 2024 Gipuzkoa Foodie. Made with ❤️ in Euskadi',
    
    // Restaurant Data Translations
    'restaurant.greenGarden.name': 'Green Garden',
    'restaurant.greenGarden.description': '100% vegan restaurant with innovative proposals using local and seasonal products. Menu changes weekly with unique creations.',
    'restaurant.verduraCo.name': 'Verdura & Co',
    'restaurant.verduraCo.description': 'High-quality vegetarian cuisine with Mediterranean and Basque influences. Specialists in local and seasonal vegetables.',
    'restaurant.plantBasedPintxos.name': 'Plant Based Pintxos',
    'restaurant.plantBasedPintxos.description': 'The best vegetarian and vegan pintxos in the Old Town. Innovation in every bite without giving up traditional Basque flavor.',
    
    'restaurant.txominEtxaniz.description': 'One of the most prestigious txakolindegis in Getaria. Txakoli made with Hondarrabi Zuri grapes following traditional Basque methods.',
    'restaurant.gaintza.description': 'Family txakolindegia in the hills of Getaria. Fresh and fruity wines with unique Atlantic character and personality.',
    'restaurant.ameztoi.description': 'Organic txakoli production with sustainable methods. One of the most internationally recognized txakolis for its quality.',
    'restaurant.rezabal.description': 'Small artisanal txakolindegia that maintains family tradition. Txakoli with its own personality and exceptional unique character.',
    
    'restaurant.cucharaSanTelmo.description': 'Pioneer in the renovation of traditional pintxo. Each creation is a miniature work of art with intense and unique flavors.',
    'restaurant.barNestor.description': 'The temple of tortilla in the Old Town. They only open when the tortilla runs out. A unique and unrepeatable experience you must live.',
    'restaurant.gandarias.description': 'Authentic Donosti atmosphere. The best Iberian ham and traditional pintxos in the heart of the Old Town with history.',
    'restaurant.atari.description': 'Modern pintxos with avant-garde techniques. Perfect pairing with txakoli in a young and dynamic atmosphere in the Old Town.',
    
    'restaurant.elkano.description': 'The temple of turbot in Getaria. Pedro Arregui has perfected the grilling technique for fish. A unique experience with sea views.',
    'restaurant.kaiaKaipe.description': 'In the port of Getaria, fresh fish directly from the boats. Authentic marine atmosphere with spectacular views of the Cantabrian Sea.',
    'restaurant.mayflower.description': 'Family restaurant in the port of San Sebastian. Specialists in kokotxas al pil pil and fresh fish from the Donosti bay.',
    'restaurant.txuleta.description': 'In the old town of San Sebastian. Select fish and premium seafood in authentic traditional Basque atmosphere.',
    'restaurant.niNeu.description': 'High marine cuisine in Hondarribia. Mikel Gallo transforms Cantabrian fish into exceptional culinary works of art.',
    
    'restaurant.asadorNicolas.description': 'Temple of meat in Tolosa where tradition and quality unite. Meat always in perfect aging for a unique and unforgettable experience.',
    'restaurant.casaJulian.description': 'The second temple of meat in Tolosa and obligatory stop. Family tradition with exceptional steaks and unique piquillo peppers.',
    'restaurant.maunGrill.description': 'Excellent steak in the San Martin market in San Sebastian. Authentic atmosphere with perfectly prepared first-quality meats.',
    'restaurant.davidYarnoz.description': 'Head of meat section at Martín Berasategui Lasarte. 11 years with Martín and his team, responsible for R&D and creation of new dishes. Dedicated to hard work, discipline and perseverance.',
    
    'restaurant.saizar.description': 'Authentic traditional Basque cider house experience with complete menu. Family atmosphere and the best quality cider in unique natural surroundings.',
    'restaurant.zabala.description': 'Tradition and quality in every sip of natural cider. Complete cider house experience with traditional Basque menu in cozy family atmosphere.',
    'restaurant.lizeaga.description': 'Authentic experience in the heart of Gipuzkoa with family tradition. Cider house with traditional atmosphere and first-quality products.',
    'restaurant.zelaia.description': 'Family tradition in incomparable surroundings surrounded by nature. Authentic cider house with natural cider and complete traditional Basque menu.',
    
    'restaurant.ama.description': 'Young chefs specialized in market and seasonal products. Modern cuisine with Michelin star in unique contemporary and creative atmosphere.',
    'restaurant.arrea.description': 'Chefs specialized in market products and game, former owners of \'A Fuego Negro\'. Michelin star with exceptional signature cuisine.',
    'restaurant.molinoUrdaniz.description': 'Restaurant specialized in vegetables with 2 Michelin stars. High-quality plant cuisine in a historic mill with unique atmosphere.',
    'restaurant.aitorLopez.description': 'Head of R&D at Arzak restaurant in Donostia. Head of meat and fish section, now one of the main managers of the innovation department. Finalist of \'Chef Balfegó 2024\'.',
    'restaurant.marcCusso.description': 'Head chef at Mugaritz, Errenteria. Trained at Michael Bras restaurant in Paris. Mugaritz maintains 2 Michelin stars and record of 15 years in the Top 10 worldwide of \'The World\'s 50 Best Restaurants\'.',
    
    // Specialties translations
    'specialty.veganCuisine': 'Creative vegan cuisine',
    'specialty.vegetarianGourmet': 'Gourmet vegetarian',
    'specialty.veganPintxos': 'Vegan pintxos',
    'specialty.traditionalTxakoli': 'Traditional txakoli',
    'specialty.premiumTxakoli': 'Premium txakoli',
    'specialty.organicTxakoli': 'Organic txakoli',
    'specialty.artisanTxakoli': 'Artisan txakoli',
    'specialty.creativePintxos': 'Creative pintxos, foie micuit',
    'specialty.tortillaTomato': 'Potato tortilla, tomato with anchovy',
    'specialty.gildaJamon': 'Gilda, Iberian ham, traditional pintxos',
    'specialty.innovativePintxos': 'Innovative pintxos, txakoli',
    'specialty.turbot': 'Grilled turbot, Cantabrian fish',
    'specialty.freshFish': 'Fresh fish, seafood of the day',
    'specialty.grilledFish': 'Grilled fish, kokotxas',
    'specialty.seaBream': 'Sea bream, sea bass, seafood',
    'specialty.rockFish': 'Rock fish, premium seafood',
    'specialty.peppersChuleton': 'Piquillo peppers and steak',
    'specialty.chuleta': 'Steak',
    'specialty.premiumMeats': 'Premium meats, R&D',
    'specialty.ciderMenu': 'cider house menu',
    'specialty.tastingMenu1Star': 'tasting menu, 1 ⭐️ Michelin',
    'specialty.tastingMenu2Stars': 'tasting menu, 2 ⭐️⭐️ Michelin',
    'specialty.rdInnovation': 'R&D, culinary innovation',
    'specialty.hauteCuisine2Stars': 'Haute cuisine, 2 ⭐️ Michelin',
    
    // Category coming soon message
    'category.comingSoon': 'Coming Soon',
    'category.comingSoonDesc': 'We are working on this category to bring you the best restaurants.'
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