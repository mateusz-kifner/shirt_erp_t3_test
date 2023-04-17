import type { ComponentType, ReactNode } from "react";
import {
  IconChecklist,
  IconCrown,
  IconMail,
  IconShirt,
  IconUser,
  IconFile,
  IconBell,
  IconShoppingCart,
} from "@tabler/icons-react";

const navigationData: {
  label: string;
  Icon: ReactNode;
  href: string;
  entryName: string;
  gradient?: { from: string; to: string; deg: number };
  SecondNavigation?: ComponentType;
  debug?: boolean;
}[] = [
  {
    label: "Zadania",
    Icon: <IconChecklist size={32} />,
    href: "/erp/tasks",
    entryName: "tasks",
    gradient: { from: "teal", to: "lime", deg: 105 },
  },
  {
    label: "Zamówienia",
    Icon: <IconCrown size={32} />,
    href: "/erp/orders",
    entryName: "orders",
    gradient: { from: "indigo", to: "cyan", deg: 105 },
  },
  {
    label: "Produkty",
    Icon: <IconShirt size={32} />,
    href: "/erp/products",
    entryName: "products",
    gradient: { from: "grape", to: "red", deg: 105 },
  },
  {
    label: "Klienci",
    Icon: <IconUser size={32} />,
    href: "/erp/clients",
    entryName: "clients",
    gradient: { from: "orange", to: "gold", deg: 105 },
  },
  {
    label: "Wydatki",
    Icon: <IconShoppingCart size={32} />,
    href: "/erp/expenses",
    entryName: "expenses",
    gradient: { from: "red", to: "orange", deg: 105 },
  },
  {
    label: "IconMaile",
    Icon: <IconMail size={32} />,
    href: "/erp/email-messages",
    entryName: "email",
    gradient: { from: "indigo", to: "teal", deg: 105 },
  },
  {
    label: "Logi",
    Icon: <IconBell size={32} />,
    href: "/erp/logs",
    entryName: "logs",
    debug: true,
  },
  {
    label: "Zamówienia archiwalne",
    Icon: <IconBell size={32} />,
    href: "/erp/order-archives",
    entryName: "orders-archive",
    debug: true,
  },
  {
    label: "Pracownicy",
    Icon: <IconBell size={32} />,
    href: "/erp/users",
    entryName: "users",
    debug: true,
  },
  {
    label: "Pliki",
    Icon: <IconFile size={32} />,
    href: "/erp/files",
    entryName: "upload/files",
    gradient: { from: "green", to: "lime", deg: 105 },
    debug: true,
  },
];

export default navigationData;
