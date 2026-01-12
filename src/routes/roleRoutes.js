export const roleMenus = {
  admin: [
    { label: "Dashboard", icon: "pi pi-home", path: "/" },
    { label: "Users", icon: "pi pi-users", path: "/users" },
    { label: "Products", icon: "pi pi-box", path: "/products" },
    { label: "Orders", icon: "pi pi-shopping-cart", path: "/orders" },
    { label: "Stock", icon: "pi pi-database", path: "/stock" },
  ],

  sales: [
    { label: "Dashboard", icon: "pi pi-home", path: "/" },
    { label: "Orders", icon: "pi pi-shopping-cart", path: "/orders" },
    { label: "Products", icon: "pi pi-box", path: "/products" },
  ],

  warehouse: [
    { label: "Dashboard", icon: "pi pi-home", path: "/" },
    { label: "Stock", icon: "pi pi-database", path: "/stock" },
  ],

  viewer: [
    { label: "Dashboard", icon: "pi pi-home", path: "/" },
    { label: "Products", icon: "pi pi-box", path: "/products" },
    { label: "Orders", icon: "pi pi-shopping-cart", path: "/orders" },
  ],
};
