import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

const LoanCalculator = () => {
  const [amount, setAmount] = useState([50000]);
  const [term, setTerm] = useState([12]);
  const [rate] = useState(15.9); // Фиксированная ставка
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [overpayment, setOverpayment] = useState(0);
  const [premiumService, setPremiumService] = useState(false);

  useEffect(() => {
    const loanAmount = amount[0];
    const months = term[0];
    const monthlyRate = rate / 100 / 12;

    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const total = payment * months;
    const over = total - loanAmount;

    setMonthlyPayment(Math.round(payment));
    setTotalCost(Math.round(total));
    setOverpayment(Math.round(over));
  }, [amount, term, rate]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Calculator" size={24} />
          Калькулятор займа
        </CardTitle>
        <CardDescription>
          Рассчитайте параметры займа и узнайте точную сумму к возврату
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Сумма займа: {amount[0].toLocaleString()} ₽
            </Label>
            <Slider
              value={amount}
              onValueChange={setAmount}
              max={500000}
              min={10000}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10 000 ₽</span>
              <span>500 000 ₽</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Срок займа: {term[0]}{" "}
              {term[0] === 1 ? "месяц" : term[0] < 5 ? "месяца" : "месяцев"}
            </Label>
            <Slider
              value={term}
              onValueChange={setTerm}
              max={36}
              min={3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3 месяца</span>
              <span>36 месяцев</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Процентная ставка</Label>
            <Input value={`${rate}% годовых`} disabled className="bg-muted" />
          </div>
        </div>

        {/* Премиум услуга */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Checkbox
                id="premium-service"
                checked={premiumService}
                onCheckedChange={setPremiumService}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Star" size={20} className="text-emerald-600" />
                  <Label
                    htmlFor="premium-service"
                    className="font-semibold text-emerald-700"
                  >
                    Повышение одобрения займа
                  </Label>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm font-medium">
                    499 ₽
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Увеличивает шансы одобрения на 85% благодаря приоритетной
                  обработке заявки и улучшенному скорингу
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-emerald-600"
                    />
                    <span>Приоритетное рассмотрение</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-emerald-600"
                    />
                    <span>Улучшенный скоринг</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-emerald-600"
                    />
                    <span>Персональный менеджер</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-emerald-600"
                    />
                    <span>Быстрое одобрение</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {monthlyPayment.toLocaleString()} ₽
              </div>
              <p className="text-sm text-muted-foreground">
                Ежемесячный платеж
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalCost.toLocaleString()} ₽
              </div>
              <p className="text-sm text-muted-foreground">
                Общая сумма к возврату
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {overpayment.toLocaleString()} ₽
              </div>
              <p className="text-sm text-muted-foreground">Переплата</p>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full" size="lg">
          <Icon name="FileText" className="mr-2" size={20} />
          Подать заявку на займ
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
