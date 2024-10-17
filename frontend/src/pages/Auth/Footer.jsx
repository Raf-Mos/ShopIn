
const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ShopIn</h3>
              <p>Providing quality products since 2024</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-indigo-400">Home</a></li>
                <li><a href="/shop" className="hover:text-indigo-400">Products</a></li>
                <li><a href="/about-us" className="hover:text-indigo-400">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>ShopIn LLC, Casablnaca | Morocco, 30000</p>
              <p>Email: info@shopIn.com</p>
              <p>Phone: (+212) 0661-6161</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 ShopIn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
