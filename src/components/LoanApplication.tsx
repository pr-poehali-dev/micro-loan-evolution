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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface LoanApplicationProps {
  onSubmit: (application: any) => void;
  user: any;
}

const LoanApplication = ({ onSubmit, user }: LoanApplicationProps) => {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    purpose: "",
    income: "",
    workplace: "",
    workExperience: "",
    passportSeries: "",
    passportNumber: "",
    passportDate: "",
    birthDate: "",
    address: "",
    premiumService: false,
    selectedCard: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.amount ||
      !formData.term ||
      !formData.income ||
      !formData.passportSeries
    ) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Заполните все обязательные поля",
      });
      return;
    }

    const application = {
      id: Date.now(),
      ...formData,
      userId: user.phone,
      status: "pending",
      createdAt: new Date().toISOString(),
      monthlyPayment: Math.round(
        ((Number(formData.amount) * 0.159) / 12) * 1.5,
      ),
      premiumServiceCost: formData.premiumService ? 499 : 0,
    };

    onSubmit(application);

    toast({
      title: "Заявка отправлена",
      description: "Мы рассмотрим вашу заявку в течение 15 минут",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="FileText" size={24} />
          Заявка на займ
        </CardTitle>
        <CardDescription>Заполните форму для получения займа</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Сумма займа * (₽)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="50000"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Срок займа *</Label>
              <Select
                value={formData.term}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, term: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите срок" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 месяца</SelectItem>
                  <SelectItem value="6">6 месяцев</SelectItem>
                  <SelectItem value="12">12 месяцев</SelectItem>
                  <SelectItem value="24">24 месяца</SelectItem>
                  <SelectItem value="36">36 месяцев</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Цель займа</Label>
            <Select
              value={formData.purpose}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, purpose: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите цель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Личные нужды</SelectItem>
                <SelectItem value="business">Развитие бизнеса</SelectItem>
                <SelectItem value="education">Образование</SelectItem>
                <SelectItem value="medical">Медицинские услуги</SelectItem>
                <SelectItem value="repair">Ремонт</SelectItem>
                <SelectItem value="other">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Выбор карты для выплаты */}
          {user.cards && user.cards.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="card-select">Карта для получения займа</Label>
              <Select
                value={formData.selectedCard}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, selectedCard: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите карту" />
                </SelectTrigger>
                <SelectContent>
                  {user.cards.map((card: any) => (
                    <SelectItem key={card.id} value={card.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Icon name="CreditCard" size={16} />
                        {card.maskedNumber} • {card.bankName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Ежемесячный доход * (₽)</Label>
              <Input
                id="income"
                type="number"
                placeholder="80000"
                value={formData.income}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, income: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workExperience">Стаж работы (лет)</Label>
              <Input
                id="workExperience"
                type="number"
                placeholder="2"
                value={formData.workExperience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    workExperience: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workplace">Место работы</Label>
            <Input
              id="workplace"
              placeholder="ООО 'Рога и копыта'"
              value={formData.workplace}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, workplace: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passportSeries">Серия паспорта *</Label>
              <Input
                id="passportSeries"
                placeholder="1234"
                maxLength={4}
                value={formData.passportSeries}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    passportSeries: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passportNumber">Номер паспорта *</Label>
              <Input
                id="passportNumber"
                placeholder="567890"
                maxLength={6}
                value={formData.passportNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    passportNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passportDate">Дата выдачи</Label>
              <Input
                id="passportDate"
                type="date"
                value={formData.passportDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    passportDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адрес регистрации</Label>
            <Textarea
              id="address"
              placeholder="Укажите полный адрес регистрации"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          {/* Премиум услуга */}
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id="premium-service-form"
                  checked={formData.premiumService}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      premiumService: checked,
                    }))
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Star" size={18} className="text-emerald-600" />
                    <Label
                      htmlFor="premium-service-form"
                      className="font-semibold text-emerald-700"
                    >
                      Повышение одобрения займа
                    </Label>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                      +499 ₽
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {user.cards && user.cards.length > 0
                      ? "Приоритетное рассмотрение с привязанной картой"
                      : "Увеличивает вероятность одобрения на 85% и обеспечивает рассмотрение в течение 5 минут"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            <Icon name="Send" className="mr-2" size={20} />
            Отправить заявку
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanApplication;
