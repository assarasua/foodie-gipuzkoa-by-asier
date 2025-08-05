import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';

export const LanguageToggle = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-1 shadow-lg">
        <div className="flex gap-1">
          <Button
            variant={language === 'es' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('es')}
            className="text-xs font-medium"
          >
            ES
          </Button>
          <Button
            variant={language === 'en' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('en')}
            className="text-xs font-medium"
          >
            EN
          </Button>
        </div>
      </div>
    </div>
  );
};