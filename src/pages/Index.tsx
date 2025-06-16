import { useState } from "react";
import LoanCalculator from "@/components/LoanCalculator";
import AuthForm from "@/components/AuthForm";
import LoanApplication from "@/components/LoanApplication";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<
    "calculator" | "auth" | "application" | "dashboard"
  >("calculator");

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("calculator");
    setApplications([]);
  };

  const handleApplicationSubmit = (application: any) => {
    setApplications((prev) => [...prev, application]);
    setCurrentView("dashboard");
  };

  const handleNewApplication = () => {
    setCurrentView("application");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Хедер */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">₽</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">МикроЗайм</h1>
            </div>
            <nav className="flex gap-6">
              <button
                onClick={() => setCurrentView("calculator")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "calculator"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Калькулятор
              </button>
              {!user ? (
                <button
                  onClick={() => setCurrentView("auth")}
                  className={`text-sm font-medium transition-colors ${
                    currentView === "auth"
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Личный кабинет
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className={`text-sm font-medium transition-colors ${
                    currentView === "dashboard"
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Мои заявки
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          {currentView === "calculator" && <LoanCalculator />}
          {currentView === "auth" && !user && (
            <AuthForm onLogin={handleLogin} />
          )}
          {currentView === "application" && user && (
            <LoanApplication onSubmit={handleApplicationSubmit} user={user} />
          )}
          {currentView === "dashboard" && user && (
            <UserDashboard
              user={user}
              applications={applications}
              onLogout={handleLogout}
              onNewApplication={handleNewApplication}
            />
          )}
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 МикроЗайм. Быстрые займы онлайн.</p>
            <p className="mt-2">Лицензия ЦБ РФ №123456 • 18+</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
