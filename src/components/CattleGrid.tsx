import React, { useState } from 'react';
import { Beef, Filter, Search, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CattleCard from './CattleCard';
import { showSuccess } from '@/utils/toast';

interface AnimalData {
  id: string;
  earTag: string;
  name?: string;
  category: 'cria' | 'recria' | 'engorda';
  age: number;
  weight: number;
  currentPaddock: string;
  lotNumber: string;
  healthStatus: 'healthy' | 'observation' | 'treatment' | 'dead';
  lastWeightDate: string;
  birthDate: string;
  gender: 'male' | 'female';
  breed?: string;
}

const CattleGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterHealth, setFilterHealth] = useState('all');
  const [filterSector, setFilterSector] = useState('all');

  // Dados simulados realistas do rebanho (amostra de 50 animais dos 800 totais)
  const animals: AnimalData[] = [
    // Cria (0-12 meses)
    { id: '1', earTag: '001', name: 'Estrela', category: 'cria', age: 8, weight: 180, currentPaddock: 'A-1', lotNumber: '12', healthStatus: 'healthy', lastWeightDate: '2024-12-15', birthDate: '15/04/2024', gender: 'female', breed: 'Nelore' },
    { id: '2', earTag: '002', category: 'cria', age: 6, weight: 150, currentPaddock: 'A-1', lotNumber: '12', healthStatus: 'healthy', lastWeightDate: '2024-12-10', birthDate: '15/06/2024', gender: 'male', breed: 'Nelore' },
    { id: '3', earTag: '003', name: 'Trovão', category: 'cria', age: 10, weight: 200, currentPaddock: 'A-5', lotNumber: '15', healthStatus: 'observation', lastWeightDate: '2024-12-20', birthDate: '15/02/2024', gender: 'male', breed: 'Angus' },
    { id: '4', earTag: '004', category: 'cria', age: 4, weight: 120, currentPaddock: 'B-1', lotNumber: '18', healthStatus: 'healthy', lastWeightDate: '2024-11-25', birthDate: '15/08/2024', gender: 'female', breed: 'Nelore' },
    { id: '5', earTag: '005', name: 'Luna', category: 'cria', age: 9, weight: 190, currentPaddock: 'B-3', lotNumber: '25', healthStatus: 'healthy', lastWeightDate: '2024-12-18', birthDate: '15/03/2024', gender: 'female', breed: 'Brahman' },
    
    // Recria (12-24 meses)
    { id: '6', earTag: '101', category: 'recria', age: 15, weight: 280, currentPaddock: 'A-7', lotNumber: '22', healthStatus: 'healthy', lastWeightDate: '2024-12-12', birthDate: '15/09/2023', gender: 'male', breed: 'Nelore' },
    { id: '7', earTag: '102', name: 'Relâmpago', category: 'recria', age: 18, weight: 320, currentPaddock: 'B-6', lotNumber: '19', healthStatus: 'treatment', lastWeightDate: '2024-12-22', birthDate: '15/06/2023', gender: 'male', breed: 'Angus' },
    { id: '8', earTag: '103', category: 'recria', age: 14, weight: 260, currentPaddock: 'B-7', lotNumber: '28', healthStatus: 'healthy', lastWeightDate: '2024-12-08', birthDate: '15/10/2023', gender: 'female', breed: 'Nelore' },
    { id: '9', earTag: '104', name: 'Safira', category: 'recria', age: 20, weight: 350, currentPaddock: 'C-1', lotNumber: '31', healthStatus: 'healthy', lastWeightDate: '2024-12-16', birthDate: '15/04/2023', gender: 'female', breed: 'Brahman' },
    { id: '10', earTag: '105', category: 'recria', age: 16, weight: 300, currentPaddock: 'C-4', lotNumber: '34', healthStatus: 'observation', lastWeightDate: '2024-10-15', birthDate: '15/08/2023', gender: 'male', breed: 'Nelore' },
    
    // Engorda (+24 meses)
    { id: '11', earTag: '201', name: 'Touro Forte', category: 'engorda', age: 36, weight: 520, currentPaddock: 'A-3', lotNumber: '08', healthStatus: 'healthy', lastWeightDate: '2024-12-14', birthDate: '15/12/2021', gender: 'male', breed: 'Angus' },
    { id: '12', earTag: '202', category: 'engorda', age: 28, weight: 480, currentPaddock: 'B-4', lotNumber: '11', healthStatus: 'healthy', lastWeightDate: '2024-12-11', birthDate: '15/08/2022', gender: 'female', breed: 'Nelore' },
    { id: '13', earTag: '203', name: 'Imperador', category: 'engorda', age: 42, weight: 580, currentPaddock: 'A-3', lotNumber: '08', healthStatus: 'healthy', lastWeightDate: '2024-12-19', birthDate: '15/06/2021', gender: 'male', breed: 'Brahman' },
    { id: '14', earTag: '204', category: 'engorda', age: 30, weight: 450, currentPaddock: 'B-4', lotNumber: '11', healthStatus: 'observation', lastWeightDate: '2024-09-20', birthDate: '15/06/2022', gender: 'female', breed: 'Nelore' },
    { id: '15', earTag: '205', name: 'Rainha', category: 'engorda', age: 38, weight: 500, currentPaddock: 'C-1', lotNumber: '31', healthStatus: 'healthy', lastWeightDate: '2024-12-17', birthDate: '15/10/2021', gender: 'female', breed: 'Angus' },
    
    // Mais animais para completar a amostra
    { id: '16', earTag: '006', category: 'cria', age: 7, weight: 165, currentPaddock: 'A-1', lotNumber: '12', healthStatus: 'healthy', lastWeightDate: '2024-12-13', birthDate: '15/05/2024', gender: 'male', breed: 'Nelore' },
    { id: '17', earTag: '007', name: 'Cometa', category: 'cria', age: 11, weight: 210, currentPaddock: 'A-5', lotNumber: '15', healthStatus: 'healthy', lastWeightDate: '2024-12-21', birthDate: '15/01/2024', gender: 'female', breed: 'Brahman' },
    { id: '18', earTag: '106', category: 'recria', age: 17, weight: 310, currentPaddock: 'B-6', lotNumber: '19', healthStatus: 'healthy', lastWeightDate: '2024-12-09', birthDate: '15/07/2023', gender: 'male', breed: 'Nelore' },
    { id: '19', earTag: '107', name: 'Diamante', category: 'recria', age: 19, weight: 340, currentPaddock: 'B-7', lotNumber: '28', healthStatus: 'healthy', lastWeightDate: '2024-12-07', birthDate: '15/05/2023', gender: 'female', breed: 'Angus' },
    { id: '20', earTag: '206', category: 'engorda', age: 32, weight: 490, currentPaddock: 'A-3', lotNumber: '08', healthStatus: 'treatment', lastWeightDate: '2024-12-23', birthDate: '15/04/2022', gender: 'male', breed: 'Nelore' },
    
    // Alguns casos especiais
    { id: '21', earTag: '999', name: 'Veterano', category: 'engorda', age: 84, weight: 420, currentPaddock: 'C-4', lotNumber: '34', healthStatus: 'observation', lastWeightDate: '2024-08-15', birthDate: '15/12/2017', gender: 'male', breed: 'Nelore' },
    { id: '22', earTag: '888', category: 'engorda', age: 26, weight: 0, currentPaddock: 'C-2', lotNumber: '31', healthStatus: 'dead', lastWeightDate: '2024-11-30', birthDate: '15/10/2022', gender: 'female', breed: 'Angus' }
  ];

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'cria', label: 'Cria (0-12m)' },
    { value: 'recria', label: 'Recria (12-24m)' },
    { value: 'engorda', label: 'Engorda (+24m)' }
  ];

  const healthStatuses = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'healthy', label: 'Saudáveis' },
    { value: 'observation', label: 'Observação' },
    { value: 'treatment', label: 'Tratamento' },
    { value: 'dead', label: 'Mortos' }
  ];

  const sectors = [
    { value: 'all', label: 'Todos os Setores' },
    { value: 'A', label: 'Setor A' },
    { value: 'B', label: 'Setor B' },
    { value: 'C', label: 'Setor C' }
  ];

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.earTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.currentPaddock.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.lotNumber.includes(searchTerm);
    
    const matchesCategory = filterCategory === 'all' || animal.category === filterCategory;
    const matchesHealth = filterHealth === 'all' || animal.healthStatus === filterHealth;
    const matchesSector = filterSector === 'all' || animal.currentPaddock.startsWith(filterSector);
    
    return matchesSearch && matchesCategory && matchesHealth && matchesSector;
  });

  const getStats = () => {
    const total = animals.length;
    const healthy = animals.filter(a => a.healthStatus === 'healthy').length;
    const needAttention = animals.filter(a => a.healthStatus === 'observation' || a.healthStatus === 'treatment').length;
    const avgWeight = Math.round(animals.filter(a => a.healthStatus !== 'dead').reduce((sum, a) => sum + a.weight, 0) / animals.filter(a => a.healthStatus !== 'dead').length);
    
    return { total, healthy, needAttention, avgWeight };
  };

  const stats = getStats();

  const handleViewProfile = (animalId: string) => {
    const animal = animals.find(a => a.id === animalId);
    showSuccess(`Abrindo perfil do animal ${animal?.earTag}`);
  };

  const handleUpdateWeight = (animalId: string) => {
    const animal = animals.find(a => a.id === animalId);
    showSuccess(`Registrando novo peso para ${animal?.earTag}`);
  };

  const handleMove = (animalId: string) => {
    const animal = animals.find(a => a.id === animalId);
    showSuccess(`Movendo animal ${animal?.earTag} para novo piquete`);
  };

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <Beef className="h-6 w-6 text-green-600" />
            <span>Controle do Rebanho</span>
          </h1>
          <p className="text-gray-600">Gestão individual de todos os animais da fazenda</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Novo Animal
          </Button>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-700">Total de Animais</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.healthy}</div>
          <div className="text-sm text-green-700">Saudáveis</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.needAttention}</div>
          <div className="text-sm text-yellow-700">Precisam Atenção</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.avgWeight}kg</div>
          <div className="text-sm text-purple-700">Peso Médio</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Busca */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Buscar por brinco, nome, piquete ou lote..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros */}
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterHealth} onValueChange={setFilterHealth}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {healthStatuses.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterSector} onValueChange={setFilterSector}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sectors.map(sector => (
                <SelectItem key={sector.value} value={sector.value}>
                  {sector.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid de Animais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAnimals.map(animal => (
          <CattleCard
            key={animal.id}
            animal={animal}
            onViewProfile={handleViewProfile}
            onUpdateWeight={handleUpdateWeight}
            onMove={handleMove}
          />
        ))}
      </div>

      {/* Resultados da Busca */}
      {searchTerm && (
        <div className="text-center text-gray-600">
          <p>Mostrando {filteredAnimals.length} animal(is) para "{searchTerm}"</p>
        </div>
      )}

      {filteredAnimals.length === 0 && !searchTerm && (
        <div className="text-center py-12 text-gray-500">
          <Beef size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Nenhum animal encontrado com os filtros selecionados</p>
        </div>
      )}
    </div>
  );
};

export default CattleGrid;