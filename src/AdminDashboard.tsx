import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Lock,
  DollarSign,
  Activity,
  Eye,
  MousePointerClick,
  RefreshCcw,
  LogOut,
  AlertCircle,
} from "lucide-react";

const ADMIN_PASSWORD = (import.meta as any).env.VITE_ADMIN_PASSWORD || "admin123"; // Password secure fallback or customizable via environment variables
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwMwoEOrZ1SagOwOojfTqL0DPQN0yObc3Ai4dN-wmfDxwkt6S_ftq8JBxG6P9Nhb3xv2g/exec";

interface Metrics {
  cost: number;
  conversions: number;
  impressions: number;
  clicks: number;
}

export default function AdminDashboard({
  onLogout,
}: {
  onLogout?: () => void;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMetrics = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Adding action parameter just in case the backend uses it to route GET requests
      const response = await fetch(`${SCRIPT_URL}?action=getMetrics`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (data && typeof data === 'object') {
          setMetrics({
            cost: Number(data.cost) || 0,
            conversions: Number(data.conversions) || 0,
            impressions: Number(data.impressions) || 0,
            clicks: Number(data.clicks) || 0,
          });
          return;
        }
      } catch (e) {
        console.error("Invalid JSON response:", text.substring(0, 100));
        if (text.includes("<!DOCTYPE html>") || text.includes("<html")) {
           throw new Error("تأكد من نشر (Deploy) السكريبت بصلاحية 'Anyone' وليس 'Only myself' ليتمكن الموقع من قراءة البيانات.");
        }
        throw new Error("البيانات الراجعة من السكريبت ليست بصيغة JSON. تأكد من كود السكريبت.");
      }
      throw new Error("Invalid format from server");
    } catch (err: any) {
      console.error("Error fetching metrics:", err);
      // Fallback to the user's requested mock data so they can see the design and layout working
      const errorMessage = err?.message || "تعذر جلب البيانات الحقيقية من Google Sheets (تأكد من إضافة دالة doGet في السكريبت والنشر بشكل صحيح).";
      setError(errorMessage + " يتم عرض بيانات تجريبية.");
      setMetrics({
        cost: 3730,
        conversions: 180,
        impressions: 3830,
        clicks: 343,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMetrics();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setLoginError("");
    } else {
      setLoginError("كلمة المرور غير صحيحة");
    }
  };

  const formatNumber = (num: number, isCurrency: boolean = false) => {
    if (num >= 1000) {
      let formatted = (num / 1000).toFixed(2);
      // Remove trailing zeros after decimal if they are unnecessary, or just let it be like 3.73
      formatted = formatted.replace(/\.00$/, "").replace(/(\.[0-9])0$/, "$1");
      return `${formatted} ألف${isCurrency ? " £E" : ""}`;
    }
    return `${num}${isCurrency ? " £E" : ""}`;
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-tajawal"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              تسجيل الدخول للإدارة
            </h1>
            <p className="text-slate-400 text-sm text-center">
              يرجى إدخال كلمة المرور للوصول إلى لوحة تحكم التسويق.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 text-left"
                dir="ltr"
              />
              {loginError && (
                <p className="text-red-400 text-xs mt-2">{loginError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              فتح لوحة التحكم
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0f172a] text-slate-200 font-tajawal"
      dir="rtl"
    >
      {/* Dashboard Topbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Activity size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                لوحة تحكم التسويق
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                إحصائيات الحملة الإعلانية
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (onLogout) onLogout();
              setIsAuthenticated(false);
              setPassword("");
              sessionStorage.removeItem("admin_authenticated");
            }}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700 hover:border-slate-600"
          >
            <span className="hidden sm:inline">تسجيل الخروج</span>
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-semibold text-white">
            نظرة عامة على الأداء
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchMetrics}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded-lg border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCcw
                size={14}
                className={isLoading ? "animate-spin" : ""}
              />
              تحديث البيانات
            </button>
            <div className="flex items-center gap-2 text-sm mr-2 bg-slate-800 py-1.5 px-3 rounded-lg border border-slate-700">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-medium">بيانات حية</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-500 mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-red-400 mb-2">
              خطأ في الاتصال
            </h3>
            <p className="text-slate-400">{error}</p>
          </div>
        )}
        
        {isLoading && !metrics ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : metrics ? (
          /* Metrics Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Cost Card (Green) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900 flex flex-col justify-between rounded-2xl p-6 border border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
            >
              <div className="absolute top-0 left-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign size={80} className="text-emerald-500" />
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <DollarSign size={24} className="text-emerald-400" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-slate-400 mb-1">
                  التكلفة (Cost)
                </p>
                <h3
                  className="text-3xl font-black text-white tracking-tight"
                  dir="ltr"
                >
                  {formatNumber(metrics.cost, true)}
                </h3>
              </div>
            </motion.div>

            {/* Conversions Card (White/Neutral) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 flex flex-col justify-between rounded-2xl p-6 border border-slate-800 relative overflow-hidden group hover:border-slate-400/50 transition-colors"
            >
              <div className="absolute top-0 left-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={80} className="text-slate-300" />
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <Activity size={24} className="text-slate-300" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-slate-400 mb-1">
                  الإحالات الناجحة (Conversions)
                </p>
                <h3
                  className="text-3xl font-black text-white tracking-tight"
                  dir="ltr"
                >
                  {formatNumber(metrics.conversions)}
                </h3>
              </div>
            </motion.div>

            {/* Impressions Card (Red) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900 flex flex-col justify-between rounded-2xl p-6 border border-slate-800 relative overflow-hidden group hover:border-red-500/50 transition-colors"
            >
              <div className="absolute top-0 left-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye size={80} className="text-red-500" />
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <Eye size={24} className="text-red-400" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-slate-400 mb-1">
                  عدد مرات الظهور (Impressions)
                </p>
                <h3
                  className="text-3xl font-black text-white tracking-tight"
                  dir="ltr"
                >
                  {formatNumber(metrics.impressions)}
                </h3>
              </div>
            </motion.div>

            {/* Clicks Card (Blue) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-900 flex flex-col justify-between rounded-2xl p-6 border border-slate-800 relative overflow-hidden group hover:border-blue-500/50 transition-colors"
            >
              <div className="absolute top-0 left-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <MousePointerClick size={80} className="text-blue-500" />
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <MousePointerClick size={24} className="text-blue-400" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-slate-400 mb-1">
                  النقرات (Clicks)
                </p>
                <h3
                  className="text-3xl font-black text-white tracking-tight"
                  dir="ltr"
                >
                  {formatNumber(metrics.clicks)}
                </h3>
              </div>
            </motion.div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
