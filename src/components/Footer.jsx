export function Footer() {
  const logo = 'gis_logo.png'; 

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#2D0A31]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-white text-sm">
              Copyright © {new Date().getFullYear()} Leilani&apos;s imagination
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="GIS Logo" 
              className="w-5 h-6 rounded"
            />
            <span className="text-white text-sm">
              Get In Shape
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;