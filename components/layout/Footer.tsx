import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Shield,
  Award,
  Clock,
  Heart,
} from "lucide-react";
import Button from "../ui/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-padding py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">
                Curtainry
              </h2>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm leading-relaxed">
                Transforming homes with premium curtains and expert services.
              </p>

              {/* Social Media - Mobile First */}
              <div className="md:hidden">
                <h4 className="font-medium mb-3 text-sm">Follow Us</h4>
                <div className="flex gap-2">
                  <SocialIcon
                    href="#"
                    icon={<Facebook className="h-4 w-4" />}
                  />
                  <SocialIcon
                    href="#"
                    icon={<Instagram className="h-4 w-4" />}
                  />
                  <SocialIcon href="#" icon={<Twitter className="h-4 w-4" />} />
                  <SocialIcon
                    href="#"
                    icon={<Linkedin className="h-4 w-4" />}
                  />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
                Quick Links
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <FooterLink href="/">Home</FooterLink>
                </li>
                <li>
                  <FooterLink href="/products">Products</FooterLink>
                </li>
                <li>
                  <FooterLink href="/services">Services</FooterLink>
                </li>
                <li>
                  <FooterLink href="/companies">Companies</FooterLink>
                </li>
                <li className="hidden md:block">
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li className="hidden md:block">
                  <FooterLink href="/blog">Design Blog</FooterLink>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
                Our Services
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <FooterLink href="/services/consultation">
                    Free Consultation
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/services/measurement">
                    Home Measurement
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/services/installation">
                    Installation
                  </FooterLink>
                </li>
                <li className="hidden md:block">
                  <FooterLink href="/services/maintenance">
                    Cleaning & Maintenance
                  </FooterLink>
                </li>
                <li className="hidden md:block">
                  <FooterLink href="/services/custom">Custom Design</FooterLink>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
                Contact & Support
              </h3>

              {/* Contact Info */}
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">+91 9876543210</p>
                    <p className="text-xs md:text-sm text-gray-400">
                      Mon-Sat, 9AM-8PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">support@curtainry.com</p>
                    <p className="text-xs md:text-sm text-gray-400">
                      24/7 Support
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media - Desktop */}
              <div className="hidden md:block">
                <h4 className="font-medium mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <SocialIcon
                    href="#"
                    icon={<Facebook className="h-5 w-5" />}
                  />
                  <SocialIcon
                    href="#"
                    icon={<Instagram className="h-5 w-5" />}
                  />
                  <SocialIcon href="#" icon={<Twitter className="h-5 w-5" />} />
                  <SocialIcon
                    href="#"
                    icon={<Linkedin className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="section-padding py-4 md:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 text-center md:text-left">
                <p>&copy; {currentYear} Curtainry. All rights reserved.</p>
                <div className="flex items-center gap-1">
                  <span>Made with</span>
                  <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500 fill-current" />
                  <span>in India</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm">
                <FooterLink href="/privacy">Privacy</FooterLink>
                <FooterLink href="/terms">Terms</FooterLink>
                <FooterLink href="/refund">Refund</FooterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
    >
      {children}
    </a>
  );
}

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
}

function SocialIcon({ href, icon }: SocialIconProps) {
  return (
    <a
      href={href}
      className="bg-gray-800 hover:bg-primary text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:transform hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}
