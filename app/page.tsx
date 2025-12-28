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
  Menu,
  Home as HomeIcon,
  FileText
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-gray-100 overflow-hidden relative">

      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl">
            <Package className="w-8 h-8" />
            <span>StockControl</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard />} label="Inicio" active />
          <NavItem icon={<Package />} label="Inventario" />
          <NavItem icon={<ShoppingCart />} label="Pedidos" />
          <NavItem icon={<Users />} label="Clientes" />
          <NavItem icon={<TrendingUp />} label="Reportes" />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <NavItem icon={<Settings />} label="Configuración" />
          <div className="mt-4 flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">JD</div>
            <div className="text-sm">
              <p className="font-medium">Jared Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="md:hidden font-bold text-indigo-600 text-lg flex items-center gap-2">
              <Package className="w-6 h-6" />
              <span>StockApp</span>
            </div>
            <div className="hidden md:block text-xl font-semibold">Resumen General</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-black text-sm w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard
              title="Inventario Total"
              value="24,592"
              trend="+12%"
              trendUp={true}
              icon={<Package className="text-blue-600" />}
              color="bg-blue-50 dark:bg-blue-900/20"
            />
            <StatCard
              title="Stock Bajo"
              value="12"
              trend="Revisar"
              trendUp={false}
              icon={<AlertTriangle className="text-amber-600" />}
              color="bg-amber-50 dark:bg-amber-900/20"
              alert
            />
            <StatCard
              title="Pedidos Activos"
              value="48"
              trend="+5%"
              trendUp={true}
              icon={<ShoppingCart className="text-emerald-600" />}
              color="bg-emerald-50 dark:bg-emerald-900/20"
            />
            <StatCard
              title="Ingresos"
              value="$128k"
              trend="+18%"
              trendUp={true}
              icon={<TrendingUp className="text-indigo-600" />}
              color="bg-indigo-50 dark:bg-indigo-900/20"
            />
          </div>

          {/* Recent Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Movimientos Recientes</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                  Ver Todo <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-zinc-800">
                      <th className="pb-3 pl-2 md:pl-4">Producto</th>
                      <th className="pb-3 hidden sm:table-cell">Tipo</th>
                      <th className="pb-3">Cant.</th>
                      <th className="pb-3 text-right pr-2 md:pr-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
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
            <div className="flex flex-col gap-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 gap-3">
                  <ActionButton onClick={() => setIsAddStockOpen(true)} icon={<Package className="w-5 h-5" />} label="Agregar Stock" primary />
                  <ActionButton icon={<ShoppingCart className="w-5 h-5" />} label="Nuevo Pedido" />
                  <ActionButton icon={<Users className="w-5 h-5" />} label="Venta Rápida" />
                  <ActionButton icon={<TrendingUp className="w-5 h-5" />} label="Ver Reporte" />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Alertas de Stock</h3>
                <div className="space-y-3">
                  <AlertItem name="Polera Blanca (L)" stock={3} />
                  <AlertItem name="Hoodie Negro (M)" stock={1} />
                  <AlertItem name="Film DTF A3" stock={0} critical />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex justify-around p-3 z-40 pb-safe">
        <MobileNavItem icon={<HomeIcon />} label="Inicio" active />
        <MobileNavItem icon={<Package />} label="Inventario" />
        <div className="relative -top-6">
          <button
            onClick={() => setIsAddStockOpen(true)}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <MobileNavItem icon={<ShoppingCart />} label="Pedidos" />
        <MobileNavItem icon={<Settings />} label="Ajustes" />
      </nav>

      {/* Add Stock Modal */}
      {isAddStockOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddStockOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-1">Agregar Stock</h2>
            <p className="text-gray-500 mb-6 text-sm">Registrar entrada de mercancía</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Producto</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Escanea o busca producto..." className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Cantidad</label>
                  <div className="flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
                    <button className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-800">-</button>
                    <input type="number" className="w-full text-center bg-transparent outline-none" defaultValue={1} />
                    <button className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-800">+</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Tipo</label>
                  <select className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 outline-none">
                    <option>Compra</option>
                    <option>Ajuste</option>
                    <option>Devolución</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Notas</label>
                <textarea rows={3} placeholder="Detalles opcionales..." className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
              </div>

              <button
                onClick={() => setIsAddStockOpen(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all mt-2"
              >
                Confirmar Ingreso
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Sub-components
function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'}`}>
      {React.cloneElement(icon, { size: 20 })}
      <span>{label}</span>
    </a>
  )
}

function MobileNavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}>
      {React.cloneElement(icon, { size: 24 })}
      <span className="text-[10px] font-medium">{label}</span>
    </a>
  )
}

function StatCard({ title, value, trend, trendUp, icon, color, alert = false }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 lg:p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${alert ? 'text-amber-600' : trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          {alert ? <AlertTriangle size={12} /> : trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{trend}</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
  )
}

function TransactionRow({ name, type, qty, date, status }: any) {
  const isPositive = qty.startsWith('+');
  return (
    <tr className="group hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
      <td className="py-4 pl-2 md:pl-4">
        <div className="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">{name}</div>
        <div className="text-xs text-gray-500">{date}</div>
      </td>
      <td className="py-4 text-sm text-gray-600 dark:text-gray-400 hidden sm:table-cell">{type}</td>
      <td className={`py-4 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-gray-600'}`}>{qty}</td>
      <td className="py-4 text-right pr-2 md:pr-4">
        <span className={`px-2 py-1 rounded-full text-[10px] md:text-xs font-medium ${status === 'Completado' ? 'bg-emerald-100 text-emerald-700' :
            status === 'Reembolsado' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
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
      className={`flex flex-col items-center justify-center gap-2 p-3 lg:p-4 rounded-xl border transition-all ${primary
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 active:scale-95'
          : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-zinc-800 active:scale-95'
        }`}>
      {icon}
      <span className="text-[10px] lg:text-xs font-medium text-center leading-tight">{label}</span>
    </button>
  )
}

function AlertItem({ name, stock, critical = false }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${critical ? 'bg-red-500' : 'bg-amber-500'}`}></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
      </div>
      <span className={`text-xs font-bold ${critical ? 'text-red-600' : 'text-amber-600'}`}>
        {stock} unid.
      </span>
    </div>
  )
}
