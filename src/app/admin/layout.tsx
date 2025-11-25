'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Package,
  Users,
  ShoppingCart,
  Tags,
  LayoutDashboard,
  LogOut,
  CreditCard,
  Truck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Home', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Product', icon: Package },
    { href: '/admin/categories', label: 'Category', icon: Tags },
    { href: '/admin/users', label: 'User', icon: Users },
    { href: '/admin/orders', label: 'Order', icon: ShoppingCart },
    { href: '/admin/payments', label: 'Payment', icon: CreditCard },
    { href: '/admin/shipments', label: 'Shipment', icon: Truck },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Cz</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin</h1>
                <p className="text-xs text-gray-500">Cartzie Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block"
              >
                View Store
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Farima Konaré</p>
                  <p className="text-xs text-gray-500">hello@panaya.com</p>
                </div>
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  F
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex w-full pt-[72px]">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex fixed top-[72px] bottom-0 w-64 bg-white border-r border-gray-200 flex-col">
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all w-full">
              <LogOut className="w-5 h-5 text-gray-500" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <nav className="grid grid-cols-7 gap-1 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition ${
                    active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mb-[4.5rem] md:mb-0 overflow-x-auto">
          <div className="min-w-[320px] max-w-7xl mx-auto h-[calc(100vh-72px)] overflow-y-auto pb-24 md:pb-8">
            <div className="pr-4">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
