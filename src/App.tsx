// Constants and configuration
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Routes, Route } from "react-router-dom";

// Component imports
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import useUserStore from "./Store/userStore";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Spinner } from "./components/ui/spinner";
import api from "./lib/axios";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const { emailAddress, firstName, setUser, clearUser } = useUserStore();
  const isLoggedIn = !!emailAddress;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data.data);
      } catch (err) {
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, [setUser, clearUser]);

  const toggleAuthMode = () => setShowLogin(prev => !prev);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-24 h-24 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                {showLogin ? <LoginForm /> : <RegisterForm />}
                
                <div className="mt-6 text-center">
                  <button
                    onClick={toggleAuthMode}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    {showLogin ? (
                      <>
                        Don't have an account? Register
                        <ArrowRight size={18} />
                      </>
                    ) : (
                      <>
                        <ArrowLeft size={18} />
                        Already have an account? Login
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      

      <Footer />
    </div>
  );
};

export default App;