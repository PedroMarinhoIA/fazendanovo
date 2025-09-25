import React from 'react';
import { 
  Home, 
  Beef, 
  TreePine, 
  ArrowRightLeft, 
  Droplets, 
  BarChart3,
  Bell,
  Plus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Beef, label: 'Rebanho', path: '/cattle' },
    { icon: TreePine, label: 'Piquetes', path: '/paddocks' },
    { icon: ArrowRightLeft, label: 'Movimentações', path: '/movements' },
    { icon: Droplets, label: 'Sal Mineral', path: '/salt' },
    { icon: BarChart3, label: 'Relatórios', path: '/reports' },
  ];

  const quickActions = [
    { icon: ArrowRightLeft, label: 'Nova Movimentação', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Plus, label: 'Registrar Nascimento', color: 'bg-green-600 hover:bg-green-700' },
    { icon: Droplets, label: 'Repor Sal', color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r">
        {/* Header da Sidebar */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Fazenda Dashboard</h1>
          <p className="text-sm text-gray-600">Controle Operacional</p>
        </div>

        {/* Menu Principal */}
        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    active
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {item.label === 'Dashboard' && active && (
                    <Badge variant="secondary" className="ml-auto">
                      <Bell size={12} className="mr-1" />
                      3
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Ações Rápidas */}
        <div className="p-4 border-t mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Ações Rápidas</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  className={`w-full justify-start text-white ${action.color}`}
                  size="sm"
                >
                  <Icon size={16} className="mr-2" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Status da Fazenda */}
        <div className="p-4 border-t mt-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Sistema Online</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Última atualização: agora</p>
          </div>
        </div>
      </div>

      {/* Área Principal */}
      <div className="flex-1 overflow-auto">
        {/* Header Principal */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {location.pathname === '/' && 'Dashboard Operacional'}
                {location.pathname === '/paddocks' && 'Gestão de Piquetes'}
                {location.pathname === '/cattle' && 'Controle do Rebanho'}
                {location.pathname === '/movements' && 'Movimentações'}
                {location.pathname === '/salt' && 'Sal Mineral'}
                {location.pathname === '/reports' && 'Relatórios'}
              </h2>
              <p className="text-gray-600">
                {location.pathname === '/' && 'Visão geral da fazenda em tempo real'}
                {location.pathname === '/paddocks' && 'Controle operacional de todos os piquetes'}
                {location.pathname === '/cattle' && 'Gestão completa do rebanho'}
                {location.pathname === '/movements' && 'Histórico e planejamento de movimentações'}
                {location.pathname === '/salt' && 'Controle de reposição de sal mineral'}
                {location.pathname === '/reports' && 'Relatórios e análises operacionais'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Operacional
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {new Date().toLocaleDateString('pt-BR')}
                </p>
                <p className="text-xs text-gray-600">
                  {new Date().toLocaleTimeString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;