import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Beef,
  TreePine,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  PaddockOccupancyChart, 
  CattleGrowthChart, 
  CategoryDistributionChart, 
  WeightGainChart
} from './ReportCharts';

const ReportsOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // KPIs principais (removido o financeiro)
  const kpis = [
    {
      title: 'Total de Animais',
      value: '800',
      change: '+2.5%',
      trend: 'up',
      icon: Beef,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'vs mês anterior'
    },
    {
      title: 'Taxa de Ocupação',
      value: '60%',
      change: '-5%',
      trend: 'down',
      icon: TreePine,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'dos piquetes'
    },
    {
      title: 'Ganho Médio/Dia',
      value: '1.1 kg',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'por animal'
    }
  ];

  // Métricas operacionais
  const operationalMetrics = [
    { label: 'Nascimentos (Dez)', value: 15, target: 18, percentage: 83 },
    { label: 'Mortalidade (Dez)', value: 2, target: 3, percentage: 67, inverted: true },
    { label: 'Vendas (Dez)', value: 25, target: 20, percentage: 125 },
    { label: 'Rotação Média', value: 22, target: 25, percentage: 88, unit: 'dias' }
  ];

  // Alertas e recomendações
  const alerts = [
    {
      type: 'warning',
      title: 'Piquetes Críticos',
      description: '2 piquetes ocupados há mais de 30 dias',
      action: 'Planejar movimentação urgente'
    },
    {
      type: 'success',
      title: 'Meta de Vendas',
      description: 'Dezembro superou meta em 25%',
      action: 'Manter estratégia atual'
    },
    {
      type: 'info',
      title: 'Época de Chuvas',
      description: 'Preparar para aumento de nascimentos',
      action: 'Revisar capacidade dos piquetes'
    }
  ];

  const periods = [
    { value: '3months', label: 'Últimos 3 Meses' },
    { value: '6months', label: 'Últimos 6 Meses' },
    { value: '12months', label: 'Últimos 12 Meses' },
    { value: 'year', label: 'Ano Atual' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-green-200 bg-green-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📊';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <span>Relatórios e Análises</span>
          </h1>
          <p className="text-gray-600">Insights estratégicos para tomada de decisão</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map(period => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs Principais - agora com 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{kpi.value}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`flex items-center space-x-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                  <span className="text-xs text-gray-500">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos Principais - removida aba financeira */}
      <Tabs defaultValue="operational" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operational">Operacional</TabsTrigger>
          <TabsTrigger value="zootechnical">Zootécnico</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ocupação de Piquetes</CardTitle>
              </CardHeader>
              <CardContent>
                <PaddockOccupancyChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução do Rebanho</CardTitle>
              </CardHeader>
              <CardContent>
                <CattleGrowthChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zootechnical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryDistributionChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ganho de Peso por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <WeightGainChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Métricas de Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {operationalMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-600">{metric.label}</div>
                    <div className="text-2xl font-bold">
                      {metric.value}{metric.unit && ` ${metric.unit}`}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Meta: {metric.target}{metric.unit && ` ${metric.unit}`}
                      </span>
                      <Badge 
                        variant={
                          (metric.inverted ? metric.percentage <= 100 : metric.percentage >= 100) 
                            ? "default" 
                            : "secondary"
                        }
                      >
                        {metric.percentage}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (metric.inverted ? metric.percentage <= 100 : metric.percentage >= 100)
                            ? 'bg-green-500' 
                            : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Alertas e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Alertas e Recomendações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1">
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{alert.description}</div>
                    <div className="text-sm font-medium text-blue-600 mt-2">
                      💡 {alert.action}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsOverview;