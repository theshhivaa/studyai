import { Dog, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import ScoobyAvatarSVG from "@/components/ui/ScoobyAvatarSVG";

export default function Footer() {
  return (
    <footer className="bg-[#0a0e1a] border-t border-white/5 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <ScoobyAvatarSVG size={24} state="idle" />
              <span className="text-xl font-bold font-orbitron tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Scooby BCA
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Your AI-powered study companion for the Bachelor of Computer Applications. Powered by Scooby 🐾
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 font-orbitron text-sm tracking-widest uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/syllabus" className="hover:text-primary transition-colors">Syllabus</Link></li>
              <li><Link href="/notes" className="hover:text-primary transition-colors">Notes Library</Link></li>
              <li><Link href="/chat" className="hover:text-primary transition-colors">Ask Scooby</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 font-orbitron text-sm tracking-widest uppercase">Resources</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 font-orbitron text-sm tracking-widest uppercase">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-muted hover:text-primary" />
              </Link>
              <Link href="#" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-muted hover:text-primary" />
              </Link>
              <Link href="#" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5 text-muted hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
          <div className="md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Scooby BCA. All rights reserved.</p>
          </div>
          <div className="md:w-1/3 text-center">
            <p>Made with ❤️ for BCA Students</p>
            <p className="font-bold tracking-widest mt-1 text-primary/80">DEVELOPED BY SHIVA PRASAD S</p>
          </div>
          <div className="hidden md:block md:w-1/3"></div>
        </div>
      </div>
    </footer>
  );
}
