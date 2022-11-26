import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useState } from 'react';
import ChatbotRegionFormDTO from '../../models/ChatbotRegionFormDTO';
import City from '../../models/City';
import CountryState from '../../models/CountryState';
import CityService from '../../services/CityService';
import CountryStateService from '../../services/CountryStateService';
import Button from '../Button';
import Select from '../Select';
import { Container, Content } from './styles';

interface ChatbotRegionFormProps {
  inputRef: FormHandles;
  handleSubmit: (data: ChatbotRegionFormDTO, inputRef: FormHandles) => void;
}

const ChatbotRegionForm: React.FC<ChatbotRegionFormProps> = ({
  inputRef,
  handleSubmit,
}: ChatbotRegionFormProps) => {
  const [countryStates, setCountryStates] = useState<CountryState[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountryState, setSelectedCountryState] = useState<number>();

  const DEFAULT_VALUE = '';

  useEffect(() => {
    async function findAllCountryStates() {
      setCountryStates(await CountryStateService.findAll());
    }

    findAllCountryStates();
  }, []);

  const onChangeCountryState = async (countryState: number) => {
    setSelectedCountryState(countryState);

    setCities(await CityService.findByCountryState(countryState));
  };

  return (
    <Container>
      <Content>
        <Form
          ref={(el: FormHandles) => {
            inputRef = el;
          }}
          onSubmit={(data: ChatbotRegionFormDTO) =>
            handleSubmit(data, inputRef)
          }
        >
          <Select
            name="countryStateId"
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

          <Button type="submit">Continuar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ChatbotRegionForm;
