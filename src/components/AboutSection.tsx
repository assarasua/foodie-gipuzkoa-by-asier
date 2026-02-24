import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from '@/contexts/TranslationContext';

export const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphism border border-border/30 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src="/images/asier-profile.png"
                    alt="Asier Sarasua"
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-primary/20 shadow-elegant"
                  />
                  <div className="absolute -bottom-1 -right-1 text-2xl md:text-3xl">👨‍🍳</div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4 traditional-text">
                  {t('about.title')}
                </h2>
                
                <div className="space-y-4 text-muted-foreground font-body">
                  <p className="text-base md:text-lg leading-relaxed">
                    <strong className="text-foreground">Asier Sarasua</strong> {t('about.description1')}
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    {t('about.description2')}
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    {t('about.quote')}
                  </p>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {t('about.badge1')}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {t('about.badge2')}
                  </span>
                  <span className="px-3 py-1 bg-basque-green/10 text-basque-green rounded-full text-sm font-medium">
                    {t('about.badge3')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
