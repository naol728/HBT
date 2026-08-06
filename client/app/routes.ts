import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("login", "./routes/auth/login.tsx"),
  route("signup", "./routes/auth/signup.tsx"),

  route("admin", "./routes/admin/index.tsx", [
    index("./routes/admin/dashboard.tsx"),
  ]),

  route("dashboard", "./routes/dashboard/index.tsx", [
    index("./routes/dashboard/dashboard.tsx"),
    route("team", "./routes/dashboard/Teams.tsx"),
    route("orders", "./routes/dashboard/Orders.tsx"),
    route("commissions", "./routes/dashboard/Commissions.tsx"),
    route("training", "./routes/dashboard/Training.tsx"),
    route("referrals", "./routes/dashboard/Referrals.tsx"),
    route("profile", "./routes/dashboard/Profile.tsx"),
    route("wallet", "./routes/dashboard/Wallet.tsx"),
    route("announcement", "./routes/dashboard/Announcement.tsx"),
  ]),
] satisfies RouteConfig;
