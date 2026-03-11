import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStartup = () => {

  const navigate = useNavigate();

  const [startup_name, setStartupName] = useState("");
  const [startup_description, setStartupDescription] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const handleSubmit = async () => {

    if(!startup_name.trim() || !startup_description.trim()) return;

    setLoading(true);
    setError(null);

    try{

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/startups`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          startup_name,
          startup_description
        })
      });

      let data = null;

      try{
        data = await res.json();
      }catch{
        console.log("No JSON response from backend");
      }

    //   console.log("Response:",data);

      if(!res.ok){
        throw new Error(data?.message || "Failed to add startup");
      }

      navigate("/startups");

    }catch(err){
      setError(err.message);
    }

    setLoading(false);

  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .input-field:focus { outline: none; border-color: #4c6ef5; box-shadow: 0 0 0 3px rgba(76,110,245,0.1); }
        .input-field { transition: border-color 0.2s, box-shadow 0.2s; }
        .submit-btn { transition: all 0.2s ease; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(76,110,245,0.35); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>

      <div
        className="min-h-screen font-outfit flex items-center justify-center px-4"
        style={{ background: "linear-gradient(145deg, #e9ecf8 0%, #dce2f4 55%, #e6eaf7 100%)" }}
      >

        <div
          className="fade-up w-full bg-white rounded-2xl"
          style={{
            maxWidth: "480px",
            padding: "48px 44px",
            boxShadow: "0 8px 48px rgba(80,100,200,0.10), 0 1px 4px rgba(80,100,200,0.06)",
          }}
        >

          <div className="mb-8">
            <h1 className="font-lora text-2xl font-bold text-gray-900 mb-1">
              Add a Startup
            </h1>
            <p className="text-sm font-light" style={{ color: "#aab2cc" }}>
              List a new company for investors to discover
            </p>
          </div>

          <div className="flex flex-col gap-5">

            {/* Startup Name */}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "#8b96b8" }}>
                Startup Name
              </label>

              <input
                type="text"
                className="input-field w-full rounded-xl px-4 py-3 text-sm text-gray-800 font-outfit"
                style={{ border: "1.5px solid #e0e4f0", background: "#fafbff" }}
                placeholder="e.g. Acme Corp"
                value={startup_name}
                onChange={(e)=>setStartupName(e.target.value)}
              />
            </div>

            {/* Description */}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "#8b96b8" }}>
                Description
              </label>

              <textarea
                className="input-field w-full rounded-xl px-4 py-3 text-sm text-gray-800 font-outfit resize-none"
                style={{ border: "1.5px solid #e0e4f0", background: "#fafbff", minHeight: "120px" }}
                placeholder="What does this startup do?"
                value={startup_description}
                onChange={(e)=>setStartupDescription(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-light">{error}</p>
            )}

            <div className="flex gap-3 mt-2">

              <button
                onClick={()=>navigate("/startups")}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-500"
                style={{
                  border:"1.5px solid #e0e4f0",
                  background:"white",
                  cursor:"pointer",
                  transition:"all 0.2s"
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading || !startup_name.trim() || !startup_description.trim()}
                className="submit-btn flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                style={{
                  background:"linear-gradient(135deg, #4c6ef5, #845ef7)",
                  border:"none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? "Adding…" : "Add Startup"}
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AddStartup;