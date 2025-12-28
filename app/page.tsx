"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  Plus,
  X,
  Home as HomeIcon,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import React, { useState, useActionState, useEffect } from "react";
import { addStockAction } from "./actions";

// Minimalist Toast Component
function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg border animate-in slide-in-from-bottom-5 duration-300 shadow-sm ${type === 'success'
        ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-green-600'
        : 'bg-white dark:bg-zinc-900 border-red-200 dark:border-red-900 text-red-600'
      }`}>
      {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{message}</span>
    </div>
  );
}

const initialState = {
  success: false,
  message: ''
}

export default function Home() {
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);

  // Real Server Action Integration
  const [state, formAction, isPending] = useActionState(addStockAction, initialState);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (state.message) {
      setShowToast(true);
      if (state.success) {
        setIsAddStockOpen(false); // Close modal on success
      }
    }
  }, [state]);

  return (
    <div className="flex h-screen bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden relative selection:bg-zinc-100 dark:selection:bg-zinc-800">

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={state.message}
          type={state.success ? 'success' : 'error'}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r border-zinc-100 dark:border-zinc-900 hidden md:flex flex-col bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-lg flex items-center justify-center">
              <Package size={18} strokeWidth={3} />
            </div>
            <span>StockControl</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <NavItem icon={<LayoutDashboard />} label="Inicio" active />
          <NavItem icon={<Package />} label="Inventario" />
          <NavItem icon={<ShoppingCart />} label="Pedidos" />
          <NavItem icon={<Users />} label="Clientes" />
          <NavItem icon={<TrendingUp />} label="Reportes" />
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-900">
          <NavItem icon={<Settings />} label="Configuración" />
          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">JD</div>
            <div className="text-sm">
              <p className="font-medium leading-none">Jared Doe</p>
              <p className="text-xs text-zinc-500 mt-1">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pb-20 md:pb-0 bg-white dark:bg-black">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="md:hidden font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-md flex items-center justify-center">
                <Package size={14} strokeWidth={3} />
              </div>
            </div>
            <h1 className="text-lg font-medium tracking-tight">Resumen General</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-200 transition-colors" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border-none outline-none text-sm w-48 focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800 transition-all placeholder:text-zinc-400"
              />
            </div>
            <button className="relative p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard
              title="Inventario Total"
              value="24,592"
              trend="+12%"
              trendUp={true}
            />
            <StatCard
              title="Stock Bajo"
              value="12"
              trend="Revisar"
              trendUp={false}
              alert
            />
            <StatCard
              title="Pedidos Activos"
              value="48"
              trend="+5%"
              trendUp={true}
            />
            <StatCard
              title="Ingresos (Mes)"
              value="$128k"
              trend="+18%"
              trendUp={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Movimientos Recientes</h3>
                <button className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors">
                  Ver todos <ArrowRight size={14} />
                </button>
              </div>

              <div className="border border-zinc-100 dark:border-zinc-900 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50/50 dark:bg-zinc-900/50">
                    <tr className="text-left text-zinc-500">
                      <th className="py-3 pl-4 font-medium">Producto</th>
                      <th className="py-3 hidden sm:table-cell font-medium">Tipo</th>
                      <th className="py-3 font-medium">Cant.</th>
                      <th className="py-3 text-right pr-4 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900 bg-white dark:bg-black">
                    <TransactionRow name="Naruto Sage Mode" type="Venta" qty="-2" date="Hoy, 10:42 AM" status="Completado" />
                    <TransactionRow name="Dragon Ball Hoodie" type="Devolución" qty="+1" date="Hoy, 09:15 AM" status="Reembolsado" />
                    <TransactionRow name="Gorra One Piece" type="Venta" qty="-1" date="Ayer" status="Completado" />
                    <TransactionRow name="Tela Algodón" type="Compra" qty="+50m" date="Ayer" status="Repuesto" />
                    <TransactionRow name="Sticker SNK" type="Venta" qty="-5" date="24 Oct" status="Completado" />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions / Alerts */}
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 gap-3">
                  <ActionButton onClick={() => setIsAddStockOpen(true)} icon={<Plus size={18} />} label="Agregar Stock" primary />
                  <ActionButton icon={<ShoppingCart size={18} />} label="Nuevo Pedido" />
                  <ActionButton icon={<Users size={18} />} label="Cliente" />
                  <ActionButton icon={<FileText size={18} />} label="Reporte" />
                </div>
              </div>

              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">Alertas de Stock</h3>
                <div className="space-y-2">
                  <AlertItem name="Polera Blanca (L)" stock={3} />
                  <AlertItem name="Hoodie Negro (M)" stock={1} />
                  <AlertItem name="Film DTF A3" stock={0} critical />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation - Minimalist */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-md text-white rounded-2xl flex justify-between px-6 py-4 shadow-2xl z-40">
        <MobileNavItem icon={<HomeIcon size={20} />} active />
        <MobileNavItem icon={<Package size={20} />} />

        {/* Floating Action Button (Integrated) */}
        <button
          onClick={() => setIsAddStockOpen(true)}
          className="bg-white text-black rounded-xl p-2 -mt-8 shadow-lg active:scale-95 transition-transform"
        >
          <Plus size={24} />
        </button>

        <MobileNavItem icon={<ShoppingCart size={20} />} />
        <MobileNavItem icon={<Settings size={20} />} />
      </nav>

      {/* Add Stock Modal - Minimalist */}
      {isAddStockOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-100/10 dark:bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-950 rounded-2xl w-full max-w-md border border-zinc-100 dark:border-zinc-800 shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddStockOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-1">Agregar Stock</h2>
            <p className="text-zinc-500 text-sm mb-6">Registrar entrada manual</p>

            <form action={formAction} className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase text-zinc-400 mb-1.5 tracking-wider">Producto</label>
                <input
                  name="product"
                  required
                  type="text"
                  placeholder="Buscar por nombre o SKU..."
                  className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700 transition-all font-medium placeholder:font-normal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase text-zinc-400 mb-1.5 tracking-wider">Cantidad</label>
                  <input
                    name="quantity"
                    required
                    type="number"
                    min="1"
                    defaultValue={1}
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700 font-medium text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase text-zinc-400 mb-1.5 tracking-wider">Tipo</label>
                  <div className="relative">
                    <select name="type" className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700 appearance-none font-medium">
                      <option>Compra</option>
                      <option>Ajuste</option>
                      <option>Devolución</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <TrendingDown size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase text-zinc-400 mb-1.5 tracking-wider">Notas (Opcional)</label>
                <textarea name="notes" rows={2} placeholder="..." className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700 resize-none font-medium placeholder:font-normal"></textarea>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-black font-medium py-3.5 rounded-xl transition-all mt-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? 'Guardando...' : 'Confirmar Ingreso'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Sub-components
function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${active ? 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
      {React.cloneElement(icon, { size: 18 })}
      <span className="text-sm">{label}</span>
    </a>
  )
}

function MobileNavItem({ icon, active = false }: { icon: any, active?: boolean }) {
  return (
    <a href="#" className={`p-2 transition-all ${active ? 'text-white' : 'text-zinc-500'}`}>
      {icon}
    </a>
  )
}

function StatCard({ title, value, trend, trendUp, alert = false }: any) {
  return (
    <div className="bg-zinc-50/50 dark:bg-zinc-900/20 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-900 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-2">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">{title}</p>
        {alert && <AlertCircle size={16} className="text-amber-500" />}
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">{value}</h3>
        <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${alert ? 'text-amber-600' : trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          <span>{trend}</span>
        </div>
      </div>
    </div>
  )
}

function TransactionRow({ name, type, qty, date, status }: any) {
  const isPositive = qty.startsWith('+');
  return (
    <tr className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
      <td className="py-3 pl-4">
        <div className="font-medium text-zinc-900 dark:text-zinc-100">{name}</div>
        <div className="text-xs text-zinc-400">{date}</div>
      </td>
      <td className="py-3 text-zinc-500 hidden sm:table-cell">{type}</td>
      <td className={`py-3 font-medium ${isPositive ? 'text-emerald-600' : 'text-zinc-600'}`}>{qty}</td>
      <td className="py-3 text-right pr-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${status === 'Completado' ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/20' :
            status === 'Reembolsado' ? 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/20' :
              'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
          }`}>
          {status}
        </span>
      </td>
    </tr>
  )
}

function ActionButton({ icon, label, primary = false, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all ${primary
          ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 text-white dark:text-black hover:bg-black'
          : 'bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700'
        }`}>
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  )
}

function AlertItem({ name, stock, critical = false }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900">
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-1.5 rounded-full ${critical ? 'bg-red-500' : 'bg-amber-500'}`}></div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
      </div>
      <span className={`text-xs font-bold ${critical ? 'text-red-600' : 'text-amber-600'}`}>
        {stock} unid.
      </span>
    </div>
  )
}
