import { MapPin, Phone, Mail } from 'lucide-react';

export function ContactInfo({ className }: { className?: string }) {
  return (
    <div className={`space-y-3 text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        <span>123 VisualVest St, Innovation City, VC 45678</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-primary" />
        <span>(123) 456-7890</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-primary" />
        <span>contact@visualvest.com</span>
      </div>
    </div>
  );
}
