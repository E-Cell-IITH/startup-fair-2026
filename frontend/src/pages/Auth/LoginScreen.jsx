import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"

const TrendIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <polyline points="4,32 16,18 24,24 40,10" stroke="#3b5bdb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="32,10 40,10 40,18" stroke="#3b5bdb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function LoginScreen() {

  const navigate = useNavigate()

  const handleLogin = async (credentialResponse) => {
    try {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          "id_token": credentialResponse.credential
        })
      })


      if (!response.ok) {
        alert("Login Failed")
        return
      }


      navigate("/startups")

    } catch (error) {

      console.error("Login error:", error)
      alert("Login Failed")

    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Outfit:wght@300;400;500&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp 0.5s ease both; }
        .anim-2 { animation: fadeUp 0.5s 0.08s ease both; }
        .anim-3 { animation: fadeUp 0.5s 0.16s ease both; }
        .anim-4 { animation: fadeUp 0.5s 0.24s ease both; }
        .anim-5 { animation: fadeUp 0.5s 0.32s ease both; }
        .google-btn:hover { border-color: #c5cfe8; box-shadow: 0 4px 20px rgba(90,105,180,0.12); transform: translateY(-1px); }
        .google-btn:active { transform: translateY(0); }
        .google-btn { transition: all 0.2s ease; }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(145deg, #e9ecf8 0%, #dce2f4 55%, #e6eaf7 100%)" }}
      >

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #a5b4fc, transparent)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #818cf8, transparent)", filter: "blur(60px)" }} />
        </div>

        <div className="relative w-full mx-4" style={{ maxWidth: "420px" }}>
          <div
            className="bg-white rounded-2xl text-center"
            style={{
              padding: "52px 44px 44px",
              boxShadow: "0 8px 48px rgba(80,100,200,0.10), 0 1px 4px rgba(80,100,200,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >

            <div className="flex justify-center mb-5 anim-1">
              <TrendIcon />
            </div>

            <h1 className="font-lora text-3xl font-bold text-gray-900 mb-2 anim-2" style={{ letterSpacing: "-0.02em" }}>
              Startup Fair
            </h1>

            <p className="font-outfit text-sm font-light mb-9 anim-3" style={{ color: "#8b96b8" }}>
              Discover and invest in the next big thing
            </p>

            <div className='flex justify-center items-center'>
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => console.log('Login Failed')}
                useOneTap
                auto_select
                shape="rectangle"
                size="large"
                width={250}
                text="signin_with"
                logo_alignment="center"
              />
            </div>

            <p className="font-outfit text-xs font-light mt-7 leading-relaxed anim-5" style={{ color: "#aab2cc" }}>
              Start with ₹10,000 virtual currency
            </p>

          </div>
        </div>
      </div>
    </>
  );
}