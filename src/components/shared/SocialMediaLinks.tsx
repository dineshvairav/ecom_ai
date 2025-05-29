import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SocialMediaLinks({ className }: { className?: string }) {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <div className={`flex space-x-3 ${className}`}>
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          asChild
          aria-label={link.name}
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            <link.icon className="h-5 w-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}
