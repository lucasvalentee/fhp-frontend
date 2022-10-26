import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiMail,
  FiPhone,
  FiChevronsRight,
  FiMap,
  FiMapPin,
  FiHome,
  FiCornerDownRight,
  FiPlus,
} from 'react-icons/fi';
import { MultiSelect } from 'react-multi-select-component';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import City from '../../models/City';
import CountryState from '../../models/CountryState';
import ServiceLocation from '../../models/ServiceLocation';
import CityService from '../../services/CityService';
import CountryStateService from '../../services/CountryStateService';
import { InputContainer } from '../PersonalInformations/styles';
import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import ServiceLocationService from '../../services/ServiceLocationService';
import { useAuth } from '../../hooks/auth';
import ProfessionalSpecialtyService from '../../services/ProfessionalSpecialtyService';
import PaymentMethodService from '../../services/PaymentMethodService';
import ProfessionalService from '../../services/ProfessionalService';
import Professional from '../../models/Professional';
import ProfessionalSpecialtyServiceLocationService from '../../services/ProfessionalSpecialtyServiceLocationService';

interface MultiSelectOption {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
}

const ServiceLocationsForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { personCpf } = useAuth();
  const history = useHistory();

  const [professional, setProfessional] = useState<Professional>();

  const [data, setData] = useState<ServiceLocation>();

  const [countryStates, setCountryStates] = useState<CountryState[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountryState, setSelectedCountryState] = useState<number>();

  const [classNameSpecialtyError, setClassNameSpecialtyError] =
    useState<string>('');

  const [specialties, setSpecialties] = useState<MultiSelectOption[]>([]);
  const [paymentMethodsToList, setPaymentMethodsToList] = useState<
    MultiSelectOption[]
  >([]);

  const [specialtiesSelected, setSpecialtiesSelected] = useState<
    MultiSelectOption[]
  >([]);
  const [paymentMethodsSelected, setPaymentMethodsSelected] = useState<
    MultiSelectOption[]
  >([]);

  const DEFAULT_VALUE = '';

  useEffect(() => {
    async function loadData(id: string) {
      const serviceLocation = await ServiceLocationService.findById(id);

      if (serviceLocation) {
        const {
          countryStateId,
          cityId,
          medicalInsurance,
          phoneNumber,
          zipCode,
          district,
          address,
          complement,
          paymentMethods,
          professionalSpecialtyServiceLocation,
        } = serviceLocation;

        setSelectedCountryState(serviceLocation.countryStateId);

        setCities(
          await CityService.findByCountryState(serviceLocation.countryStateId),
        );

        setData({
          id,
          countryStateId,
          cityId,
          medicalInsurance,
          phoneNumber,
          zipCode,
          district,
          address,
          complement,
          paymentMethods,
          professionalSpecialtyServiceLocation,
        });
      }
    }

    async function findAllCountryStates() {
      setCountryStates(await CountryStateService.findAll());
    }

    async function findAllPaymentMethods() {
      const paymentMethodsList = await PaymentMethodService.findAll();

      setPaymentMethodsToList(
        paymentMethodsList.map(paymentMethod => ({
          value: paymentMethod.id,
          label: paymentMethod.description,
        })),
      );
    }

    findAllCountryStates();
    findAllPaymentMethods();

    if (window.location.href.includes('/editar')) {
      const id = window.location.href.substring(
        window.location.href.indexOf('editar') + 7,
      );

      loadData(id);
    }
  }, []);

  useEffect(() => {
    if (data) {
      formRef.current?.setData(data);
    }
  }, [data]);

  useEffect(() => {
    async function findAllSpecialtiesByCpf() {
      if (personCpf) {
        const specialtiesList = await ProfessionalSpecialtyService.findByCpf(
          personCpf,
        );

        setSpecialties(
          specialtiesList.map(specialty => ({
            value: specialty.specialtyId,
            label: specialty.specialty?.description || '',
          })),
        );
      }
    }

    async function findProfessionalByCpf() {
      if (personCpf) {
        setProfessional(await ProfessionalService.findByCpf(personCpf));
      }
    }

    findAllSpecialtiesByCpf();
    findProfessionalByCpf();
  }, [personCpf]);

  useEffect(() => {
    if (data && specialties) {
      const specialtiesSaved = data.professionalSpecialtyServiceLocation?.map(
        item => item.specialtyId,
      );

      if (specialtiesSaved?.length) {
        const selected: MultiSelectOption[] = [];

        specialtiesSaved.forEach(specialty => {
          const item = specialties.find(option => option.value === specialty);
          if (item) {
            selected.push(item);
          }
        });

        setSpecialtiesSelected(selected);
      }
    }
  }, [data, specialties]);

  useEffect(() => {
    if (data && paymentMethodsToList) {
      const paymentMethodsSaved = data.paymentMethods?.map(
        paymentMethod => paymentMethod,
      );

      if (paymentMethodsSaved?.length) {
        const selected: MultiSelectOption[] = [];

        paymentMethodsSaved.forEach(paymentMethod => {
          const item = paymentMethodsToList.find(
            option => option.value === paymentMethod,
          );
          if (item) {
            selected.push(item);
          }
        });

        setPaymentMethodsSelected(selected);
      }
    }
  }, [data, paymentMethodsToList]);

  const onSuccess = useCallback(() => {
    history.push('/dashboard/locaisAtuacao');

    addToast({
      type: 'success',
      title: 'Sucesso',
      description: 'Seus dados foram salvos.',
    });
  }, [addToast, history]);

  const onError = useCallback(() => {
    addToast({
      type: 'error',
      title: 'Erro',
      description: 'Ocorreu um erro ao salvar seus dados, tente novamente.',
    });
  }, [addToast]);

  const handleSubmit = useCallback(
    async (serviceLocation: ServiceLocation) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          medicalInsurance: Yup.string().required(
            'O convênio médico é obrigatório',
          ),
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

        setClassNameSpecialtyError(
          specialtiesSelected.length ? 'multi-select' : 'specialties-required',
        );

        await schema.validate(serviceLocation, {
          abortEarly: false,
        });

        if (!specialtiesSelected.length) {
          return;
        }

        if (!personCpf || !professional?.id) {
          onError();
          return;
        }

        const specialtiesId = specialtiesSelected.map(
          specialty => specialty.value,
        );

        const specialtiesRelation =
          ProfessionalSpecialtyServiceLocationService.createRelationObject({
            personCpf,
            professionalId: professional?.id,
            specialties: specialtiesId,
          });

        serviceLocation.professionalSpecialtyServiceLocation =
          specialtiesRelation;

        if (data?.id) {
          serviceLocation.id = data.id;
        }

        serviceLocation.paymentMethods = paymentMethodsSelected.map(
          paymentMethod => paymentMethod.value,
        );

        const response = await ServiceLocationService.save(serviceLocation);

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
    [
      data?.id,
      onError,
      onSuccess,
      paymentMethodsSelected,
      personCpf,
      professional?.id,
      specialtiesSelected,
    ],
  );

  const onChangeCountryState = async (countryState: number) => {
    setSelectedCountryState(countryState);

    setCities(await CityService.findByCountryState(countryState));
  };

  const getDefaultValueRender = (
    selectedItems: MultiSelectOption[],
    allSelected: MultiSelectOption[],
    defaultText: string,
  ) => {
    if (selectedItems.length) {
      const useComma = selectedItems.length > 1;

      return selectedItems.map(
        ({ label }, index) =>
          `${label}${useComma && index !== allSelected.length - 1 ? ', ' : ''}`,
      );
    }

    return defaultText;
  };

  return (
    <Container>
      <h1>{data ? 'Editar Local de Atuação' : 'Novo Local de Atuação'}</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
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

        <InputContainer>
          <Input name="zipCode" icon={FiChevronsRight} placeholder="CEP" />

          <Input
            name="district"
            maxLength={100}
            icon={FiCornerDownRight}
            placeholder="Bairro"
          />
        </InputContainer>

        <Input
          name="address"
          maxLength={250}
          icon={FiHome}
          placeholder="Endereço"
        />

        <InputContainer>
          <Input
            name="phoneNumber"
            icon={FiPhone}
            type="tel"
            placeholder="Telefone"
          />

          <Input
            name="medicalInsurance"
            maxLength={250}
            icon={FiMail}
            placeholder="Convênio(s)"
          />
        </InputContainer>

        <Input
          name="complement"
          maxLength={250}
          icon={FiPlus}
          placeholder="Complemento"
        />

        <hr
          style={{
            background: '#0000001f',
            border: 'none',
            height: '2px',
            margin: '24px 0',
          }}
        />

        <h3>Relacione as especialidades atendidas nesse local</h3>

        <MultiSelect
          className={classNameSpecialtyError}
          valueRenderer={(selectedItem, _options) =>
            getDefaultValueRender(
              selectedItem,
              specialtiesSelected,
              'Selecione uma ou mais especialidades. . .',
            )
          }
          overrideStrings={{
            search: 'Pesquisar',
            selectAll: 'Selecionar todos',
            allItemsAreSelected: 'Todos os items foram selecionados.',
            clearSearch: 'Limpar pesquisa',
            clearSelected: 'Limpar todos',
            noOptions: 'Sem resultados',
            selectAllFiltered: 'Selecionar todos (Filtrados)',
            selectSomeItems: 'Selecione...',
            create: 'Criar',
          }}
          options={specialties}
          value={specialtiesSelected}
          onChange={setSpecialtiesSelected}
          labelledBy="Selecione"
        />

        <hr
          style={{
            background: '#0000001f',
            border: 'none',
            height: '2px',
            margin: '24px 0',
          }}
        />

        <h3>Relacione os métodos de pagamento do local</h3>

        <MultiSelect
          valueRenderer={(selectedItem, _options) =>
            getDefaultValueRender(
              selectedItem,
              paymentMethodsSelected,
              'Selecione um ou mais métodos de pagamento. . .',
            )
          }
          overrideStrings={{
            search: 'Pesquisar',
            selectAll: 'Selecionar todos',
            allItemsAreSelected: 'Todos os items foram selecionados.',
            clearSearch: 'Limpar pesquisa',
            clearSelected: 'Limpar todos',
            noOptions: 'Sem resultados',
            selectAllFiltered: 'Selecionar todos (Filtrados)',
            selectSomeItems: 'Selecione...',
            create: 'Criar',
          }}
          options={paymentMethodsToList}
          value={paymentMethodsSelected}
          onChange={setPaymentMethodsSelected}
          labelledBy="Selecione"
        />

        <Button className="submitButton" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

export default ServiceLocationsForm;
