import { View, Text } from "react-native";
import React from "react";
import CurrencyFormat from "react-currency-format";

interface ReceiptItemProps {
  title: string;
  price: string | number;
  isBold?: boolean;
}

const ReceiptItem = ({ title, price, isBold = false }: ReceiptItemProps) => {
  const cx = isBold ? "font-extrabold" : "text-gray-400";
  const cxTitle = isBold ? "" : "text-gray-400";

  return (
    <View className="flex-row items-center justify-between">
      <Text className={cxTitle}>{title}</Text>
      <CurrencyFormat
        value={price}
        thousandSeparator=","
        prefix="Rp."
        displayType="text"
        renderText={(value) => <Text className={cx}>{value}</Text>}
      />
    </View>
  );
};

export default ReceiptItem;
