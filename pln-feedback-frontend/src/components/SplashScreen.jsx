import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/feedback');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-pln-teal flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-52 h-52 bg-yellow-400 mx-auto flex items-center justify-center relative">
            {/* Blue waves */}
            <svg className="absolute" width="180" height="100" viewBox="0 0 180 100">
              <path d="M 10 50 Q 30 30, 50 50 T 90 50 T 130 50 T 170 50" 
                    stroke="#1CB5C4" strokeWidth="12" fill="none"/>
              <path d="M 10 65 Q 30 45, 50 65 T 90 65 T 130 65 T 170 65" 
                    stroke="#1CB5C4" strokeWidth="12" fill="none"/>
              <path d="M 10 80 Q 30 60, 50 80 T 90 80 T 130 80 T 170 80" 
                    stroke="#1CB5C4" strokeWidth="12" fill="none"/>
            </svg>
            {/* Lightning bolt */}
            <svg className="absolute z-10" width="60" height="120" viewBox="0 0 60 120">
              <path d="M 35 0 L 15 50 L 30 50 L 25 120 L 55 40 L 35 40 Z" 
                    fill="#EF4444"/>
            </svg>
          </div>
        </div>
        <h1 className="text-6xl font-bold text-pln-cyan tracking-wider">PLN</h1>
      </div>
    </div>
  );
};

export default SplashScreen;