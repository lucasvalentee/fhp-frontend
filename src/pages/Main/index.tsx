import React, { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderInformation,
  HeaderButtons,
  ButtonSignUpContainer,
  ButtonSignUp,
  Content,
  UserContainer,
  UserButtonContainer,
} from './styles';

import medicalIcon from '../../assets/healthcare_hospital_medical_icon.png';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Main: React.FC = () => {
  const [redirect, setRedirect] = useState<string>();

  const { user, signOut } = useAuth();

  return (
    <Container>
      {redirect && <Redirect to={redirect} />}

      <Header>
        <HeaderInformation>
          <img src={medicalIcon} alt="Medical Icon" />
          <h1>Encontre profissionais da saúde com facilidade!</h1>
        </HeaderInformation>
        <HeaderButtons>
          {user ? (
            <UserContainer>
              <p>Bem vindo {user.username}</p>
              <UserButtonContainer>
                <Button onClick={() => setRedirect('/dashboard')}>
                  Acessar perfil
                </Button>
                <Button onClick={() => signOut()}>Logout</Button>
              </UserButtonContainer>
            </UserContainer>
          ) : (
            <>
              <ButtonSignUpContainer>
                <p>Quer fazer parte?</p>
                <ButtonSignUp onClick={() => setRedirect('/signup')}>
                  Cadastre-se!
                </ButtonSignUp>
              </ButtonSignUpContainer>
              <Button onClick={() => setRedirect('/signin')}>
                Faça seu Login
              </Button>
            </>
          )}
        </HeaderButtons>
      </Header>
    </Container>
  );
};

export default Main;
