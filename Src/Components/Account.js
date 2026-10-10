import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../utils/UserContext";
import { setCart } from "../../utils/cartslice";
import { getOrderStage, isDelivered, setOrders } from "../../utils/orderslice";
import { formatCurrency } from "../../utils/cartTotals";
import { fetchOrders } from "../../utils/auth";

const ACCENT = "#ff6b00";
const ACCENT_DEEP = "#d94800";

const summarizeItems = (items = []) => {
  const first = items[0];
  if (!first) return "No items";
  const extra = items.length - 1;
  const qty = first.quantity > 1 ? ` ×${first.quantity}` : "";
  return extra > 0 ? `${first.info.name}${qty} + ${extra} more` : `${first.info.name}${qty}`;
};

/* ── SVG icon helper ── */
const Svg = ({ d, className = "" }) => (
  <svg
    className={`shrink-0 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const ICON = {
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z M3 6h18 M16 10a4 4 0 0 1-8 0",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z M12 6v6l4 2",
  refresh: "M3 12a9 9 0 0 1 15.36-6.36L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.36 6.36L3 16m0 5v-5h5",
  check: "M20 6 9 17l-5-5",
  chevronRight: "m9 18 6-6-6-6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  settings: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
};

/* ── Order card ── */
const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { key, label } = getOrderStage(order);
  const delivered = key === "delivered";

  const handleReorder = () => {
    dispatch(setCart(order.items));
    navigate("/cart");
  };

  const itemCount = (order.items || []).reduce((sum, i) => sum + (i.quantity || 1), 0);

  return (
    <div className="group relative bg-white rounded-[28px] border border-slate-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_-8px_rgba(255,107,0,0.15)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      {/* status strip */}
      <div
        className="h-[3px]"
        style={{
          background: delivered
            ? "linear-gradient(90deg, #16a34a, #4ade80, #22c55e)"
            : `linear-gradient(90deg, ${ACCENT_DEEP}, ${ACCENT}, #fb923c)`,
        }}
      />

      <div className="p-5 sm:p-6">
        {/* top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-extrabold text-[17px] text-slate-900">
                #{order.id}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  delivered
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60"
                    : "text-[#c2410c] ring-1 ring-orange-200/60"
                }`}
                style={!delivered ? { background: "rgba(255,107,0,0.08)" } : undefined}
              >
                {!delivered && (
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: ACCENT }}
                  />
                )}
                {label}
              </span>
            </div>
            <p className="text-[13px] text-slate-400 mt-1.5 font-medium">
              {new Date(order.placedAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>

          <span className="font-display font-extrabold text-xl text-slate-900 tabular-nums shrink-0">
            {formatCurrency(order.totals?.grandTotal)}
          </span>
        </div>

        {/* items preview */}
        <div className="mt-4 flex items-center gap-2.5">
          <span
            className="flex h-7 min-w-[28px] items-center justify-center rounded-lg px-1.5 text-[11px] font-bold text-white shadow-sm"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #fb923c)` }}
          >
            {itemCount}
          </span>
          <span className="text-[13px] text-slate-600 truncate font-medium">{summarizeItems(order.items)}</span>
        </div>

        {/* divider */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* actions */}
        <div className="mt-4 flex items-center gap-3">
          <Link
            to={`/order/${order.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 bg-slate-100/80 hover:bg-slate-200/80 transition-all"
          >
            {delivered ? "View Details" : "Track Order"}
          </Link>
          <button
            type="button"
            onClick={handleReorder}
            disabled={!delivered}
            title={delivered ? "Add these items back to your cart" : "Available after delivery"}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
            style={{
              background: delivered
                ? `linear-gradient(135deg, ${ACCENT}, #fb923c)`
                : "#c1c9d4",
              boxShadow: delivered ? "0 4px 14px -3px rgba(255,107,0,0.4)" : "none",
            }}
          >
            <Svg d={ICON.refresh} className="w-3.5 h-3.5" />
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Empty orders state ── */
const EmptyOrders = () => (
  <div className="relative text-center py-20 px-6 overflow-hidden">
    {/* background glow */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="h-64 w-64 rounded-full bg-gradient-to-br from-[#ff6b00]/5 to-[#fb923c]/10 blur-3xl" />
    </div>

    <div className="relative">
      <div
        className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[28px] shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(251,146,60,0.15))",
          boxShadow: "0 8px 32px rgba(255,107,0,0.12)",
        }}
      >
        <Svg d={ICON.bag} className="w-10 h-10" style={{ color: ACCENT }} />
      </div>
      <h3 className="font-display font-extrabold text-xl text-slate-900">No orders yet</h3>
      <p className="mt-2 text-sm text-slate-400 max-w-[260px] mx-auto leading-relaxed">
        Your order history will appear here once you place your first order.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-2xl text-white text-sm font-bold transition-all hover:brightness-110 active:scale-[0.97]"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
          boxShadow: "0 8px 32px -6px rgba(255,107,0,0.45)",
        }}
      >
        Browse Restaurants
        <Svg d={ICON.chevronRight} className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

