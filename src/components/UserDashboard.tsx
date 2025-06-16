import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import CardBindingForm from "@/components/CardBindingForm";

interface UserDashboardProps {
  user: any;
  applications: any[];
  onLogout: () => void;
  onNewApplication: () => void;
  onUserUpdate: (userData: any) => void;
}

const UserDashboard = ({
  user,
  applications,
  onLogout,
  onNewApplication,
  onUserUpdate,
}: UserDashboardProps) => {
  const [showCardBinding, setShowCardBinding] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Одобрено";
      case "pending":
        return "На рассмотрении";
      case "rejected":
        return "Отклонено";
      default:
        return "Неизвестно";
    }
  };

  const totalLoaned = applications
    .filter((app) => app.status === "approved")
    .reduce((sum, app) => sum + Number(app.amount), 0);

  const handleCardBound = (card: any) => {
    const updatedUser = {
      ...user,
      cards: [...(user.cards || []), card],
    };
    onUserUpdate(updatedUser);
    setShowCardBinding(false);
  };

  if (showCardBinding) {
    return (
      <div className="w-full max-w-4xl space-y-6">
        <Button
          variant="outline"
          onClick={() => setShowCardBinding(false)}
          className="mb-4"
        >
          <Icon name="ArrowLeft" className="mr-2" size={16} />
          Назад к кабинету
        </Button>
        <CardBindingForm
          onCardBound={handleCardBound}
          onCancel={() => setShowCardBinding(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Профиль пользователя */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div>
                <CardTitle>
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>{user.phone}</CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <Icon name="LogOut" className="mr-2" size={18} />
              Выйти
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">
              {applications.length}
            </div>
            <p className="text-sm text-muted-foreground">Заявок подано</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter((app) => app.status === "approved").length}
            </div>
            <p className="text-sm text-muted-foreground">Займов одобрено</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {totalLoaned.toLocaleString()} ₽
            </div>
            <p className="text-sm text-muted-foreground">Общая сумма займов</p>
          </CardContent>
        </Card>
      </div>

      {/* Управление картами */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CreditCard" size={20} />
                Банковские карты
              </CardTitle>
              <CardDescription>Управление привязанными картами</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setShowCardBinding(true)}>
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить карту
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!user.cards || user.cards.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="CreditCard"
                  size={32}
                  className="text-emerald-600"
                />
              </div>
              <h3 className="font-semibold mb-2">Привяжите банковскую карту</h3>
              <p className="text-muted-foreground mb-4">
                Увеличьте шансы одобрения займа на 85%
              </p>
              <Button onClick={() => setShowCardBinding(true)}>
                <Icon name="Plus" className="mr-2" size={16} />
                Привязать карту
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {user.cards.map((card: any) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <Icon
                        name="CreditCard"
                        size={16}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{card.maskedNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        {card.bankName} • {card.expiry}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.verified && (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-700"
                      >
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Подтверждена
                      </Badge>
                    )}
                  </div>
                </div>
              ))}

              {/* Премиум услуга */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Star" size={20} className="text-emerald-600" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-emerald-700">
                        Повышение одобрения займа
                      </h4>
                      <p className="text-sm text-emerald-600">
                        Гарантия рассмотрения в течение 5 минут • +85% к
                        одобрению
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-700">
                        499 ₽
                      </div>
                      <div className="text-xs text-emerald-600">за заявку</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Премиум услуги */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Star" size={20} className="text-emerald-600" />
            Премиум услуги
          </CardTitle>
          <CardDescription>
            Активные услуги для повышения одобрения займов
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applications.some((app) => app.premiumServiceCost > 0) ? (
            <div className="space-y-3">
              {applications
                .filter((app) => app.premiumServiceCost > 0)
                .map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="Star"
                          size={16}
                          className="text-emerald-600"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-900">
                          Повышение одобрения займа
                        </p>
                        <p className="text-sm text-emerald-700">
                          Заявка на {Number(app.amount).toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700"
                      >
                        Активна
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        499 ₽
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon
                name="Star"
                size={40}
                className="mx-auto text-muted-foreground mb-3"
              />
              <p className="text-muted-foreground">
                У вас нет активных премиум услуг
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Заявки */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Мои заявки</CardTitle>
              <CardDescription>
                История и статус ваших заявок на займы
              </CardDescription>
            </div>
            <Button onClick={onNewApplication}>
              <Icon name="Plus" className="mr-2" size={18} />
              Новая заявка
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <Icon
                name="FileText"
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <p className="text-muted-foreground">У вас пока нет заявок</p>
              <Button className="mt-4" onClick={onNewApplication}>
                Подать первую заявку
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app, index) => (
                <div key={app.id}>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">
                          {Number(app.amount).toLocaleString()} ₽
                        </span>
                        <Badge variant={getStatusColor(app.status)}>
                          {getStatusText(app.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Срок: {app.term} мес. • Подано:{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                      {app.status === "approved" && (
                        <p className="text-sm text-green-600">
                          Ежемесячный платеж:{" "}
                          {app.monthlyPayment?.toLocaleString()} ₽
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {app.status === "pending" && (
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Рассмотрение
                          </div>
                          <Progress value={75} className="w-24" />
                        </div>
                      )}
                      {app.status === "approved" && (
                        <Icon
                          name="CheckCircle"
                          size={24}
                          className="text-green-600"
                        />
                      )}
                      {app.status === "rejected" && (
                        <Icon
                          name="XCircle"
                          size={24}
                          className="text-red-600"
                        />
                      )}
                    </div>
                  </div>
                  {index < applications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
