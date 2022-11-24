import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
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
import Chatbot from '../../components/Chatbot';

const Main: React.FC = () => {
  const [redirect, setRedirect] = useState<string>();
  const [showChatbot, setShowChatbot] = useState<boolean>(false);

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

      <Content>
        {!showChatbot ? (
          <>
            <h2>Bem vindo ao FHP - Find Your Health Professional</h2>

            <p>
              Aqui você poderá entrar em contato com nosso bot e encontrar
              profissionais da saúde conversando diretamente com ele!
            </p>

            <Button
              className="startChat"
              type="button"
              onClick={() => setShowChatbot(true)}
            >
              Iniciar chat
            </Button>
          </>
        ) : (
          <Chatbot />
        )}
      </Content>
    </Container>
  );
};

export default Main;
