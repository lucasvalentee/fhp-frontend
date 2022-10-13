import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => (
  <>
    <h1>Dashboard</h1>
    <Link to="/">
      <FiArrowLeft />
      Voltar para o início
    </Link>
  </>
);

export default Dashboard;
