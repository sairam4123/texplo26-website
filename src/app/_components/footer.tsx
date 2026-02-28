import { Heart, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center border-t border-white/10 bg-slate-950 px-4 py-8 text-center">
      <p className="text-sm text-slate-400">
        &copy; {new Date().getFullYear()} TEXPLO Committee. All rights reserved.
      </p>
      <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
        Made with <Heart className="h-3 w-3 text-red-400" /> by Sairam M (Dept
        of IT)
      </p>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
        <MapPin className="h-3 w-3 shrink-0" />
        Mookambigai College of Engineering, Keeranur, Pudukkottai &ndash;
        622502.
      </p>
    </footer>
  );
}
