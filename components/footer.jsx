import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#F3F4F6] dark:bg-[#1E1E1E] py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-[#2464EA]">
              FitCoach
            </Link>
            <p className="text-[#A0A4A8] mt-2 text-sm">Empowering fitness professionals worldwide</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A4A8] hover:text-[#2464EA] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A4A8] hover:text-[#2464EA] transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A4A8] hover:text-[#2464EA] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A4A8] hover:text-[#2464EA] transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-[#A0A4A8] text-sm">
          <p>&copy; {new Date().getFullYear()} FitCoach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
