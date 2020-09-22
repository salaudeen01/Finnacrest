export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "home",
  },
  {
    name: "Wallet",
    icon: "account_balance_wallet",
    path: "/wallet",
  },
  {
    name: "Application",
    icon: "list_alt",
    children: [
      {
        name: "Target Contributions",
        path: "/applications/target-contribution",
        iconText: "B",
      },
      {
        name: "Monthly Contribution",
        path: "/applications/monthly-contribution",
        iconText: "B",
      },
      {
        name: "Procurement Repayment",
        path: "/applications/procurement",
        iconText: "E",
      },
      {
        name: "Loan Repayment",
        path: "/applications/loan-repayment",
        iconText: "E",
      },
      {
        name: "Shares Contribution",
        path: "/applications/shares-capital",
        iconText: "E",
      },
      {
        name: "Wallet Contribution",
        path: "/applications/wallet-contribution",
        iconText: "E",
      },
    ],
  },
  {
    name: "Save",
    icon: "payments",
    // path: "/savings",
    children: [
      {
        name: "Regular Savings",
        path: "/regular",
        iconText: "B",
      },
      {
        name: "Target Savings",
        path: "/target",
        iconText: "B",
      },
    ],
  },
  {
    name: "Shareholdings",
    path: "/shareholdings",
    icon: "people",
  },
  {
    name: "Loan",
    icon: "money",
    path: "/loan",
  },
  {
    name: "Product Financing",
    icon: "shopping_cart",
    children: [
      {
        name: "Products",
        path: "/halal",
        iconText: "A",
      },
      {
        name: "My Products",
        path: "/products",
        iconText: "C",
      },
    ],
  },
  // {
  //     name: "Invest",
  //     icon: "shopping_cart",
  //     path: "/investments"    
  //   },
  {
    name: "Transactions",
    icon: "receipt",
    path: "/transactions",
  },
  {
    name: "Account",
    icon: "settings",
    path: "/settings",
  },
];
