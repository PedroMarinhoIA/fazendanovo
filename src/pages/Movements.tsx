import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import MovementHistory from '@/components/MovementHistory';

const Movements = () => {
  return (
    <DashboardLayout>
      <MovementHistory />
    </DashboardLayout>
  );
};

export default Movements;