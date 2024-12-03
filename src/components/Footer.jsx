export function Footer() {
  const logo = 'gis_beige487.png'; 

  return (
    <footer className="bg-[#2D0A31] mt-auto">
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
              className="h-4 w-auto object-contain"
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