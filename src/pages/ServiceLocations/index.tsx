import { useCallback, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Professional from '../../models/Professional';
import ServiceLocationModel from '../../models/ServiceLocation';
import ProfessionalService from '../../services/ProfessionalService';
import ServiceLocationService from '../../services/ServiceLocationService';
import { Container, Content, NotFoundDataContainer } from './styles';

interface ServiceLocationDataRow {
  id: string;
  countryState: string;
  city: string;
  address: string;
}

const ServiceLocation: React.FC = () => {
  const { personCpf } = useAuth();
  const [professional, setProfessional] = useState<Professional>();
  const [serviceLocations, setServiceLocations] = useState<
    ServiceLocationModel[]
  >([]);

  const [reload, setReload] = useState<boolean>();

  const [data, setData] = useState<ServiceLocationDataRow[]>([]);

  const { addToast } = useToast();

  const onSuccessDelete = useCallback(() => {
    setReload(true);
    addToast({
      type: 'success',
      title: 'Sucesso',
      description: 'Local de atuação excluído',
    });
  }, [addToast]);

  const onErrorDelete = useCallback(() => {
    addToast({
      type: 'error',
      title: 'Erro',
      description:
        'Ocorreu um erro ao excluir o local de atuação, tente novamente.',
    });
  }, [addToast]);

  const handleDelete = useCallback(
    async (id: string) => {
      (await ServiceLocationService.delete(id))
        ? onSuccessDelete()
        : onErrorDelete();
    },
    [onErrorDelete, onSuccessDelete],
  );

  const columns: TableColumn<ServiceLocationDataRow>[] = [
    {
      name: 'Estado',
      selector: row => row.countryState,
    },
    {
      name: 'Cidade',
      selector: row => row.city,
    },
    {
      name: 'Endereço',
      selector: row => row.address,
    },
    {
      name: 'Ações',
      button: true,
      cell: row => (
        <div className="button-action-container">
          <Link to={`/dashboard/locaisAtuacao/editar/${row.id}`}>Editar</Link>
          <Button type="button" onClick={() => handleDelete(row.id)}>
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function findProfessionalByCpf() {
      if (personCpf) {
        setProfessional(await ProfessionalService.findByCpf(personCpf));
      }
    }
    findProfessionalByCpf();
  }, [personCpf]);

  useEffect(() => {
    async function findAllServiceLocationsByProfessional() {
      if (professional && professional?.id) {
        setServiceLocations(
          await ServiceLocationService.findByProfessional(professional.id),
        );
      }
    }

    findAllServiceLocationsByProfessional();
  }, [professional, reload]);

  useEffect(() => {
    if (!serviceLocations.length) {
      setData([]);
      return;
    }

    const dataTable = serviceLocations.map(location => ({
      id: location?.id || 'N/A',
      countryState: location?.countryState?.name || 'N/A',
      city: location?.city?.name || 'N/A',
      address: location?.address || 'N/A',
    }));

    setData(dataTable);
  }, [serviceLocations]);

  return (
    <Container>
      <h1>Locais de Atuação</h1>

      <Content>
        <Link to="/dashboard/locaisAtuacao/novo">Inserir Local de Atuação</Link>
        <hr
          style={{
            background: '#0000001f',
            border: 'none',
            height: '1px',
            marginTop: '10px',
          }}
        />
        <DataTable
          columns={columns}
          data={data}
          customStyles={{
            rows: {
              style: {
                minHeight: '50px',
                backgroundColor: '#FBFBFB',
              },
            },
            headCells: {
              style: {
                fontWeight: 800,
                fontSize: 16,
                color: '#312e38',
                paddingLeft: '8px',
                paddingRight: '8px',
                backgroundColor: '#FBFBFB',
              },
            },
            cells: {
              style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                fontSize: 14,
                color: '#312e38',
                backgroundColor: '#FBFBFB',
              },
            },
          }}
          noDataComponent={
            <NotFoundDataContainer>
              <h3>Não há nenhum registro</h3>
            </NotFoundDataContainer>
          }
        />
      </Content>
    </Container>
  );
};

export default ServiceLocation;
