import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

// Dados simulados para os gráficos
const paddockOccupancyData = [
  { name: 'Jan', ocupados: 12, disponíveis: 8 },
  { name: 'Fev', ocupados: 14, disponíveis: 6 },
  { name: 'Mar', ocupados: 13, disponíveis: 7 },
  { name: 'Abr', ocupados: 15, disponíveis: 5 },
  { name: 'Mai', ocupados: 16, disponíveis: 4 },
  { name: 'Jun', ocupados: 14, disponíveis: 6 },
  { name: 'Jul', ocupados: 13, disponíveis: 7 },
  { name: 'Ago', ocupados: 15, disponíveis: 5 },
  { name: 'Set', ocupados: 12, disponíveis: 8 },
  { name: 'Out', ocupados: 14, disponíveis: 6 },
  { name: 'Nov', ocupados: 13, disponíveis: 7 },
  { name: 'Dez', ocupados: 12, disponíveis: 8 }
];

const cattleGrowthData = [
  { name: 'Jan', total: 780, nascimentos: 12, mortes: 3, vendas: 15 },
  { name: 'Fev', total: 785, nascimentos: 18, mortes: 2, vendas: 11 },
  { name: 'Mar', total: 792, nascimentos: 15, mortes: 1, vendas: 7 },
  { name: 'Abr', total: 798, nascimentos: 14, mortes: 2, vendas: 6 },
  { name: 'Mai', total: 805, nascimentos: 16, mortes: 1, vendas: 8 },
  { name: 'Jun', total: 810, nascimentos: 13, mortes: 2, vendas: 6 },
  { name: 'Jul', total: 815, nascimentos: 17, mortes: 1, vendas: 11 },
  { name: 'Ago', total: 820, nascimentos: 19, mortes: 2, vendas: 12 },
  { name: 'Set', total: 825, nascimentos: 14, mortes: 1, vendas: 8 },
  { name: 'Out', total: 830, nascimentos: 16, mortes: 2, vendas: 9 },
  { name: 'Nov', total: 835, nascimentos: 18, mortes: 1, vendas: 12 },
  { name: 'Dez', total: 800, nascimentos: 15, mortes: 2, vendas: 25 }
];

const categoryDistributionData = [
  { name: 'Cria (0-12m)', value: 320, color: '#10B981' },
  { name: 'Recria (12-24m)', value: 280, color: '#3B82F6' },
  { name: 'Engorda (+24m)', value: 200, color: '#F59E0B' }
];

const weightGainData = [
  { name: 'Jan', cria: 0.8, recria: 1.2, engorda: 0.9 },
  { name: 'Fev', cria: 0.9, recria: 1.3, engorda: 1.0 },
  { name: 'Mar', cria: 1.0, recria: 1.4, engorda: 1.1 },
  { name: 'Abr', cria: 1.1, recria: 1.5, engorda: 1.2 },
  { name: 'Mai', cria: 1.0, recria: 1.3, engorda: 1.0 },
  { name: 'Jun', cria: 0.9, recria: 1.2, engorda: 0.9 },
  { name: 'Jul', cria: 0.8, recria: 1.1, engorda: 0.8 },
  { name: 'Ago', cria: 0.9, recria: 1.2, engorda: 0.9 },
  { name: 'Set', cria: 1.0, recria: 1.3, engorda: 1.0 },
  { name: 'Out', cria: 1.1, recria: 1.4, engorda: 1.1 },
  { name: 'Nov', cria: 1.2, recria: 1.5, engorda: 1.2 },
  { name: 'Dez', cria: 1.0, recria: 1.3, engorda: 1.0 }
];

const revenueData = [
  { name: 'Jan', receita: 45000, custos: 12000, lucro: 33000 },
  { name: 'Fev', receita: 38000, custos: 11500, lucro: 26500 },
  { name: 'Mar', receita: 42000, custos: 12200, lucro: 29800 },
  { name: 'Abr', receita: 35000, custos: 11800, lucro: 23200 },
  { name: 'Mai', receita: 48000, custos: 13000, lucro: 35000 },
  { name: 'Jun', receita: 52000, custos: 12800, lucro: 39200 },
  { name: 'Jul', receita: 58000, custos: 13500, lucro: 44500 },
  { name: 'Ago', receita: 62000, custos: 14000, lucro: 48000 },
  { name: 'Set', receita: 55000, custos: 13200, lucro: 41800 },
  { name: 'Out', receita: 49000, custos: 12900, lucro: 36100 },
  { name: 'Nov', receita: 53000, custos: 13400, lucro: 39600 },
  { name: 'Dez', receita: 125000, custos: 15000, lucro: 110000 }
];

export const PaddockOccupancyChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={paddockOccupancyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="ocupados" fill="#3B82F6" name="Ocupados" />
      <Bar dataKey="disponíveis" fill="#10B981" name="Disponíveis" />
    </BarChart>
  </ResponsiveContainer>
);

export const CattleGrowthChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={cattleGrowthData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={3} name="Total de Animais" />
      <Line type="monotone" dataKey="nascimentos" stroke="#10B981" strokeWidth={2} name="Nascimentos" />
      <Line type="monotone" dataKey="vendas" stroke="#F59E0B" strokeWidth={2} name="Vendas" />
    </LineChart>
  </ResponsiveContainer>
);

export const CategoryDistributionChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={categoryDistributionData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {categoryDistributionData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export const WeightGainChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={weightGainData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value) => [`${value} kg/dia`, '']} />
      <Area type="monotone" dataKey="cria" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Cria" />
      <Area type="monotone" dataKey="recria" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Recria" />
      <Area type="monotone" dataKey="engorda" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Engorda" />
    </AreaChart>
  </ResponsiveContainer>
);

export const RevenueChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={revenueData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
      <Bar dataKey="receita" fill="#10B981" name="Receita" />
      <Bar dataKey="custos" fill="#EF4444" name="Custos" />
      <Bar dataKey="lucro" fill="#8B5CF6" name="Lucro" />
    </BarChart>
  </ResponsiveContainer>
);