import type { ComponentType } from "react";
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
  Icon: ComponentType<{ size: number; className: string }>;
  href: string;
  entryName: string;
  gradient?: { from: string; to: string; deg: number };
  SecondNavigation?: ComponentType;
  debug?: boolean;
}[] = [
  {
    label: "Zadania",
    Icon: IconChecklist,
    href: "/erp/tasks",
    entryName: "tasks",
    gradient: { from: "#099268", to: "#66A80F", deg: 105 },
  },
  {
    label: "Zamówienia",
    Icon: IconCrown,
    href: "/erp/orders",
    entryName: "orders",
    gradient: { from: "#3B5BDB", to: "#0C8599", deg: 105 },
  },
  {
    label: "Produkty",
    Icon: IconShirt,
    href: "/erp/products",
    entryName: "products",
    gradient: { from: "#9C36B5", to: "#E03131", deg: 105 },
  },
  {
    label: "Klienci",
    Icon: IconUser,
    href: "/erp/clients",
    entryName: "clients",
    gradient: { from: "#E8590C", to: "#F08C00", deg: 105 },
  },
  {
    label: "Wydatki",
    Icon: IconShoppingCart,
    href: "/erp/expenses",
    entryName: "expenses",
    gradient: { from: "#E03131", to: "#E8590C", deg: 105 },
  },
  {
    label: "IconMaile",
    Icon: IconMail,
    href: "/erp/email-messages",
    entryName: "email",
    gradient: { from: "#3B5BDB", to: "#099268", deg: 105 },
  },
  {
    label: "Logi",
    Icon: IconBell,
    href: "/erp/logs",
    entryName: "logs",
    debug: true,
  },
  {
    label: "Zamówienia archiwalne",
    Icon: IconBell,
    href: "/erp/order-archives",
    entryName: "orders-archive",
    debug: true,
  },
  {
    label: "Pracownicy",
    Icon: IconBell,
    href: "/erp/users",
    entryName: "users",
    debug: true,
  },
  {
    label: "Pliki",
    Icon: IconFile,
    href: "/erp/files",
    entryName: "upload/files",
    gradient: { from: "#2F9E44", to: "#66A80F", deg: 105 },
    debug: true,
  },
];

export default navigationData;
