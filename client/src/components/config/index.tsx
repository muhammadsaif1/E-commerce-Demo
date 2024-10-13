import { LayoutDashboard, ShoppingBasket, ShoppingCart } from "lucide-react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter Your user name",
    componentType: "input" as const,
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your email",
    componentType: "input" as const,
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your password",
    componentType: "input" as const,
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your email",
    componentType: "input" as const,
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your password",
    componentType: "input" as const,
    type: "password",
  },
];

export const AdminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart />,
  },
];
