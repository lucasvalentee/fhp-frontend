import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, Redirect, Switch } from 'react-router-dom';
import VerticalMenu from '../../components/VerticalMenu';
import { useAuth } from '../../hooks/auth';
import MenuItem from '../../models/MenuItem';
import Route from '../../routes/route';
import PaymentMethods from '../PaymentMethods';
import PersonalInformations from '../PersonalInformations';
import ServiceLocations from '../ServiceLocations';
import Specialties from '../Specialties';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const [redirect, setRedirect] = useState<string>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const { user, personCpf } = useAuth();

  const PATH_PREFIX = '/dashboard';

  useEffect(() => {
    const disable = !personCpf;

    setMenuItems([
      { title: 'Dados Pessoais', linkTo: `${PATH_PREFIX}/dadosPessoais` },
      {
        title: 'Especialidades',
        linkTo: `${PATH_PREFIX}/especialidades`,
        disable,
      },
      {
        title: 'Locais de Atuação',
        linkTo: `${PATH_PREFIX}/locaisAtuacao`,
        disable,
      },
      {
        title: 'Métodos de Pagamento',
        linkTo: `${PATH_PREFIX}/metodosPagamento`,
        disable,
      },
    ]);
  }, [user, personCpf]);

  useEffect(() => {
    if (window.location.href.endsWith('/dashboard')) {
      setRedirect(`${PATH_PREFIX}/dadosPessoais`);
    }
  }, []);
  return (
    <Container>
      <VerticalMenu
        menuItem={menuItems}
        className="dashboardMenu"
        useLogoutButton
      >
        <Link to="/">
          <FiArrowLeft />
          Voltar para o início
        </Link>
      </VerticalMenu>
      {redirect && <Redirect to={redirect} />}
      <Switch>
        <Route path={`${PATH_PREFIX}`} exact component={PersonalInformations} />
        <Route
          path={`${PATH_PREFIX}/dadosPessoais`}
          component={PersonalInformations}
        />
        <Route path={`${PATH_PREFIX}/especialidades`} component={Specialties} />
        <Route
          path={`${PATH_PREFIX}/locaisAtuacao`}
          component={ServiceLocations}
        />
        <Route
          path={`${PATH_PREFIX}/metodosPagamento`}
          component={PaymentMethods}
        />
      </Switch>
    </Container>
  );
};
export default Dashboard;
