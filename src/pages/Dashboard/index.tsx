import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, Redirect, Switch } from 'react-router-dom';
import VerticalMenu from '../../components/VerticalMenu';
import { useAuth } from '../../hooks/auth';
import MenuItem from '../../models/MenuItem';
import User from '../../models/User';
import Route from '../../routes/route';
import UserService from '../../services/UserService';
import PaymentMethods from '../PaymentMethods';
import PersonalInformations from '../PersonalInformations';
import ServiceLocations from '../ServiceLocations';
import ServiceLocationsForm from '../ServiceLocationsForm';
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
        <Link className="arrowLeft" to="/">
          <FiArrowLeft />
          Voltar para o início
        </Link>

        <hr
          style={{
            background: '#0000001f',
            border: 'none',
            height: '2px',
            marginTop: '24px',
          }}
        />
      </VerticalMenu>
      {redirect && <Redirect to={redirect} />}
      <Switch>
        <Route path={`${PATH_PREFIX}`} component={PersonalInformations} exact />
        <Route
          path={`${PATH_PREFIX}/dadosPessoais`}
          component={PersonalInformations}
        />
        <Route path={`${PATH_PREFIX}/especialidades`} component={Specialties} />
        <Route
          path={`${PATH_PREFIX}/locaisAtuacao/novo`}
          component={ServiceLocationsForm}
          exact
        />
        <Route
          path={`${PATH_PREFIX}/locaisAtuacao/editar/:id`}
          component={ServiceLocationsForm}
          exact
        />
        <Route
          path={`${PATH_PREFIX}/locaisAtuacao`}
          component={ServiceLocations}
        />
      </Switch>
    </Container>
  );
};
export default Dashboard;
