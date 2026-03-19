import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            MyShop
          </h2>
          <p className="text-sm">
            Best place to buy quality products online. Fast delivery and
            trusted service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Customer Service
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              Shipping Policy
            </li>
            <li className="hover:text-white cursor-pointer">
              Return Policy
            </li>
            <li className="hover:text-white cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-white cursor-pointer">
              Support
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">

            <FaFacebook className="hover:text-white cursor-pointer" />

            <FaInstagram className="hover:text-white cursor-pointer" />

            <FaTwitter className="hover:text-white cursor-pointer" />

          </div>
        </div>

      </div>

      {/* Bottom Footer */}

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2026 MyShop. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;