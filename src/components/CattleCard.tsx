import React from 'react';
import { 
  Tag, 
  MapPin, 
  Calendar, 
  Weight, 
  Heart,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AnimalData {
  id: string;
  earTag: string;
  name?: string;
  category: 'cria' | 'recria' | 'engorda';
  age: number; // em meses
  weight: number; // em kg
  currentPaddock: string;
  lotNumber: string;
  healthStatus: 'healthy' | 'observation' | 'treatment' | 'dead';
  lastWeightDate: string;
  birthDate: string;
  gender: 'male' | 'female';
  breed?: string;
}

interface CattleCardProps {
  animal: AnimalData;
  onViewProfile?: (animalId: string) => void;
  onUpdateWeight?: (animalId: string) => void;
  onMove?: (animalId: string) => void;
}

const CattleCard = ({ animal, onViewProfile, onUpdateWeight, onMove }: CattleCardProps) => {
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'cria':
        return {
          color: 'bg-green-50 border-green-200',
          badgeColor: 'bg-green-100 text-green-800',
          label: 'Cria',
          ageRange: '0-12 meses'
        };
      case 'recria':
        return {
          color: 'bg-blue-50 border-blue-200',
          badgeColor: 'bg-blue-100 text-blue-800',
          label: 'Recria',
          ageRange: '12-24 meses'
        };
      case 'engorda':
        return {
          color: 'bg-orange-50 border-orange-200',
          badgeColor: 'bg-orange-100 text-orange-800',
          label: 'Engorda',
          ageRange: '+24 meses'
        };
      default:
        return {
          color: 'bg-gray-50 border-gray-200',
          badgeColor: 'bg-gray-100 text-gray-800',
          label: 'Indefinido',
          ageRange: ''
        };
    }
  };

  const getHealthConfig = (status: string) => {
    switch (status) {
      case 'healthy':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          label: 'Saudável'
        };
      case 'observation':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          label: 'Observação'
        };
      case 'treatment':
        return {
          icon: Heart,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          label: 'Tratamento'
        };
      case 'dead':
        return {
          icon: XCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Morto'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Indefinido'
        };
    }
  };

  const categoryConfig = getCategoryConfig(animal.category);
  const healthConfig = getHealthConfig(animal.healthStatus);
  const HealthIcon = healthConfig.icon;

  const formatAge = (ageInMonths: number) => {
    if (ageInMonths < 12) {
      return `${ageInMonths} meses`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years}a ${months}m` : `${years} anos`;
    }
  };

  const getWeightStatus = () => {
    const lastWeightDate = new Date(animal.lastWeightDate);
    const today = new Date();
    const daysSinceWeigh = Math.floor((today.getTime() - lastWeightDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceWeigh > 90) {
      return { text: `${daysSinceWeigh}d atrás`, color: 'text-red-600', urgent: true };
    } else if (daysSinceWeigh > 60) {
      return { text: `${daysSinceWeigh}d atrás`, color: 'text-yellow-600', urgent: false };
    } else {
      return { text: `${daysSinceWeigh}d atrás`, color: 'text-green-600', urgent: false };
    }
  };

  const weightStatus = getWeightStatus();

  return (
    <Card className={`${categoryConfig.color} hover:shadow-md transition-shadow ${animal.healthStatus === 'dead' ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-gray-600" />
            <span className="font-bold text-lg">{animal.earTag}</span>
            {animal.name && (
              <span className="text-sm text-gray-600">({animal.name})</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={categoryConfig.badgeColor}>
              {categoryConfig.label}
            </Badge>
            <div className={`p-1 rounded-full ${healthConfig.bgColor}`}>
              <HealthIcon size={12} className={healthConfig.color} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{animal.gender === 'male' ? '♂' : '♀'}</span>
          <span>•</span>
          <span>{formatAge(animal.age)}</span>
          {animal.breed && (
            <>
              <span>•</span>
              <span>{animal.breed}</span>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informações Principais */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Weight size={14} className="text-gray-500" />
            <div>
              <div className="font-medium">{animal.weight}kg</div>
              <div className={`text-xs ${weightStatus.color}`}>
                {weightStatus.text}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin size={14} className="text-gray-500" />
            <div>
              <div className="font-medium">{animal.currentPaddock}</div>
              <div className="text-xs text-gray-500">
                Lote {animal.lotNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Status de Saúde */}
        <div className="flex items-center space-x-2">
          <HealthIcon size={14} className={healthConfig.color} />
          <span className={`text-sm ${healthConfig.color}`}>
            {healthConfig.label}
          </span>
        </div>

        {/* Data de Nascimento */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>Nascido em {animal.birthDate}</span>
        </div>

        {/* Alertas */}
        {weightStatus.urgent && (
          <div className="bg-red-100 border border-red-200 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <AlertCircle size={12} className="text-red-600" />
              <span className="text-xs text-red-800">
                Peso desatualizado há mais de 90 dias
              </span>
            </div>
          </div>
        )}

        {animal.healthStatus === 'treatment' && (
          <div className="bg-red-100 border border-red-200 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <Heart size={12} className="text-red-600" />
              <span className="text-xs text-red-800">
                Animal em tratamento médico
              </span>
            </div>
          </div>
        )}

        {animal.healthStatus === 'observation' && (
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <AlertCircle size={12} className="text-yellow-600" />
              <span className="text-xs text-yellow-800">
                Animal sob observação
              </span>
            </div>
          </div>
        )}

        {/* Ações Rápidas */}
        {animal.healthStatus !== 'dead' && (
          <div className="flex space-x-2 pt-2 border-t">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => onViewProfile?.(animal.id)}
            >
              Ver Perfil
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`flex-1 text-xs ${weightStatus.urgent ? 'border-red-300 text-red-700' : ''}`}
              onClick={() => onUpdateWeight?.(animal.id)}
            >
              Pesar
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => onMove?.(animal.id)}
            >
              Mover
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CattleCard;