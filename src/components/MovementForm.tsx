import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Plus, 
  Minus, 
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { showSuccess, showError } from '@/utils/toast';

interface MovementFormProps {
  onClose: () => void;
  onSubmit: (movementData: any) => void;
}

const MovementForm = ({ onClose, onSubmit }: MovementFormProps) => {
  const [formData, setFormData] = useState({
    type: '',
    fromPaddock: '',
    toPaddock: '',
    animalCount: '',
    lotNumber: '',
    notes: '',
    operator: 'João Silva' // Simulado
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Dados simulados dos piquetes
  const paddocks = [
    { id: 'A1', name: 'A-1', status: 'occupied', currentAnimals: 45, capacity: 50 },
    { id: 'A2', name: 'A-2', status: 'available', currentAnimals: 0, capacity: 50 },
    { id: 'A3', name: 'A-3', status: 'critical', currentAnimals: 48, capacity: 50 },
    { id: 'A4', name: 'A-4', status: 'resting', currentAnimals: 0, capacity: 45 },
    { id: 'B1', name: 'B-1', status: 'occupied', currentAnimals: 52, capacity: 55 },
    { id: 'B2', name: 'B-2', status: 'available', currentAnimals: 0, capacity: 50 },
    { id: 'B3', name: 'B-3', status: 'occupied', currentAnimals: 47, capacity: 50 },
    { id: 'C1', name: 'C-1', status: 'occupied', currentAnimals: 35, capacity: 40 },
    { id: 'C2', name: 'C-2', status: 'resting', currentAnimals: 0, capacity: 35 },
    { id: 'C3', name: 'C-3', status: 'available', currentAnimals: 0, capacity: 40 }
  ];

  const movementTypes = [
    { value: 'movement', label: 'Movimentação de Lote', icon: ArrowRightLeft },
    { value: 'birth', label: 'Nascimento', icon: Plus },
    { value: 'sale', label: 'Venda', icon: Minus },
    { value: 'death', label: 'Morte', icon: Minus }
  ];

  const getAvailablePaddocks = (type: 'from' | 'to') => {
    if (type === 'from') {
      return paddocks.filter(p => p.currentAnimals > 0);
    } else {
      return paddocks.filter(p => p.status === 'available' || p.status === 'resting');
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.type) {
      errors.push('Selecione o tipo de movimentação');
    }

    if (formData.type === 'movement') {
      if (!formData.fromPaddock) {
        errors.push('Selecione o piquete de origem');
      }
      if (!formData.toPaddock) {
        errors.push('Selecione o piquete de destino');
      }
      if (formData.fromPaddock === formData.toPaddock) {
        errors.push('Piquete de origem e destino devem ser diferentes');
      }
    }

    if (!formData.animalCount || parseInt(formData.animalCount) <= 0) {
      errors.push('Informe a quantidade de animais');
    }

    // Validação de capacidade
    if (formData.type === 'movement' && formData.toPaddock && formData.animalCount) {
      const toPaddock = paddocks.find(p => p.id === formData.toPaddock);
      const animalCount = parseInt(formData.animalCount);
      
      if (toPaddock && (toPaddock.currentAnimals + animalCount) > toPaddock.capacity) {
        errors.push(`Capacidade do piquete ${toPaddock.name} será excedida (${toPaddock.currentAnimals + animalCount}/${toPaddock.capacity})`);
      }
    }

    // Validação de quantidade disponível
    if (formData.type === 'movement' && formData.fromPaddock && formData.animalCount) {
      const fromPaddock = paddocks.find(p => p.id === formData.fromPaddock);
      const animalCount = parseInt(formData.animalCount);
      
      if (fromPaddock && animalCount > fromPaddock.currentAnimals) {
        errors.push(`Piquete ${fromPaddock.name} tem apenas ${fromPaddock.currentAnimals} animais`);
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Corrija os erros antes de continuar');
      return;
    }

    const movementData = {
      ...formData,
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR'),
      id: Date.now().toString()
    };

    onSubmit(movementData);
    showSuccess('Movimentação registrada com sucesso!');
    onClose();
  };

  const getSelectedPaddockInfo = (paddockId: string) => {
    const paddock = paddocks.find(p => p.id === paddockId);
    if (!paddock) return null;

    return (
      <div className="text-xs text-gray-600 mt-1">
        {paddock.currentAnimals}/{paddock.capacity} animais • Status: {
          paddock.status === 'occupied' ? 'Ocupado' :
          paddock.status === 'available' ? 'Disponível' :
          paddock.status === 'resting' ? 'Descanso' : 'Crítico'
        }
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ArrowRightLeft className="h-5 w-5 text-blue-600" />
          <span>Nova Movimentação</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Movimentação */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Movimentação</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {movementTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <Icon size={16} />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Campos específicos para movimentação */}
          {formData.type === 'movement' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Piquete de Origem */}
              <div className="space-y-2">
                <Label htmlFor="fromPaddock">Piquete de Origem</Label>
                <Select value={formData.fromPaddock} onValueChange={(value) => setFormData({...formData, fromPaddock: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione origem" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailablePaddocks('from').map(paddock => (
                      <SelectItem key={paddock.id} value={paddock.id}>
                        <div>
                          <div>{paddock.name}</div>
                          <div className="text-xs text-gray-500">
                            {paddock.currentAnimals} animais
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.fromPaddock && getSelectedPaddockInfo(formData.fromPaddock)}
              </div>

              {/* Piquete de Destino */}
              <div className="space-y-2">
                <Label htmlFor="toPaddock">Piquete de Destino</Label>
                <Select value={formData.toPaddock} onValueChange={(value) => setFormData({...formData, toPaddock: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailablePaddocks('to').map(paddock => (
                      <SelectItem key={paddock.id} value={paddock.id}>
                        <div>
                          <div>{paddock.name}</div>
                          <div className="text-xs text-gray-500">
                            Capacidade: {paddock.capacity}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.toPaddock && getSelectedPaddockInfo(formData.toPaddock)}
              </div>
            </div>
          )}

          {/* Campos para nascimento */}
          {formData.type === 'birth' && (
            <div className="space-y-2">
              <Label htmlFor="toPaddock">Piquete (Local do Nascimento)</Label>
              <Select value={formData.toPaddock} onValueChange={(value) => setFormData({...formData, toPaddock: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o piquete" />
                </SelectTrigger>
                <SelectContent>
                  {paddocks.filter(p => p.currentAnimals > 0).map(paddock => (
                    <SelectItem key={paddock.id} value={paddock.id}>
                      {paddock.name} ({paddock.currentAnimals} animais)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quantidade de Animais */}
            <div className="space-y-2">
              <Label htmlFor="animalCount">
                {formData.type === 'birth' ? 'Nascimentos' : 'Quantidade de Animais'}
              </Label>
              <Input
                id="animalCount"
                type="number"
                min="1"
                value={formData.animalCount}
                onChange={(e) => setFormData({...formData, animalCount: e.target.value})}
                placeholder="Ex: 25"
              />
            </div>

            {/* Número do Lote */}
            <div className="space-y-2">
              <Label htmlFor="lotNumber">Número do Lote (Opcional)</Label>
              <Input
                id="lotNumber"
                value={formData.lotNumber}
                onChange={(e) => setFormData({...formData, lotNumber: e.target.value})}
                placeholder="Ex: 15"
              />
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações (Opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Informações adicionais sobre a movimentação..."
              rows={3}
            />
          </div>

          {/* Erros de Validação */}
          {validationErrors.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="space-y-1">
                  {validationErrors.map((error, index) => (
                    <div key={index} className="text-red-800 text-sm">• {error}</div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              <CheckCircle size={16} className="mr-2" />
              Confirmar Movimentação
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MovementForm;