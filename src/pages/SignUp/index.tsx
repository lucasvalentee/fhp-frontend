import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Content,
  Background,
  AnimationContainer,
  Checkbox,
  CheckboxContainer,
  CheckboxText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import User from '../../models/User';
import UserService from '../../services/UserService';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [checked, setChecked] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    history.push('/signin');

    addToast({
      type: 'success',
      title: 'Cadastro realizado!',
      description: 'Você já pode fazer seu login no FHP.',
    });
  }, [addToast, history]);

  const onError = useCallback(() => {
    addToast({
      type: 'error',
      title: 'Erro no cadastro',
      description: 'Ocorreu um erro ao realizar seu cadastro, tente novamente.',
    });
  }, [addToast]);

  const handleSubmit = useCallback(
    async (data: User) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Nome obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        if (!checked) {
          addToast({
            type: 'error',
            title: 'Aceite os termos',
            description:
              'Para realizar seu cadastro, você precisa aceitar os termos do aplicativo.',
          });
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await UserService.create(data);

        response ? onSuccess() : onError();
      } catch (err: Yup.ValidationError | any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        onError();
      }
    },
    [addToast, checked, onError, onSuccess],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="username" icon={FiUser} placeholder="Username" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <CheckboxText onClick={() => setChecked(!checked)}>
                Ao clicar em cadastrar, eu concordo que ao vincular minhas
                informações profissionais os dados ficarão visíveis no chatbot
                de forma pública.
              </CheckboxText>
            </CheckboxContainer>

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/signin">
            <FiArrowLeft />
            Voltar para logon
          </Link>

          <Link to="/">
            <FiArrowLeft />
            Voltar para o início
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
