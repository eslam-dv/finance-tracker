import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const Summarycard = ({
  title,
  amount,
}: {
  title: "Balance" | "Income" | "Expenses";
  amount: number;
}) => {
  let icon;
  let color = "";
  switch (title) {
    case "Balance":
      icon = <Wallet color="gray" size={20} />;
      color = "text-blue-600"
      break;
    case "Income":
      icon = <TrendingUp color="green" size={20} />;
      color = "text-green-600"
      break;
    case "Expenses":
      icon = <TrendingDown color="red" size={20} />;
      color = "text-red-600"
      break;
  }
  return (
    <Card>
      <CardTitle className="flex items-center gap-5  px-4">
        {title} {icon}
      </CardTitle>
      <CardContent>
        <p className={`${color} font-semibold text-lg`}>${amount}</p>
      </CardContent>
    </Card>
  );
};

export default Summarycard;
