import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import TracksPage from "@/pages/TracksPage";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/use-auth";
import { Loader } from "@/components/Loader";
import "@/components/Loader.css";
import { useEffect, useState } from "react";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/tracks" component={TracksPage} />
      
      {/* Protected Dashboard Route */}
      <Route path="/dashboard">
        {() => {
          if (isLoading) return null;
          if (!isAuthenticated) {
             // Dashboard disabled in frontend-only mode
             console.log('Dashboard access attempted - auth disabled');
             return <Landing />;
          }
          return <Dashboard />;
        }}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);

  // Prevent browser from restoring scroll position
  useEffect(() => {
    // Block scroll restoration immediately
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force to top before anything renders
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Start fade out after 1500ms
    const fadeTimer = setTimeout(() => {
      const loaderEl = document.getElementById('loader-overlay');
      if (loaderEl) {
        loaderEl.classList.add('fade-out');
      }
    }, 1500);

    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showLoader && (
        <div id="loader-overlay">
          <div className="loader-orb loader-orb-1"></div>
          <div className="loader-orb loader-orb-2"></div>
          <div className="loader-orb loader-orb-3"></div>
          <div className="loader-orb loader-orb-4"></div>
          <div className="loader-orb loader-orb-5"></div>

          <div className="loader-starfield" id="loader-starfield"></div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(24px, 8vw, 52px)', position: 'relative', zIndex: 3, padding: '0 16px' }}>
            <div className="loader-title-wrap">
              <div className="loader-title-main">
                <span className="loader-innov">Innov</span>
                <span className="loader-genius">Genius</span>
              </div>
              <div className="loader-title-sub">Think beyond · Build beyond</div>
            </div>

            <div className="loader-wrap">
              <div className="loader-orbit-ring">
                <div className="loader-orbit-dot"></div>
                <div className="loader-pulse-ring"></div>
                <div className="loader-pulse-ring"></div>
                <div className="loader-pulse-ring"></div>

                <div className="loader-brain-wrap">
                  <div className="loader-brain-glow"></div>

                  <svg className="loader-bulb-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="loader-bulb-glass"
                      d="M100 68 C72 68, 52 88, 52 112 C52 132, 64 148, 82 152 L82 158 L118 158 L118 152 C136 148, 148 132, 148 112 C148 88, 128 68, 100 68 Z"
                      fill="rgba(255,255,255,.07)"
                      stroke="#fff"
                      strokeWidth="2.8"
                      strokeLinejoin="round"
                    />
                    <circle className="loader-bulb-inner" cx="100" cy="114" r="22" fill="rgba(255,255,255,.06)" stroke="none" />
                    <path
                      className="loader-bulb-filament"
                      d="M100 96 C96 96, 94 100, 96 103 C98 106, 102 106, 104 103 C106 100, 104 96, 100 96 C96 96, 94 100, 96 104 C98 108, 102 108, 104 104 C106 100, 104 96, 100 96"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                      opacity=".75"
                    />
                    <line className="loader-bulb-lead" x1="100" y1="96" x2="100" y2="88" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
                    <line className="loader-bulb-lead" x1="100" y1="108" x2="100" y2="118" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
                    <rect className="loader-bulb-base" x="80" y="158" width="40" height="6" rx="2" fill="none" stroke="#fff" strokeWidth="2" opacity=".7" />
                    <rect className="loader-bulb-base" x="83" y="166" width="34" height="5" rx="2" fill="none" stroke="#fff" strokeWidth="1.8" opacity=".55" />
                    <rect className="loader-bulb-base" x="88" y="173" width="24" height="4" rx="2" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".4" />
                  </svg>
                </div>
              </div>

              <div className="loader-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="loader-text">Initializing</div>
            </div>
          </div>

          <div className="loader-grain"></div>

          <Loader />
        </div>
      )}

      <div id="app-root">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