/* ── Tabs ── */
const TABS = [
  { label: "My Orders", icon: ICON.bag },
  { label: "Account", icon: ICON.settings },
];

const TabBar = ({ active, onChange }) => (
  <div className="flex gap-1.5 p-1.5 bg-slate-100 rounded-[20px]">
    {TABS.map((tab) => {
      const isActive = active === tab.label;
      return (
        <button
          key={tab.label}
          type="button"
          onClick={() => onChange(tab.label)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-[16px] text-sm font-semibold transition-all duration-300 ${
            isActive
              ? "text-white shadow-lg"
              : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
          }`}
          style={
            isActive
              ? {
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  boxShadow: "0 4px 16px -2px rgba(255,107,0,0.35)",
                }
              : undefined
          }
        >
          <Svg d={tab.icon} className="w-4 h-4" />
          {tab.label}
        </button>
      );
    })}
  </div>
);

/* ── Logged-out view ── */
const LoggedOutView = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fffaf3] via-[#fdf3e8] to-[#fbe9d8] px-6">
    {/* ambient glows */}
    <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#ffd9a8] to-[#ffe9c4] opacity-50 blur-3xl" />
    <div className="pointer-events-none absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-[#e8590c]/15 to-[#ffc88c]/30 opacity-70 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#fbe3c8] opacity-60 blur-3xl" />

    <div className="relative w-full max-w-md text-center animate-fade-up">
      {/* floating glass card */}
      <div
        className="relative bg-white/50 backdrop-blur-xl rounded-[36px] border border-white/70 p-10 shadow-[0_20px_60px_-16px_rgba(255,107,0,0.15)]"
      >
        <div className="pointer-events-none absolute -top-4 -right-4 h-32 w-32 rounded-full bg-gradient-to-br from-[#ff6b00]/10 to-[#ffc88c]/20 blur-2xl" />

        <div
          className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-[24px] text-white shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #fb923c)`,
            boxShadow: "0 12px 32px -6px rgba(255,107,0,0.4)",
          }}
        >
          <Svg d={ICON.user} className="w-9 h-9" />
        </div>
        <h1 className="font-display text-[1.7rem] font-extrabold tracking-tight text-[#1f1b16]">
          Welcome back!
        </h1>
        <p className="mt-2.5 text-[#8a7e73] text-[0.95rem] leading-relaxed">
          Log in to view your orders, track deliveries, and manage your account.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-bold text-base transition-all hover:brightness-110 active:scale-[0.97]"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              boxShadow: "0 12px 28px -6px rgba(255,107,0,0.5)",
            }}
          >
            Log In
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base bg-white/80 backdrop-blur text-[#e8590c] ring-1 ring-[#e8590c]/15 hover:bg-white transition-all active:scale-[0.97]"
          >
            Create an Account
          </Link>
        </div>
      </div>

      {/* trust row */}
      <div className="mt-8 flex items-center justify-center gap-6 text-xs font-medium text-[#a29a90]">
        <span className="flex items-center gap-1.5">
          <Svg d={ICON.check} className="w-3.5 h-3.5 text-[#16a34a]" />
          Secure checkout
        </span>
        <span className="flex items-center gap-1.5">
          <Svg d={ICON.clock} className="w-3.5 h-3.5" style={{ color: ACCENT }} />
          Live tracking
        </span>
        <span className="flex items-center gap-1.5">
          <Svg d={ICON.star} className="w-3.5 h-3.5" style={{ color: ACCENT }} />
          Members-only deals
        </span>
      </div>
    </div>
  </div>
);

/* ── Main Account Page ── */
const AccountPage = () => {
  const { user, loggedIn, logout } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((s) => s.orders?.orders || []);
  const [activeTab, setActiveTab] = useState("My Orders");

  useEffect(() => {
    if (!loggedIn) return undefined;
    let cancelled = false;
    fetchOrders()
      .then((orders) => {
        if (!cancelled) dispatch(setOrders(orders));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [loggedIn, dispatch]);

  const [, forceTick] = useReducer((x) => x + 1, 0);
  const hasActiveOrders = orders.some((o) => !isDelivered(o));
  useEffect(() => {
    if (!hasActiveOrders) return undefined;
    const t = setInterval(forceTick, 5000);
    return () => clearInterval(t);
  }, [hasActiveOrders]);

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  if (!loggedIn) return <LoggedOutView />;

  const initial = (user?.name || "U").trim().charAt(0).toUpperCase();
  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) => !isDelivered(o)).length;
  const deliveredOrders = totalOrders - activeOrders;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* ── Profile Hero ── */}
      <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-8">
        <div className="flex items-center gap-5">
          {/* avatar */}
          <div className="relative shrink-0">
            <div
              className="h-[76px] w-[76px] rounded-full grid place-items-center text-white font-display font-extrabold text-3xl"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #fb923c)`,
                boxShadow: "0 8px 24px rgba(255,107,0,0.3)",
              }}
            >
              {initial}
            </div>
            {/* online dot */}
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#f8f8f8]" />
          </div>

          {/* name + email */}
          <div className="min-w-0">
            <h1 className="font-display font-extrabold text-[1.65rem] leading-tight tracking-tight text-slate-900 truncate">
              {user.name}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5 truncate font-medium">{user.email}</p>
          </div>
        </div>

        {/* stats row */}
        <div className="mt-7 grid grid-cols-3 gap-3">
          {[
            { label: "Total Orders", value: totalOrders, icon: ICON.bag },
            { label: "Active", value: activeOrders, icon: ICON.clock },
            { label: "Delivered", value: deliveredOrders, icon: ICON.check },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[20px] px-4 py-3.5 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #fb923c)` }}
                >
                  <Svg d={stat.icon} className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-display font-extrabold text-xl leading-none text-slate-900 tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14">
        <TabBar active={activeTab} onChange={setActiveTab} />

        {activeTab === "My Orders" && (
          <div className="mt-6">
            {orders.length === 0 ? (
              <EmptyOrders />
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <OrderCard key={o.id} order={o} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Account" && (
          <div className="mt-6 space-y-4">
            {/* profile card */}
            <div className="bg-white rounded-[28px] border border-slate-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100/80">
                <h3 className="font-display font-bold text-slate-900 text-[15px]">Profile Information</h3>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] text-white"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, #fb923c)` }}
                  >
                    <Svg d={ICON.user} className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Full Name</p>
                    <p className="text-[15px] font-semibold text-slate-900 truncate mt-0.5">{user.name}</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="flex items-center gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] text-white"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, #fb923c)` }}
                  >
                    <Svg d={ICON.mail} className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Email Address</p>
                    <p className="text-[15px] font-semibold text-slate-900 truncate mt-0.5">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* sign out */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[20px] bg-white border border-red-100 text-red-500 font-semibold text-sm hover:bg-red-50 hover:border-red-200 transition-all active:scale-[0.98] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)]"
            >
              <Svg d={ICON.logout} className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
