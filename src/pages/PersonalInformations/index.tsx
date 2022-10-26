import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiChevronsRight,
  FiCornerDownRight,
  FiHome,
  FiMail,
  FiMap,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiUser,
  FiUserPlus,
} from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import City from '../../models/City';
import CountryState from '../../models/CountryState';
import Person from '../../models/Person';
import CityService from '../../services/CityService';
import CountryStateService from '../../services/CountryStateService';
import PersonService from '../../services/PersonService';
import ProfessionalService from '../../services/ProfessionalService';
import UserService from '../../services/UserService';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, InputContainer } from './styles';

const PersonalInformations: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, personCpf, refreshToken } = useAuth();

  const [countryStates, setCountryStates] = useState<CountryState[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountryState, setSelectedCountryState] = useState<number>();

  const [currentPerson, setCurrentPerson] = useState<Person | null>();

  const { addToast } = useToast();

  const DEFAULT_VALUE = '';

  useEffect(() => {
    async function findAllCountryStates() {
      setCountryStates(await CountryStateService.findAll());
    }

    findAllCountryStates();
  }, []);

  useEffect(() => {
    async function loadData() {
      const person = personCpf
        ? await PersonService.findByCpf(personCpf)
        : null;

      if (person) {
        const {
          cpf,
          name,
          email,
          phoneNumber,
          countryStateId,
          zipCode,
          cityId,
          district,
          address,
          complement,
          userId,
        } = person;

        setSelectedCountryState(countryStateId);

        setCities(await CityService.findByCountryState(countryStateId));

        formRef.current?.setData({
          cpf,
          name,
          email,
          phoneNumber,
          countryStateId,
          zipCode,
          cityId,
          district,
          address,
          complement,
          userId,
        });
      }

      setCurrentPerson(person);
    }

    loadData();
  }, [personCpf]);

  const onSuccess = useCallback(() => {
    addToast({
      type: 'success',
      title: 'Sucesso',
      description: 'Seus dados foram salvos.',
    });

    if (!personCpf) {
      refreshToken(formRef.current?.getFieldValue('cpf') as string);
    }
  }, [addToast, personCpf, refreshToken]);

  const onError = useCallback(() => {
    addToast({
      type: 'error',
      title: 'Erro',
      description: 'Ocorreu um erro ao salvar seus dados, tente novamente.',
    });
  }, [addToast]);

  const onErrorSessionExpired = useCallback(() => {
    addToast({
      type: 'error',
      title: 'Erro',
      description: 'Sua sessão expirou, tente novamente.',
    });
  }, [addToast]);

  const processInsert = useCallback(
    async (person: Person) => {
      const currentUser = await UserService.findUserByUsername(user.username);

      if (!currentUser || !currentUser.id) {
        onErrorSessionExpired();
      }

      Object.assign(person, { user: currentUser });

      if (await PersonService.create(person)) {
        const response = await ProfessionalService.create({
          personCpf: person.cpf,
        });

        return response;
      }

      return false;
    },
    [onErrorSessionExpired, user],
  );

  const handleSubmit = useCallback(
    async (person: Person) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string()
            .min(11, 'O CPF precisa conter todos os números')
            .required('O CPF é obrigatório'),
          name: Yup.string().required('O nome completo é obrigatório'),
          email: Yup.string().required('O e-mail é obrigatório'),
          phoneNumber: Yup.string().required(
            'O número de telefone é obrigatório',
          ),
          countryStateId: Yup.string().required('O estado é obrigatório'),
          zipCode: Yup.string().required('O CEP é obrigatório'),
          cityId: Yup.string().required('A cidade é obrigatória'),
          district: Yup.string().required('O bairro é obrigatório'),
          address: Yup.string().required('O endereço é obrigatório'),
          complement: Yup.string(),
        });

        await schema.validate(person, {
          abortEarly: false,
        });

        const response = !currentPerson
          ? await processInsert(person)
          : await PersonService.update(person);

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
    [currentPerson, onError, onSuccess, processInsert],
  );

  const getTitle = useCallback(() => {
    return `Bem vindo ${currentPerson ? currentPerson.name : user.username}`;
  }, [user, currentPerson]);

  const getSubtitle = useCallback(() => {
    return !personCpf
      ? 'Continue seu cadastro de dados pessoais'
      : 'Você pode editar seus dados aqui quando quiser';
  }, [personCpf]);

  const onChangeCountryState = async (countryState: number) => {
    setSelectedCountryState(countryState);

    setCities(await CityService.findByCountryState(countryState));
  };

  return (
    <Container>
      <h1>{getTitle()}</h1>
      <h3>{getSubtitle()}</h3>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          maxLength={250}
          icon={FiUser}
          placeholder="Nome completo"
        />

        <Input
          name="cpf"
          maxLength={11}
          icon={FiUserPlus}
          placeholder="CPF"
          isDisabled={!!currentPerson?.cpf}
        />

        <Input
          name="email"
          maxLength={250}
          icon={FiMail}
          placeholder="E-mail"
        />

        <InputContainer>
          <Input
            name="phoneNumber"
            icon={FiPhone}
            type="tel"
            placeholder="Telefone"
          />

          <Input name="zipCode" icon={FiChevronsRight} placeholder="CEP" />
        </InputContainer>

        <Select
          name="countryStateId"
          icon={FiMap}
          placeholder="Estado"
          defaultValue={DEFAULT_VALUE}
          onChange={onChangeCountryState}
        >
          <option value={DEFAULT_VALUE} disabled>
            Selecione um estado. . .
          </option>

          {countryStates.map(countryState => (
            <option key={countryState.id} value={countryState.id}>
              {countryState.uf} - {countryState.name}
            </option>
          ))}
        </Select>

        <Select
          name="cityId"
          icon={FiMapPin}
          placeholder="Cidade"
          defaultValue={DEFAULT_VALUE}
          isDisabled={!selectedCountryState}
        >
          <option value={DEFAULT_VALUE} disabled>
            Selecione uma cidade. . .
          </option>

          {cities.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </Select>

        <Input
          name="address"
          maxLength={250}
          icon={FiHome}
          placeholder="Endereço"
        />

        <InputContainer>
          <Input
            name="district"
            maxLength={100}
            icon={FiCornerDownRight}
            placeholder="Bairro"
          />

          <Input
            name="complement"
            maxLength={250}
            icon={FiPlus}
            placeholder="Complemento"
          />
        </InputContainer>

        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default PersonalInformations;
