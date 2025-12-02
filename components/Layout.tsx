import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  PieChart, 
  FolderKanban, 
  Users, 
  FileText, 
  Settings,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import { Page, NavItem } from '../types';

interface LayoutProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { id: Page.ANALYTICS, label: 'Analytics', icon: PieChart },
  { id: Page.PROJECTS, label: 'Projects', icon: FolderKanban },
  { id: Page.TEAM, label: 'Team', icon: Users },
  { id: Page.DOCUMENTS, label: 'Documents', icon: FileText },
  { id: Page.SETTINGS, label: 'Settings', icon: Settings },
];

export const Layout: React.FC<LayoutProps> = ({ activePage, onNavigate, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900">Nexus</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center px-3 py-2">
            <img
              src="https://picsum.photos/100/100"
              alt="User"
              className="w-8 h-8 rounded-full bg-gray-200"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Alex Morgan</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Nexus</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{activePage}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-1.5 border border-gray-200 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-colors"
              />
            </div>
            
            <button className="hidden md:block text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="ml-4 text-gray-500 hover:text-gray-700 md:hidden focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex items-center pl-4 border-l border-gray-200">
               <img
                  src="https://picsum.photos/100/100"
                  alt="User"
                  className="w-8 h-8 rounded-full bg-gray-200 cursor-pointer"
                />
            </div>
          </div>
        </header>

        {/* Page Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
           <div className="max-w-7xl mx-auto">
             {children}
           </div>
        </main>
      </div>
    </div>
  );
};
