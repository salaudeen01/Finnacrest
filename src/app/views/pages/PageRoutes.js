import React from "react";

const pageRoutes = [
  {
    path: "/regular",
    component: React.lazy(() => import("./savings/Regular"))
  },
  {
    path: "/target",
    component: React.lazy(() => import("./savings/Target"))
  },
  {
    path: "/savetoloan",
    component: React.lazy(() => import("./savings/SaveToLoan"))
  },
  {
    path: "/shareholdings",
    component: React.lazy(() => import("./Shareholdings/Shareholdings")),
  },
  
  // {
  //   path: "/halal",
  //   component: React.lazy(() => import("./investments/Halal"))
  // },
  // {
  //   path: "/market",
  //   component: React.lazy(() => import("./investments/Market"))
  // },
  // {
  //   path: "/finance",
  //   component: React.lazy(() => import("./investments/Finance"))
  // },
  // {
  //   path: "/investments",
  //   component: React.lazy(() => import("./investments/Investments"))
  // },
  // {
  //   path: "/investment/market",
  //   component: React.lazy(() => import("./investments/MarketTab"))
  // },
  // {
  //   path: "/investment/halal",
  //   component: React.lazy(() => import("./investments/HalalTab"))
  // },
  // {
  //   path: "/investment/finance",
  //   component: React.lazy(() => import("./investments/FinanceTab"))
  // },
  {
    path: "/halal",
    component: React.lazy(() => import("./ProductFinance/Halal")),
  },
  {
    path: "/products",
    component: React.lazy(() => import("./ProductFinance/Products")),
  },
  {
    path: "/details/:id",
    component: React.lazy(() => import("./ProductFinance/ProductDetails")),
  },
  {
    path: "/detail/cart",
    component: React.lazy(() => import("./ProductFinance/CheckOutPage"))
  },
  {
    path: "/market",
    component: React.lazy(() => import("./ProductFinance/Market")),
  },
  {
    path: "/finance",
    component: React.lazy(() => import("./ProductFinance/Finance")),
  },
  {
    path: "/investments",
    component: React.lazy(() => import("./ProductFinance/Investments")),
  },
  {
    path: "/loan",
    component: React.lazy(() => import("./Loan/Loan"))
  },
  {
    path: "/loan-group",
    component: React.lazy(() => import("./Loans/GroupTab"))
  },
  {
    path: "/loans",
    component: React.lazy(() => import("./Loans/LoanTab"))
  },
  {
    path: "/savings",
    component: React.lazy(() => import("./savings/Savings"))
  },
  {
    path: "/savings-tab/regular",
    component: React.lazy(() => import("./savings/SavingsTab"))
  },
  {
    path: "/savings-tab/target",
    component: React.lazy(() => import("./savings/SavingsTargetTab"))
  },
  {
    path: "/savings-tab/savetoloan",
    component: React.lazy(() => import("./savings/SavingsLoanTab"))
  },
  {
    path: "/settings",
    component: React.lazy(() => import("./settings/Settings"))
  },
  {
    path: "/transactions",
    component: React.lazy(() => import("./transactions/Transaction"))
  },
  {
    path: "/wallet",
    component: React.lazy(() => import("./transactions/Wallet"))
  },
];

export default pageRoutes;
