const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
      .font-lora { font-family: 'Lora', Georgia, serif; }
      .font-outfit { font-family: 'Outfit', sans-serif; }
    `}</style>

    <footer
      className="font-outfit w-full py-6 px-6"
      style={{ borderTop: "1px solid #e8ecf8", background: "rgba(255,255,255,0.7)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">

        {/* Left: brand */}
        <div className="flex items-center gap-1.5 text-sm" style={{ color: "#aab2cc" }}>
          <span>Made with</span>
          <span style={{ color: "#e03131" }}>♥</span>
          <span>by</span>
          <span className="font-semibold" style={{ color: "#4c6ef5" }}>E-Cell IIT Hyderabad</span>
        </div>

        {/* Right: copyright */}
        <p className="text-xs font-light" style={{ color: "#c0c8e0" }}>
          © {new Date().getFullYear()} Startup Fair. All rights reserved.
        </p>

      </div>
    </footer>
  </>
)

export default Footer