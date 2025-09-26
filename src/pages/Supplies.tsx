import React, { useState } from 'react';
import { Plus, Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/DashboardLayout';
import { showSuccess } from '@/utils/toast';

interface Supply {
  id: string;
  type: 'sal' | 'vitamina';
  area: string;
  lastRefill: string;
  quantity: number;
  status: 'ok' | 'attention' | 'critical';
  daysWithoutRefill: number;
  estimatedConsumption: number;
}

const Supplies: React.FC = () => {
  const [supplies, setSupplies] = useState<Supply[]>([
    {
      id: '1',
      type: 'sal',
      area: 'Área Social A',
      lastRefill: '2024-12-15',
      quantity: 45,
      status: 'ok',
      daysWithoutRefill: 5,
      estimatedConsumption: 2.5
    },
    {
      id: '2',
      type: 'sal',
      area: 'Área Social B',
      lastRefill: '2024-12-08',
      quantity: 20,
      status: 'attention',
      daysWithoutRefill: 12,
      estimatedConsumption: 3.0
    },
    {
      id: '3',
      type: 'sal',
      area: 'Área Social C',
      lastRefill: '2024-11-28',
      quantity: 5,
      status: 'critical',
      daysWithoutRefill: 18,
      estimatedConsumption: 2.8
    },
    {
      id: '4',
      type: 'vitamina',
      area: 'Depósito Central',
      lastRefill: '2024-12-10',
      quantity: 15,
      status: 'attention',
      daysWithoutRefill: 10,
      estimatedConsumption: 1.2
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-100 text-green-800 border-green-200';
      case 'attention': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <CheckCircle className="h-4 w-4" />;
      case 'attention': return <Clock className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ok': return 'OK';
      case 'attention': return 'Atenção';
      case 'critical': return 'Crítico';
      default: return 'Normal';
    }
  };

  const handleRefill = (supply: Supply) => {
    setSelectedSupply(supply);
    setIsDialogOpen(true);
  };

  const submitRefill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupply) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const quantity = Number(formData.get('quantity'));

    setSupplies(prev => prev.map(supply => 
      supply.id === selectedSupply.id 
        ? {
            ...supply,
            quantity: supply.quantity + quantity,
            lastRefill: new Date().toISOString().split('T')[0],
            daysWithoutRefill: 0,
            status: 'ok' as const
          }
        : supply
    ));

    showSuccess(`${selectedSupply.type === 'sal' ? 'Sal mineral' : 'Vitaminas'} reposto(a) com sucesso na ${selectedSupply.area}!`);
    setIsDialogOpen(false);
    setSelectedSupply(null);
  };

  const salSupplies = supplies.filter(s => s.type === 'sal');
  const vitaminSupplies = supplies.filter(s => s.type === 'vitamina');

  const criticalCount = supplies.filter(s => s.status === 'critical').length;
  const attentionCount = supplies.filter(s => s.status === 'attention').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <Package className="h-6 w-6 text-purple-600" />
              <span>Controle de Insumos</span>
            </h1>
            <p className="text-gray-600">Gestão de sal mineral e vitaminas</p>
          </div>
        </div>

        {/* Resumo de Alertas */}
        {(criticalCount > 0 || attentionCount > 0) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">
                {criticalCount > 0 && `${criticalCount} área(s) crítica(s)`}
                {criticalCount > 0 && attentionCount > 0 && ' • '}
                {attentionCount > 0 && `${attentionCount} área(s) precisam de atenção`}
              </span>
            </div>
          </div>
        )}

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{supplies.length}</div>
            <div className="text-sm text-blue-700">Total de Áreas</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{supplies.filter(s => s.status === 'ok').length}</div>
            <div className="text-sm text-green-700">Em Dia</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">{attentionCount}</div>
            <div className="text-sm text-yellow-700">Atenção</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
            <div className="text-sm text-red-700">Críticos</div>
          </div>
        </div>

        {/* Sal Mineral */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Sal Mineral</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salSupplies.map((supply) => (
              <Card key={supply.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{supply.area}</CardTitle>
                    <Badge className={getStatusColor(supply.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(supply.status)}
                        <span>{getStatusText(supply.status)}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Quantidade</p>
                      <p className="font-semibold">{supply.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Última reposição</p>
                      <p className="font-semibold">
                        {new Date(supply.lastRefill).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dias sem reposição</p>
                      <p className="font-semibold">{supply.daysWithoutRefill} dias</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Consumo/dia</p>
                      <p className="font-semibold">{supply.estimatedConsumption} kg</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleRefill(supply)}
                    className="w-full"
                    variant={supply.status === 'critical' ? 'destructive' : 'default'}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Repor Sal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vitaminas */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Vitaminas</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vitaminSupplies.map((supply) => (
              <Card key={supply.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{supply.area}</CardTitle>
                    <Badge className={getStatusColor(supply.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(supply.status)}
                        <span>{getStatusText(supply.status)}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Quantidade</p>
                      <p className="font-semibold">{supply.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Última reposição</p>
                      <p className="font-semibold">
                        {new Date(supply.lastRefill).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dias sem reposição</p>
                      <p className="font-semibold">{supply.daysWithoutRefill} dias</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Consumo/dia</p>
                      <p className="font-semibold">{supply.estimatedConsumption} kg</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleRefill(supply)}
                    className="w-full"
                    variant={supply.status === 'critical' ? 'destructive' : 'default'}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Repor Vitaminas
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialog de Reposição */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Repor {selectedSupply?.type === 'sal' ? 'Sal Mineral' : 'Vitaminas'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={submitRefill} className="space-y-4">
              <div>
                <Label htmlFor="area">Área</Label>
                <Input 
                  id="area" 
                  value={selectedSupply?.area || ''} 
                  disabled 
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Label htmlFor="quantity">Quantidade Adicionada (kg)</Label>
                <Input 
                  id="quantity" 
                  name="quantity"
                  type="number" 
                  step="0.1"
                  min="0"
                  placeholder="Ex: 50.0"
                  required 
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Confirmar Reposição
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Supplies;