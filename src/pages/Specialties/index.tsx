import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiActivity, FiFileText, FiInfo } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useToast } from '../../hooks/toast';
import Specialty from '../../models/Specialty';
import SpecialtyService from '../../services/SpecialtyService';
import getValidationErrors from '../../utils/getValidationErrors';
import classEntities from '../../mock/classEntities.json';
import ProfessionalSpecialtyService from '../../services/ProfessionalSpecialtyService';
import { useAuth } from '../../hooks/auth';
import ProfessionalSpecialty from '../../models/ProfessionalSpecialty';
import { Container, ContainerButton, GenericLineContainer } from './styles';
import ProfessionalSpecialtyGrid from '../../components/ProfessionalSpecialtyGrid';
import Button from '../../components/Button';
import ProfessionalService from '../../services/ProfessionalService';
import Professional from '../../models/Professional';

const Specialties: React.FC = () => {
  const savedFormRef = useRef<FormHandles[]>([]);
  const genericFormRef = useRef<FormHandles[]>([]);
  const { addToast } = useToast();

  const { personCpf } = useAuth();

  const [professional, setProfessional] = useState<Professional>();

  const [genericLines, setGenericLines] = useState<number[]>([0]);

  const [professionalSpecialtiesLines, setProfessionalSpecialtiesLines] =
    useState<ProfessionalSpecialty[]>([]);

  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    async function findAllSpecialties() {
      setSpecialties(await SpecialtyService.findAll());
    }

    findAllSpecialties();
  }, []);

  useEffect(() => {
    async function findAllProfessionalSpecialtiesByCpf() {
      if (personCpf) {
        setProfessionalSpecialtiesLines(
          await ProfessionalSpecialtyService.findByCpf(personCpf),
        );
      }
    }

    async function findProfessionalByCpf() {
      if (personCpf) {
        setProfessional(await ProfessionalService.findByCpf(personCpf));
      }
    }

    findAllProfessionalSpecialtiesByCpf();
    findProfessionalByCpf();
  }, [personCpf]);

  const onSuccess = useCallback(
    (
      data: ProfessionalSpecialty,
      index: number,
      formRef: React.MutableRefObject<FormHandles[]>,
    ) => {
      formRef.current.splice(index, 1);

      genericLines.splice(index, 1);

      setProfessionalSpecialtiesLines([
        ...professionalSpecialtiesLines,
        ...[data],
      ]);

      if (genericLines.length === 0) {
        genericLines.push(0);
      }

      setGenericLines(genericLines);

      addToast({
        type: 'success',
        title: 'Especialidade salva!',
        description: 'Seus dados foram salvos com sucesso.',
      });
    },
    [addToast, genericLines, professionalSpecialtiesLines],
  );

  const onDeleted = useCallback(
    (
      data: ProfessionalSpecialty,
      index: number,
      formRef: React.MutableRefObject<FormHandles[]>,
    ) => {
      formRef.current.splice(index, 1);

      const indexOf = professionalSpecialtiesLines.findIndex(
        professionalSpecialty =>
          professionalSpecialty.specialtyId === data.specialtyId,
      );

      professionalSpecialtiesLines.splice(indexOf, 1);

      setProfessionalSpecialtiesLines(professionalSpecialtiesLines);

      addToast({
        type: 'success',
        title: 'Registro excluído',
        description: 'A especialidade foi removida com sucesso.',
      });
    },
    [addToast, professionalSpecialtiesLines],
  );

  const onError = useCallback(() => {
    addToast({
      type: 'error',
      title: 'Erro ao salvar',
      description: 'Ocorreu um erro ao salvar, tente novamente.',
    });
  }, [addToast]);

  const isSpecialtyDuplicated = useCallback(
    (specialtyId?: number | string): boolean => {
      return !professionalSpecialtiesLines.find(
        professionalSpecialty =>
          professionalSpecialty.specialtyId === Number(specialtyId),
      );
    },
    [professionalSpecialtiesLines],
  );

  const handleSubmit = useCallback(
    async (
      data: ProfessionalSpecialty,
      index: number,
      formRef: React.MutableRefObject<FormHandles[]>,
    ) => {
      try {
        formRef.current[index]?.setErrors({});

        const schema = Yup.object().shape({
          specialtyId: Yup.string()
            .required('A especialidade é obrigatória')
            .test('Unique', 'A especialidade não pode ser duplicada', value => {
              return isSpecialtyDuplicated(value);
            }),
          classEntity: Yup.string().required(
            'A entidade de classe é obrigatória',
          ),
          registerNumber: Yup.string().required(
            'O número do registro é obrigatório',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!professional || !personCpf) {
          onError();
          return;
        }

        Object.assign(data, {
          professionalId: professional.id,
          personCpf,
        });

        const response = await ProfessionalSpecialtyService.create(data);

        response ? onSuccess(data, index, formRef) : onError();
      } catch (err: Yup.ValidationError | any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current[index]?.setErrors(errors);

          return;
        }

        onError();
      }
    },
    [isSpecialtyDuplicated, onError, onSuccess, personCpf, professional],
  );

  const handleDelete = useCallback(
    async (
      data: ProfessionalSpecialty,
      index: number,
      formRef: React.MutableRefObject<FormHandles[]>,
    ) => {
      try {
        const response = await ProfessionalSpecialtyService.delete(data);

        response ? onDeleted(data, index, formRef) : onError();
      } catch (err: Yup.ValidationError | any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current[index]?.setErrors(errors);

          return;
        }

        onError();
      }
    },
    [onDeleted, onError],
  );

  return (
    <Container>
      <h1>Especialidades</h1>

      {professionalSpecialtiesLines &&
        professionalSpecialtiesLines.map((professionalSpecialty, index) => (
          <ProfessionalSpecialtyGrid
            key={`professionalSpecialty-${index}`}
            id={index}
            specialties={specialties}
            classEntities={classEntities}
            formRef={savedFormRef}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            element={professionalSpecialty}
          />
        ))}

      {genericLines &&
        genericLines.map((genericLine, index) => (
          <GenericLineContainer key={genericLine}>
            <ProfessionalSpecialtyGrid
              key={`genericLine-${genericLine}`}
              id={index}
              specialties={specialties}
              classEntities={classEntities}
              formRef={genericFormRef}
              handleSubmit={handleSubmit}
            />
            {index === genericLines.length - 1 && (
              <ContainerButton>
                {genericLines.length > 1 && (
                  <Button
                    key={`deleteLine-${genericLine}`}
                    type="button"
                    onClick={() =>
                      setGenericLines(
                        genericLines.filter(line => line !== genericLine),
                      )
                    }
                  >
                    Remover linha
                  </Button>
                )}
                <Button
                  key={`addLine-${genericLine}`}
                  type="button"
                  onClick={() =>
                    setGenericLines([...genericLines, ...[index + 1]])
                  }
                >
                  Nova especialidade
                </Button>
              </ContainerButton>
            )}
          </GenericLineContainer>
        ))}
    </Container>
  );
};

export default Specialties;
