import React from 'react';
import { 
  Beef, 
  TreePine, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin,
  Clock,
  Droplets,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DashboardContent = () => {
  // Dados simulados realistas
  const totalAnimals = 800;
  const animalsByCategory = {
    cria: 320,
    recria: 280,
    engorda: 200
  };

  const sectors = [
    { name: 'Setor A', animals: 280, paddocks: 8, status: 'normal' },
    { name: 'Setor B', animals: 320, paddocks: 7, status: 'attention' },
    { name: 'Setor C', animals: 200, paddocks: 5, status: 'normal' }
  ];

  const paddockStatus = {
    occupied: 12,
    available: 8,
    total: 20
  };

  const alerts = [
    {
      type: 'critical',
      icon: AlertTriangle,
      title: 'Piquete A-3 ocupado há 35 dias',
      description: 'Limite recomendado: 30 dias',
      action: 'Mover lote urgente'
    },
    {
      type: 'warning',
      icon: Droplets,
      title: 'Área Social B sem sal há 18 dias',
      description: 'Última reposição: 05/12/2024',
      action: 'Repor sal mineral'
    },
    {
      type: 'info',
      icon: Clock,
      title: 'Piquete C-2 com pouco descanso',
      description: 'Apenas 5 dias de descanso',
      action: 'Verificar alternativas'
    }
  ];

  const recentMovements = [
    {
      date: '23/12/2024',
      time: '14:30',
      action: 'Movimentação',
      description: 'Lote 15 (45 animais) - Piquete B-2 → Piquete C-1',
      type: 'movement'
    },
    {
      date: '23/12/2024',
      time: '09:15',
      action: 'Nascimento',
      description: '2 bezerros nascidos no Setor A',
      type: 'birth'
    },
    {
      date: '22/12/2024',
      time: '16:45',
      action: 'Sal Mineral',
      description: 'Reposição na Área Social A (50kg)',
      type: 'salt'
    },
    {
      date: '22/12/2024',
      time: '11:20',
      action: 'Movimentação',
      description: 'Lote 8 (38 animais) - Piquete A-4 → Piquete B-1',
      type: 'movement'
    }
  ];

  const monthlyStats = {
    births: 15,
    deaths: 2,
    sales: 25,
    balance: -12 // nascimentos - mortes - vendas
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIconColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'birth': return <ArrowUp className="text-green-600" size={16} />;
      case 'movement': return <ArrowDown className="text-blue-600" size={16} />;
      case 'salt': return <Droplets className="text-orange-600" size={16} />;
      default: return <Minus className="text-gray-600" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de Animais */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Animais</CardTitle>
            <Beef className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{totalAnimals}</div>
            <p className="text-xs text-muted-foreground">cabeças no projeto</p>
          </CardContent>
        </Card>

        {/* Status dos Piquetes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Piquetes</CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              {paddockStatus.occupied}/{paddockStatus.total}
            </div>
            <p className="text-xs text-muted-foreground">ocupados / total</p>
          </CardContent>
        </Card>

        {/* Alertas Ativos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">requerem atenção</p>
          </CardContent>
        </Card>

        {/* Saldo do Mês */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${monthlyStats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {monthlyStats.balance > 0 ? '+' : ''}{monthlyStats.balance}
            </div>
            <p className="text-xs text-muted-foreground">animais (nasc. - mortes - vendas)</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Distribuição por Categoria</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">{animalsByCategory.cria}</div>
              <div className="text-sm text-green-600">Cria</div>
              <div className="text-xs text-gray-500">
                {((animalsByCategory.cria / totalAnimals) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{animalsByCategory.recria}</div>
              <div className="text-sm text-blue-600">Recria</div>
              <div className="text-xs text-gray-500">
                {((animalsByCategory.recria / totalAnimals) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-700">{animalsByCategory.engorda}</div>
              <div className="text-sm text-orange-600">Engorda</div>
              <div className="text-xs text-gray-500">
                {((animalsByCategory.engorda / totalAnimals) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas Críticos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Alertas Críticos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <Alert key={index} className={getAlertColor(alert.type)}>
                  <Icon className={`h-4 w-4 ${getAlertIconColor(alert.type)}`} />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-gray-600">{alert.description}</div>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {alert.action}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Setores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Distribuição por Setores</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectors.map((sector, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{sector.name}</div>
                    <div className="text-sm text-gray-600">{sector.paddocks} piquetes</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{sector.animals}</div>
                    <div className="text-xs text-gray-500">animais</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Movimentações Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Movimentações Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMovements.map((movement, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="mt-1">
                    {getMovementIcon(movement.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{movement.action}</div>
                      <div className="text-xs text-gray-500">
                        {movement.date} {movement.time}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{movement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas do Mês */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Estatísticas do Mês</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{monthlyStats.births}</div>
              <div className="text-sm text-green-700">Nascimentos</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{monthlyStats.deaths}</div>
              <div className="text-sm text-red-700">Mortes</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.sales}</div>
              <div className="text-sm text-blue-700">Vendas</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${monthlyStats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {monthlyStats.balance > 0 ? '+' : ''}{monthlyStats.balance}
              </div>
              <div className="text-sm text-gray-700">Saldo</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;