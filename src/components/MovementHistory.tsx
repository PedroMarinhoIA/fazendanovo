import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Plus, 
  Filter, 
  Search, 
  Calendar,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import MovementCard from './MovementCard';
import MovementForm from './MovementForm';
import { showSuccess } from '@/utils/toast';

interface MovementData {
  id: string;
  date: string;
  time: string;
  type: 'movement' | 'birth' | 'sale' | 'death' | 'salt';
  description: string;
  fromPaddock?: string;
  toPaddock?: string;
  animalCount: number;
  lotNumber?: string;
  operator: string;
  notes?: string;
}

const MovementHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Dados simulados de movimentações
  const [movements, setMovements] = useState<MovementData[]>([
    {
      id: '1',
      date: '23/12/2024',
      time: '14:30',
      type: 'movement',
      description: 'Movimentação de lote para rotação de pastagem',
      fromPaddock: 'B-2',
      toPaddock: 'C-1',
      animalCount: 45,
      lotNumber: '15',
      operator: 'João Silva',
      notes: 'Piquete B-2 estava ocupado há 28 dias'
    },
    {
      id: '2',
      date: '23/12/2024',
      time: '09:15',
      type: 'birth',
      description: 'Nascimento de bezerros no Setor A',
      toPaddock: 'A-1',
      animalCount: 2,
      operator: 'Maria Santos',
      notes: 'Ambos os bezerros nasceram saudáveis'
    },
    {
      id: '3',
      date: '22/12/2024',
      time: '16:45',
      type: 'salt',
      description: 'Reposição de sal mineral na Área Social A',
      toPaddock: 'A-Social',
      animalCount: 0,
      operator: 'Carlos Oliveira',
      notes: 'Reposto 50kg de sal mineral'
    },
    {
      id: '4',
      date: '22/12/2024',
      time: '11:20',
      type: 'movement',
      description: 'Transferência para piquete com melhor pastagem',
      fromPaddock: 'A-4',
      toPaddock: 'B-1',
      animalCount: 38,
      lotNumber: '8',
      operator: 'João Silva'
    },
    {
      id: '5',
      date: '21/12/2024',
      time: '08:45',
      type: 'sale',
      description: 'Venda de animais para frigorífico',
      fromPaddock: 'C-4',
      animalCount: 25,
      lotNumber: '22',
      operator: 'Maria Santos',
      notes: 'Animais prontos para abate - peso médio 480kg'
    },
    {
      id: '6',
      date: '20/12/2024',
      time: '15:30',
      type: 'movement',
      description: 'Movimentação preventiva - piquete crítico',
      fromPaddock: 'A-3',
      toPaddock: 'B-5',
      animalCount: 42,
      lotNumber: '12',
      operator: 'Carlos Oliveira',
      notes: 'Piquete A-3 ocupado há 32 dias - movimentação urgente'
    },
    {
      id: '7',
      date: '19/12/2024',
      time: '10:15',
      type: 'birth',
      description: 'Nascimento no Setor B',
      toPaddock: 'B-3',
      animalCount: 1,
      operator: 'João Silva'
    },
    {
      id: '8',
      date: '18/12/2024',
      time: '13:20',
      type: 'death',
      description: 'Morte natural - animal idoso',
      fromPaddock: 'C-2',
      animalCount: 1,
      operator: 'Maria Santos',
      notes: 'Animal de 12 anos - morte natural'
    }
  ]);

  const filterTypes = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'movement', label: 'Movimentações' },
    { value: 'birth', label: 'Nascimentos' },
    { value: 'sale', label: 'Vendas' },
    { value: 'death', label: 'Mortes' },
    { value: 'salt', label: 'Sal Mineral' }
  ];

  const dateFilters = [
    { value: 'all', label: 'Todas as Datas' },
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' }
  ];

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.fromPaddock?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.toPaddock?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.lotNumber?.includes(searchTerm);
    
    const matchesType = filterType === 'all' || movement.type === filterType;
    
    // Filtro de data simplificado (apenas para demonstração)
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && movement.date === '23/12/2024');
    
    return matchesSearch && matchesType && matchesDate;
  });

  const getMovementStats = () => {
    const today = movements.filter(m => m.date === '23/12/2024');
    const thisWeek = movements.filter(m => ['21/12/2024', '22/12/2024', '23/12/2024'].includes(m.date));
    
    return {
      today: today.length,
      week: thisWeek.length,
      total: movements.length,
      animals: movements.reduce((sum, m) => sum + m.animalCount, 0)
    };
  };

  const stats = getMovementStats();

  const handleNewMovement = (movementData: any) => {
    const newMovement: MovementData = {
      ...movementData,
      id: Date.now().toString()
    };
    
    setMovements([newMovement, ...movements]);
  };

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <ArrowRightLeft className="h-6 w-6 text-blue-600" />
            <span>Movimentações</span>
          </h1>
          <p className="text-gray-600">Histórico completo e nova movimentação</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                Nova Movimentação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <MovementForm 
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleNewMovement}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
          <div className="text-sm text-blue-700">Hoje</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.week}</div>
          <div className="text-sm text-green-700">Esta Semana</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
          <div className="text-sm text-purple-700">Total</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.animals}</div>
          <div className="text-sm text-orange-700">Animais Movidos</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Busca */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Buscar por piquete, lote ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtro por Tipo */}
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Data */}
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-500" />
          <Select value={filterDate} onValueChange={setFilterDate}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateFilters.map(date => (
                <SelectItem key={date.value} value={date.value}>
                  {date.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de Movimentações */}
      <div className="space-y-4">
        {filteredMovements.length > 0 ? (
          filteredMovements.map(movement => (
            <MovementCard key={movement.id} movement={movement} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ArrowRightLeft size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Nenhuma movimentação encontrada</p>
            <p className="text-sm">Tente ajustar os filtros ou criar uma nova movimentação</p>
          </div>
        )}
      </div>

      {/* Resultados da Busca */}
      {searchTerm && (
        <div className="text-center text-gray-600">
          <p>Mostrando {filteredMovements.length} movimentação(ões) para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default MovementHistory;