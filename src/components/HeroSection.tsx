const sanSebastianImage = "/lovable-uploads/7c182f6b-c1b0-4ee0-96b1-8b702df96d01.png";

export const HeroSection = () => {
  return (
    <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sanSebastianImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl animate-float">👨‍🍳</span>
            <span className="text-6xl animate-float" style={{ animationDelay: '1s' }}>🍤</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl font-semibold mb-6 text-white traditional-text">
            Gipuzkoa Foodie
          </h1>
          
          <h2 className="font-heading text-2xl md:text-3xl font-normal italic mb-8 text-white/90">
            by Asier Sarasua
          </h2>
          
          <p className="font-body text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Descubre los mejores sabores del País Vasco. 
            Una guía gastronómica auténtica por Gipuzkoa.
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};