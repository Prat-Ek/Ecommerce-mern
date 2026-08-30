import { Icon } from "@iconify/react";
import Link from "next/link";


export default function Footer() {
  return (
   <footer className="bg-gray-800 text-white py-12 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">SHOPHUB</h3>
                <p className="text-gray-400">Your one-stop shop for the latest fashion trends and styles.</p>
            </div>
            <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
                    <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link></li>
                    <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-300">Shop</Link></li>
                    <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
                <ul className="space-y-2">
                    <li><Link href="/faqs" className="text-gray-400 hover:text-white transition-colors duration-300">FAQs</Link></li>
                    <li><Link href="/shipping Policy" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
                    <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">Returns & Exchanges</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-xl">
                        <Icon icon="bxl:instagram"></Icon>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-xl">
                        <Icon icon="bxl:facebook-circle"></Icon>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-xl">
                        <Icon icon ="bxl:whatsapp"></Icon>
                    </Link>
                  
                </div>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SHOPHUB. All rights reserved.</p>
        </div>
    </footer>
  )
}
