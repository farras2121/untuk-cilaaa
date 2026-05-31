import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [buka, setBuka] = useState(false);
  const audioRef = useRef(null);
  const typedRef = useRef(null);

  // Efek Mengetik Otomatis (Akan jalan setelah surat dibuka)
  useEffect(() => {
    if (buka && typedRef.current) {
      const typed = new window.Typed(typedRef.current, {
        strings: [
          'Tulaliloo ti amo! 🥰', 
          'Sengaja aku bikinin web tema Minion ini...', 
          'Soalnya kamu itu ceria & ngegemesin banget kayak mereka! 💛',
          'Makasih ya udah selalu nemenin hari-hari aku. ✨',
          'I love you to the moon and back! 🚀🍌'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [buka]);

  const aksiBukaUndangan = () => {
    setBuka(true);
    
    // 1. Putar Musik Otomatis
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Gagal putar musik:", err));
    }

    // 2. Efek Ledakan Confetti pas amplop dibuka
    window.confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Efek Hujan Hati pas foto di-klik
  const efekHujanHati = () => {
    const durasi = 3 * 1000;
    const akhir = Date.now() + durasi;

    (function frame() {
      window.confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      window.confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < akhir) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col items-center justify-center p-4">
      {/* Taruh file musik.mp3 favoritmu di folder public */}
      <audio ref={audioRef} src="/musik.mp3" loop />

      {!buka ? (
        /* ================= COVER DEPAN (SURAT) ================= */
        <div className="text-center space-y-6 max-w-sm bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(28,100,242,0.2)] border-4 border-blue-600 animate-float">
          
          {/* Ornamen Mata Minion */}
          <div className="flex justify-center items-center space-x-[-12px]">
            <div className="w-16 h-16 bg-slate-100 border-4 border-gray-400 rounded-full flex items-center justify-center shadow-inner">
              <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
            <div className="w-16 h-16 bg-slate-100 border-4 border-gray-400 rounded-full flex items-center justify-center shadow-inner">
              <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-black text-blue-600 tracking-wide uppercase">Bello! 🍌</h1>
          <p className="text-sm font-bold text-gray-600 leading-relaxed">
            Ada sebuah surat rahasia super interaktif yang nungguin kamu buka nih.
          </p>
          
          <button 
            onClick={aksiBukaUndangan}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            OPEN MESSAGE ❤️
          </button>
        </div>
      ) : (
        /* ================= KONTEN SURAT UTAMA ================= */
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.25)] border-4 border-blue-600 p-6 space-y-6捷 animate-slide-up">
          
          {/* Badge Atas */}
          <div className="text-center">
            <span className="bg-yellow-300 text-yellow-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">
              Bananaaa! 💛
            </span>
          </div>

          {/* Foto Utama (Bisa diklik buat munculin hujan confetti) */}
          <div 
            onClick={efekHujanHati}
            className="overflow-hidden rounded-2xl border-4 border-blue-600 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer relative group"
          >
            <img 
              src="/foto1.jpg" 
              alt="Foto Bersama" 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=500" }}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-bold bg-blue-600/90 px-3 py-1.5 rounded-full text-xs">Klik Aku! 🌟</span>
            </div>
          </div>

          {/* Box Efek Teks Ketik Berjalan */}
          <div className="bg-yellow-50 p-5 rounded-2xl border-2 border-dashed border-yellow-400 min-h-[140px] flex items-center justify-center shadow-inner">
            <span 
              ref={typedRef} 
              className="text-lg text-slate-800 font-bold font-mono text-center leading-relaxed"
            ></span>
          </div>

          {/* Galeri Grid Kecil */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 rounded-xl overflow-hidden border-2 border-blue-500 shadow-md hover:scale-102 transition-transform">
              <img src="/foto2.jpg" alt="Memori 1" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=300" }} />
            </div>
            <div className="h-32 rounded-xl overflow-hidden border-2 border-blue-500 shadow-md hover:scale-102 transition-transform">
              <img src="/foto3.jpg" alt="Memori 2" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300" }} />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs font-black text-blue-600 tracking-widest uppercase pt-2">
            Poopaye! 👋💛
          </div>
        </div>
      )}
    </div>
  );
}