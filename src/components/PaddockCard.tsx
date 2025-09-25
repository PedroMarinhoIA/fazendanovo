import React from 'react';
import { 
  ArrowRightLeft, 
  Droplets, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface PaddockCardProps {
  paddock: PaddockData;
  onMoveLot?: (paddockId: string) => void;
  onAddSalt?: (paddockId: string) => void;
}

const PaddockCard = ({ paddock, onMoveLot, onAddSalt }: PaddockCardProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'critical':
        return {
          color: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
          badgeColor: 'bg-red-100 text-red-800',
          icon: AlertTriangle,
          iconColor: 'text-red-600',
          label: 'Crítico'
        };
      case 'attention':
        return {
          color: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-800',
          badgeColor: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          iconColor: 'text-yellow-600',
          label: 'Atenção'
        };
      case 'occupied':
        return {
          color: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-800',
          badgeColor: 'bg-blue-100 text-blue-800',
          icon: Users,
          iconColor: 'text-blue-600',
          label: 'Ocupado'
        };
      case 'resting':
        return {
          color: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-800',
          badgeColor: 'bg-orange-100 text-orange-800',
          icon: Clock,
          iconColor: 'text-orange-600',
          label: 'Descanso'
        };
      case 'available':
        return {
          color: 'bg-green-50 border-green-200',
          textColor: 'text-green-800',
          badgeColor: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600',
          label: 'Disponível'
        };
      default:
        return {
          color: 'bg-gray-50 border-gray-200',
          textColor: 'text-gray-800',
          badgeColor: 'bg-gray-100 text-gray-800',
          icon: Clock,
          iconColor: 'text-gray-600',
          label: 'Indefinido'
        };
    }
  };

  const statusConfig = getStatusConfig(paddock.status);
  const StatusIcon = statusConfig.icon;

  const getDaysText = () => {
    if (paddock.status === 'occupied' || paddock.status === 'attention' || paddock.status === 'critical') {
      return `${paddock.daysOccupied} dias ocupado`;
    }
    if (paddock.status === 'resting') {
      return `${paddock.daysResting} dias descanso`;
    }
    return 'Disponível';
  };

  const getSaltStatus = () => {
    if (!paddock.lastSaltDate) return null;
    
    const lastSalt = new Date(paddock.lastSaltDate);
    const today = new Date();
    const daysSinceSalt = Math.floor((today.getTime() - lastSalt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceSalt > 15) {
      return { text: `${daysSinceSalt} dias sem sal`, color: 'text-red-600', urgent: true };
    } else if (daysSinceSalt > 10) {
      return { text: `${daysSinceSalt} dias sem sal`, color: 'text-yellow-600', urgent: false };
    } else {
      return { text: `Sal OK (${daysSinceSalt}d)`, color: 'text-green-600', urgent: false };
    }
  };

  const saltStatus = getSaltStatus();

  return (
    <Card className={`${statusConfig.color} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{paddock.name}</CardTitle>
          <Badge className={statusConfig.badgeColor}>
            <StatusIcon size={12} className="mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Setor {paddock.sector}</span>
          <span>•</span>
          <span>Cap: {paddock.capacity}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informações de Ocupação */}
        <div className="space-y-2">
          {paddock.currentAnimals > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users size={16} className={statusConfig.iconColor} />
                <span className="font-medium">{paddock.currentAnimals} animais</span>
              </div>
              {paddock.lotNumber && (
                <Badge variant="outline" className="text-xs">
                  Lote {paddock.lotNumber}
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Clock size={16} className={statusConfig.iconColor} />
            <span className={`text-sm ${statusConfig.textColor}`}>
              {getDaysText()}
            </span>
          </div>

          {/* Status do Sal */}
          {saltStatus && (
            <div className="flex items-center space-x-2">
              <Droplets size={16} className={saltStatus.urgent ? 'text-red-600' : 'text-blue-600'} />
              <span className={`text-sm ${saltStatus.color}`}>
                {saltStatus.text}
              </span>
            </div>
          )}
        </div>

        {/* Ações Rápidas */}
        <div className="flex space-x-2 pt-2 border-t">
          {paddock.currentAnimals > 0 && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onMoveLot?.(paddock.id)}
            >
              <ArrowRightLeft size={14} className="mr-1" />
              Mover
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            className={`flex-1 ${saltStatus?.urgent ? 'border-red-300 text-red-700 hover:bg-red-50' : ''}`}
            onClick={() => onAddSalt?.(paddock.id)}
          >
            <Droplets size={14} className="mr-1" />
            Sal
          </Button>
        </div>

        {/* Alertas Específicos */}
        {paddock.status === 'critical' && (
          <div className="bg-red-100 border border-red-200 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={14} className="text-red-600" />
              <span className="text-xs text-red-800 font-medium">
                Ação urgente necessária!
              </span>
            </div>
          </div>
        )}

        {paddock.status === 'attention' && (
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <Clock size={14} className="text-yellow-600" />
              <span className="text-xs text-yellow-800">
                Planeje movimentação em breve
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaddockCard;