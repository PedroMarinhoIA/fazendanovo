import React, { useState } from 'react';
import { TreePine, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PaddockCard from './PaddockCard';
import { showSuccess } from '@/utils/toast';

interface PaddockData {
  id: string;
  name: string;
  sector: string;
  status: 'occupied' | 'available' | 'resting' | 'attention' | 'critical';
  currentAnimals: number;
  capacity: number;
  daysOccupied?: number;
  daysResting?: number;
  lastSaltDate?: string;
  lotNumber?: string;
}

const PaddockGrid = () => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados simulados realistas dos piquetes
  const paddocks: PaddockData[] = [
    // Setor A
    { id: 'A1', name: 'A-1', sector: 'A', status: 'occupied', currentAnimals: 45, capacity: 50, daysOccupied: 25, lastSaltDate: '2024-12-10', lotNumber: '12' },
    { id: 'A2', name: 'A-2', sector: 'A', status: 'available', currentAnimals: 0, capacity: 50, lastSaltDate: '2024-12-15' },
    { id: 'A3', name: 'A-3', sector: 'A', status: 'critical', currentAnimals: 48, capacity: 50, daysOccupied: 35, lastSaltDate: '2024-11-28', lotNumber: '08' },
    { id: 'A4', name: 'A-4', sector: 'A', status: 'resting', currentAnimals: 0, capacity: 45, daysResting: 12, lastSaltDate: '2024-12-18' },
    { id: 'A5', name: 'A-5', sector: 'A', status: 'occupied', currentAnimals: 42, capacity: 45, daysOccupied: 18, lastSaltDate: '2024-12-12', lotNumber: '15' },
    { id: 'A6', name: 'A-6', sector: 'A', status: 'resting', currentAnimals: 0, capacity: 50, daysResting: 8, lastSaltDate: '2024-12-20' },
    { id: 'A7', name: 'A-7', sector: 'A', status: 'attention', currentAnimals: 38, capacity: 40, daysOccupied: 28, lastSaltDate: '2024-12-05', lotNumber: '22' },
    { id: 'A8', name: 'A-8', sector: 'A', status: 'available', currentAnimals: 0, capacity: 45, lastSaltDate: '2024-12-22' },

    // Setor B
    { id: 'B1', name: 'B-1', sector: 'B', status: 'occupied', currentAnimals: 52, capacity: 55, daysOccupied: 22, lastSaltDate: '2024-12-08', lotNumber: '18' },
    { id: 'B2', name: 'B-2', sector: 'B', status: 'available', currentAnimals: 0, capacity: 50, lastSaltDate: '2024-12-19' },
    { id: 'B3', name: 'B-3', sector: 'B', status: 'occupied', currentAnimals: 47, capacity: 50, daysOccupied: 15, lastSaltDate: '2024-12-14', lotNumber: '25' },
    { id: 'B4', name: 'B-4', sector: 'B', status: 'critical', currentAnimals: 44, capacity: 45, daysOccupied: 32, lastSaltDate: '2024-11-25', lotNumber: '11' },
    { id: 'B5', name: 'B-5', sector: 'B', status: 'resting', currentAnimals: 0, capacity: 50, daysResting: 5, lastSaltDate: '2024-12-21' },
    { id: 'B6', name: 'B-6', sector: 'B', status: 'attention', currentAnimals: 41, capacity: 45, daysOccupied: 26, lastSaltDate: '2024-12-02', lotNumber: '19' },
    { id: 'B7', name: 'B-7', sector: 'B', status: 'occupied', currentAnimals: 39, capacity: 40, daysOccupied: 12, lastSaltDate: '2024-12-16', lotNumber: '28' },

    // Setor C
    { id: 'C1', name: 'C-1', sector: 'C', status: 'occupied', currentAnimals: 35, capacity: 40, daysOccupied: 20, lastSaltDate: '2024-12-11', lotNumber: '31' },
    { id: 'C2', name: 'C-2', sector: 'C', status: 'resting', currentAnimals: 0, capacity: 35, daysResting: 4, lastSaltDate: '2024-12-20' },
    { id: 'C3', name: 'C-3', sector: 'C', status: 'available', currentAnimals: 0, capacity: 40, lastSaltDate: '2024-12-17' },
    { id: 'C4', name: 'C-4', sector: 'C', status: 'occupied', currentAnimals: 33, capacity: 35, daysOccupied: 14, lastSaltDate: '2024-12-13', lotNumber: '34' },
    { id: 'C5', name: 'C-5', sector: 'C', status: 'available', currentAnimals: 0, capacity: 40, lastSaltDate: '2024-12-18' }
  ];

  const sectors = ['all', 'A', 'B', 'C'];

  const filteredPaddocks = paddocks.filter(paddock => {
    const matchesSector = selectedSector === 'all' || paddock.sector === selectedSector;
    const matchesSearch = paddock.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const getStatusCounts = () => {
    const counts = {
      critical: paddocks.filter(p => p.status === 'critical').length,
      attention: paddocks.filter(p => p.status === 'attention').length,
      occupied: paddocks.filter(p => p.status === 'occupied').length,
      resting: paddocks.filter(p => p.status === 'resting').length,
      available: paddocks.filter(p => p.status === 'available').length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  const handleMoveLot = (paddockId: string) => {
    const paddock = paddocks.find(p => p.id === paddockId);
    showSuccess(`Iniciando movimentação do Lote ${paddock?.lotNumber} do piquete ${paddock?.name}`);
  };

  const handleAddSalt = (paddockId: string) => {
    const paddock = paddocks.find(p => p.id === paddockId);
    showSuccess(`Sal mineral reposto no piquete ${paddock?.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <TreePine className="h-6 w-6 text-green-600" />
            <span>Gestão de Piquetes</span>
          </h1>
          <p className="text-gray-600">Controle operacional de todos os piquetes da fazenda</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Buscar piquete..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-48"
            />
          </div>

          {/* Filtro por Setor */}
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <div className="flex space-x-1">
              {sectors.map(sector => (
                <Button
                  key={sector}
                  variant={selectedSector === sector ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSector(sector)}
                >
                  {sector === 'all' ? 'Todos' : `Setor ${sector}`}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{statusCounts.critical}</div>
          <div className="text-sm text-red-700">Críticos</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.attention}</div>
          <div className="text-sm text-yellow-700">Atenção</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{statusCounts.occupied}</div>
          <div className="text-sm text-blue-700">Ocupados</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">{statusCounts.resting}</div>
          <div className="text-sm text-orange-700">Descanso</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{statusCounts.available}</div>
          <div className="text-sm text-green-700">Disponíveis</div>
        </div>
      </div>

      {/* Grid de Piquetes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPaddocks.map(paddock => (
          <PaddockCard
            key={paddock.id}
            paddock={paddock}
            onMoveLot={handleMoveLot}
            onAddSalt={handleAddSalt}
          />
        ))}
      </div>

      {/* Resultados da Busca */}
      {searchTerm && (
        <div className="text-center text-gray-600">
          <p>Mostrando {filteredPaddocks.length} piquete(s) para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default PaddockGrid;