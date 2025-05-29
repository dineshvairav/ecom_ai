import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface AppLogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export function AppLogo({ className, iconSize = 32, textSize = "text-3xl" }: AppLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <Sparkles 
        className="text-primary group-hover:text-accent transition-colors duration-300" 
        size={iconSize} 
        aria-hidden="true" 
      />
      <span className={`font-bold ${textSize} text-foreground group-hover:text-primary transition-colors duration-300`}>
        VisualVest
      </span>
    </Link>
  );
}
