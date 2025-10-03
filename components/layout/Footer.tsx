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
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="section-padding py-12">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with Latest Designs
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get exclusive access to new collections, design tips, and special
              offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Curtainry
              </h2>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Transforming homes with premium curtains, expert consultation,
                and seamless installation services. Your one-stop solution for
                all curtain needs.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>100% Secure & Trusted</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>Premium Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
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
                <li>
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/blog">Design Blog</FooterLink>
                </li>
                <li>
                  <FooterLink href="/careers">Careers</FooterLink>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
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
                    Professional Installation
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/services/maintenance">
                    Cleaning & Maintenance
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/services/repair">
                    Repair Services
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/services/custom">Custom Design</FooterLink>
                </li>
                <li>
                  <FooterLink href="/ar">AR Visualization</FooterLink>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact & Support</h3>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">+91 9876543210</p>
                    <p className="text-sm text-gray-400">Mon-Sat, 9AM-8PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">support@curtainry.com</p>
                    <p className="text-sm text-gray-400">24/7 Email Support</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Bangalore, Karnataka</p>
                    <p className="text-sm text-gray-400">
                      Available across major cities
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
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
        <div className="section-padding py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                <p>&copy; {currentYear} Curtainry. All rights reserved.</p>
                <div className="flex items-center gap-1">
                  <span>Made with</span>
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                  <span>in India</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/refund">Refund Policy</FooterLink>
                <FooterLink href="/sitemap">Sitemap</FooterLink>
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
