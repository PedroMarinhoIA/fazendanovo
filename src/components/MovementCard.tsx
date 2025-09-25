import React from 'react';
import { 
  ArrowRightLeft, 
  Plus, 
  Minus, 
  Calendar,
  Clock,
  User,
  MapPin,
  Beef
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface MovementCardProps {
  movement: MovementData;
}

const MovementCard = ({ movement }: MovementCardProps) => {
  const getMovementConfig = (type: string) => {
    switch (type) {
      case 'movement':
        return {
          icon: ArrowRightLeft,
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600',
          badgeColor: 'bg-blue-100 text-blue-800',
          label: 'Movimentação'
        };
      case 'birth':
        return {
          icon: Plus,
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600',
          badgeColor: 'bg-green-100 text-green-800',
          label: 'Nascimento'
        };
      case 'sale':
        return {
          icon: Minus,
          color: 'bg-orange-50 border-orange-200',
          iconColor: 'text-orange-600',
          badgeColor: 'bg-orange-100 text-orange-800',
          label: 'Venda'
        };
      case 'death':
        return {
          icon: Minus,
          color: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600',
          badgeColor: 'bg-red-100 text-red-800',
          label: 'Morte'
        };
      case 'salt':
        return {
          icon: Calendar,
          color: 'bg-purple-50 border-purple-200',
          iconColor: 'text-purple-600',
          badgeColor: 'bg-purple-100 text-purple-800',
          label: 'Sal Mineral'
        };
      default:
        return {
          icon: Clock,
          color: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-600',
          badgeColor: 'bg-gray-100 text-gray-800',
          label: 'Outro'
        };
    }
  };

  const config = getMovementConfig(movement.type);
  const Icon = config.icon;

  const formatMovementText = () => {
    if (movement.type === 'movement' && movement.fromPaddock && movement.toPaddock) {
      return `${movement.fromPaddock} → ${movement.toPaddock}`;
    }
    return movement.description;
  };

  return (
    <Card className={`${config.color} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-white`}>
              <Icon size={20} className={config.iconColor} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Badge className={config.badgeColor}>
                  {config.label}
                </Badge>
                {movement.lotNumber && (
                  <Badge variant="outline" className="text-xs">
                    Lote {movement.lotNumber}
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {movement.date} às {movement.time}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-sm font-medium">
              <Beef size={14} className={config.iconColor} />
              <span>{movement.animalCount}</span>
            </div>
            <div className="text-xs text-gray-500">
              {movement.animalCount === 1 ? 'animal' : 'animais'}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Descrição da Movimentação */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin size={14} className={config.iconColor} />
            <span className="text-sm font-medium">{formatMovementText()}</span>
          </div>
          
          {movement.description !== formatMovementText() && (
            <div className="text-sm text-gray-600 pl-6">
              {movement.description}
            </div>
          )}
        </div>

        {/* Operador */}
        <div className="flex items-center space-x-2">
          <User size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">Por: {movement.operator}</span>
        </div>

        {/* Notas (se houver) */}
        {movement.notes && (
          <div className="bg-white bg-opacity-50 rounded-lg p-2 border">
            <div className="text-xs text-gray-500 mb-1">Observações:</div>
            <div className="text-sm text-gray-700">{movement.notes}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovementCard;