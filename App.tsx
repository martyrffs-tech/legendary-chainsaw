import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { DashboardContent } from './components/dashboard-content';
import { ThemeProvider, useTheme } from './components/theme-context';
import { AnimatedBackground } from './components/animated-background';
import { GridOverlay } from './components/grid-overlay';
import { NoiseTexture } from './components/noise-texture';
import { AdvancedSidebar } from './components/advanced-sidebar';
import { GlobalSearch } from './components/global-search';
import { QuickShortcuts } from './components/quick-shortcuts';
import { ThemeSelector } from './components/theme-selector';
import { MobileQuickMenu } from './components/mobile-quick-menu';
import { ChevronLeft, ChevronRight, Shield, Globe } from 'lucide-react';



function AppContent() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { settings } = useTheme();

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full relative" data-compact={settings.compactMode}>
          {/* Animated Background Layers */}
          <AnimatedBackground />
          <GridOverlay />
          <NoiseTexture />
          
          {/* Advanced Sidebar */}
          <div className={`relative z-10 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
            <AdvancedSidebar 
              activeSection={activeSection}
              onNavigate={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />
          </div>
          
          <div className="flex-1 flex flex-col relative z-10">
            {/* Elegant Header */}
            <header className="border-b border-border/50 bg-gradient-to-r from-background/90 via-background/95 to-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-black/5">
              <div className="flex h-16 items-center px-6">
                <div className="flex items-center space-x-3">
                  {/* Sidebar Toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-xl hover:bg-primary/10 transition-all duration-200"
                    onClick={toggleSidebar}
                  >
                    {sidebarCollapsed ? (
                      <ChevronRight className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronLeft className="h-5 w-5 text-primary" />
                    )}
                  </Button>
                  
                  {/* Mobile Menu */}
                  <MobileQuickMenu onNavigate={handleNavigation} />
                  
                  {/* BarthFlow Brand */}
                  <div className="hidden md:flex items-center space-x-2 ml-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                        BarthFlow
                      </h1>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center px-4 md:px-8">
                  <div className="w-full max-w-md">
                    <GlobalSearch onNavigate={handleNavigation} />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-4">
                  {/* Theme Selector - Hidden on mobile */}
                  <div className="hidden sm:block">
                    <ThemeSelector />
                  </div>
                  
                  {/* Quick Shortcuts - Responsive */}
                  <div className="hidden md:block">
                    <QuickShortcuts onNavigate={handleNavigation} />
                  </div>
                  
                  {/* Status Section */}
                  <div className="flex items-center space-x-3">
                    {/* System Status */}
                    <Badge variant="outline" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 text-green-200 shadow-md">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Online
                    </Badge>
                    
                    {/* Open Access Badge */}
                    <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/20 border-primary/30 text-primary-foreground shadow-md">
                      <Globe className="w-3 h-3 mr-1" />
                      Otwarte
                    </Badge>
                  </div>
                </div>
              </div>
            </header>
            
            <main className="flex-1 overflow-y-auto bg-transparent">
              <DashboardContent activeSection={activeSection} onNavigate={handleNavigation} />
            </main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}