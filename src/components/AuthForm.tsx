import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import CardBindingForm from "@/components/CardBindingForm";

interface AuthFormProps {
  onLogin: (userData: any) => void;
}

const AuthForm = ({ onLogin }: AuthFormProps) => {
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [registerData, setRegisterData] = useState({
    phone: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    agreement: false,
  });
  const [showCardBinding, setShowCardBinding] = useState(false);
  const [userCards, setUserCards] = useState<any[]>([]);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.phone || !loginData.password) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Заполните все поля",
      });
      return;
    }

    // Имитация успешного входа
    onLogin({
      firstName: "Иван",
      lastName: "Петров",
      phone: loginData.phone,
      email: "ivan@example.com",
      cards: userCards,
    });

    toast({
      title: "Успешный вход",
      description: "Добро пожаловать в личный кабинет!",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !registerData.phone ||
      !registerData.password ||
      !registerData.firstName ||
      !registerData.agreement
    ) {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description:
          "Заполните все обязательные поля и согласитесь с условиями",
      });
      return;
    }

    onLogin({
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      phone: registerData.phone,
      email: registerData.email,
      cards: userCards,
    });

    toast({
      title: "Регистрация успешна",
      description: "Добро пожаловать в МикроЗайм!",
    });
  };

  const handleCardBound = (card: any) => {
    setUserCards((prev) => [...prev, card]);
    setShowCardBinding(false);
  };

  if (showCardBinding) {
    return (
      <CardBindingForm
        onCardBound={handleCardBound}
        onCancel={() => setShowCardBinding(false)}
      />
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="User" size={24} />
          Личный кабинет
        </CardTitle>
        <CardDescription>
          Войдите или зарегистрируйтесь для подачи заявки
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-phone">Номер телефона</Label>
                <Input
                  id="login-phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={loginData.phone}
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                <Icon name="LogIn" className="mr-2" size={18} />
                Войти
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя *</Label>
                  <Input
                    id="firstName"
                    value={registerData.firstName}
                    onChange={(e) =>
                      setRegisterData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={registerData.lastName}
                    onChange={(e) =>
                      setRegisterData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Номер телефона *</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль *</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreement"
                  checked={registerData.agreement}
                  onCheckedChange={(checked) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      agreement: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="agreement" className="text-sm">
                  Согласен с условиями обслуживания *
                </Label>
              </div>
              <Button type="submit" className="w-full">
                <Icon name="UserPlus" className="mr-2" size={18} />
                Зарегистрироваться
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CreditCard" size={18} className="text-emerald-600" />
            <span className="font-semibold text-emerald-700">
              Привязка карты
            </span>
          </div>
          <p className="text-sm text-emerald-600 mb-3">
            Увеличьте шансы одобрения займа на 85% привязав банковскую карту
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCardBinding(true)}
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
          >
            <Icon name="Plus" className="mr-2" size={16} />
            Привязать карту
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
