import { MapPin, Phone, Mail } from 'lucide-react';

export function ContactInfo({ className }: { className?: string }) {
  const address = "123 VisualVest St, Innovation City, VC 45678";
  const googleMapsLink = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const phoneNumber = "(123) 456-7890";
  const telLink = `tel:${phoneNumber.replace(/\D/g, '')}`; // Remove non-digits for tel link

  return (
    <div className={`space-y-3 text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
          {address}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-primary" />
        <a href={telLink} className="hover:text-primary hover:underline">
          {phoneNumber}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-primary" />
        <span>contact@visualvest.com</span>
      </div>
    </div>
  );
}
