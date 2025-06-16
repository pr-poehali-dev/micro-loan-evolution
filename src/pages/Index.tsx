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

  const handleUserUpdate = (userData: any) => {
    setUser(userData);
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
              onUserUpdate={handleUserUpdate}
            />
          )}
        </div>
      </main>

      {/* Преимущества привязки карты */}
      {currentView === "calculator" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Преимущества привязки банковской карты
            </h2>
            <p className="text-gray-600">
              Увеличьте свои шансы на одобрение займа
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg border">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Быстрое одобрение</h3>
              <p className="text-sm text-gray-600">
                Рассмотрение заявки за 5 минут вместо стандартных 15
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-semibold mb-2">+85% к одобрению</h3>
              <p className="text-sm text-gray-600">
                Кредитная история по карте повышает доверие банка
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold mb-2">Безопасность</h3>
              <p className="text-sm text-gray-600">
                Данные карты защищены современным шифрованием
              </p>
            </div>
          </div>
        </section>
      )}

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
