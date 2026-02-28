import { Heart, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center border-t border-white/10 bg-slate-950 px-4 py-8 text-center">
      {/* Logos */}
      <div className="mb-4 flex items-center gap-4">
        <Image
          src="/logos/texplo.png"
          alt="Texplo logo"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <a
          href="https://mookambigai.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
        >
          <Image
            src="/logos/mce-logo-2-og.png"
            alt="MCE logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        </a>
      </div>

      <p className="text-sm text-slate-400">
        &copy; {new Date().getFullYear()} TEXPLO Committee. All rights reserved.
      </p>
      <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
        Made with <Heart className="h-3 w-3 text-red-400" /> by Sairam M (Dept
        of IT)
      </p>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
        <MapPin className="h-3 w-3 shrink-0" />
        Mookambigai College of Engineering, Srinivasa Nagar, Kalamavur,
        Pudukkottai &ndash; 622 502.
      </p>
    </footer>
  );
}
