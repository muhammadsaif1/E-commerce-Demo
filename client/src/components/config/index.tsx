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

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input" as const,
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea" as const,
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select" as const,
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select" as const,
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input" as const,
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input" as const,
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input" as const,
    type: "number",
    placeholder: "Enter total stock",
  },
];
