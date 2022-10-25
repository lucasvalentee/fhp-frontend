import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useState } from 'react';
import { FiActivity, FiAward, FiFileText, FiPrinter } from 'react-icons/fi';
import ProfessionalSpecialty from '../../models/ProfessionalSpecialty';
import Specialty from '../../models/Specialty';
import Input from '../Input';
import Select from '../Select';
import { DeleteButton, InputContainer, SaveButton } from './styles';

interface ProfessionalSpecialtyGridProps {
  id: number;
  specialties: Specialty[];
  classEntities: string[];
  formRef: React.MutableRefObject<FormHandles[]>;
  element?: ProfessionalSpecialty;
  handleSubmit: (
    data: ProfessionalSpecialty,
    id: number,
    formRef: React.MutableRefObject<FormHandles[]>,
  ) => void;
  handleDelete?: (
    data: ProfessionalSpecialty,
    id: number,
    formRef: React.MutableRefObject<FormHandles[]>,
  ) => void;
}

const ProfessionalSpecialtyGrid: React.FC<ProfessionalSpecialtyGridProps> = ({
  id,
  specialties,
  classEntities,
  formRef,
  handleSubmit,
  handleDelete,
  element,
}) => {
  const DEFAULT_VALUE = '';

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(!!element);

    if (!element) {
      return;
    }

    const { specialtyId, classEntity, registerNumber } = element;
    formRef.current[id].setData({ specialtyId, classEntity, registerNumber });
  }, [element, formRef, id]);

  return (
    <Form
      key={id}
      ref={(el: FormHandles) => {
        formRef.current[id] = el;
      }}
      onSubmit={(data: ProfessionalSpecialty) =>
        handleSubmit(data, id, formRef)
      }
    >
      <InputContainer>
        <Select
          name="specialtyId"
          icon={FiActivity}
          placeholder="Especialidade"
          defaultValue={DEFAULT_VALUE}
          isDisabled={isDisabled}
        >
          <option value={DEFAULT_VALUE} disabled>
            Selecione uma especialidade. . .
          </option>

          {specialties.map(specialty => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.description}
            </option>
          ))}
        </Select>

        <Select
          name="classEntity"
          icon={FiFileText}
          placeholder="Entidade de Classe"
          defaultValue={DEFAULT_VALUE}
          isDisabled={isDisabled}
        >
          <option value={DEFAULT_VALUE} disabled>
            Selecione uma entidade de classe. . .
          </option>

          {classEntities.map(classEntity => (
            <option key={classEntity} value={classEntity}>
              {classEntity}
            </option>
          ))}
        </Select>

        <Input
          name="registerNumber"
          icon={FiAward}
          placeholder="Número do registro"
          isDisabled={isDisabled}
        />
        {element && !!handleDelete ? (
          <DeleteButton
            type="button"
            onClick={() => handleDelete(element, id, formRef)}
          />
        ) : (
          <SaveButton type="submit" />
        )}
      </InputContainer>
    </Form>
  );
};

export default ProfessionalSpecialtyGrid;
