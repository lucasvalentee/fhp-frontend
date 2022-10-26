import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import Professional from '../../models/Professional';
import ProfessionalSpecialtyServiceLocation from '../../models/ProfessionalSpecialtyServiceLocation';
import ProfessionalService from '../../services/ProfessionalService';
import ProfessionalSpecialtyServiceLocationService from '../../services/ProfessionalSpecialtyServiceLocationService';
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
  const [
    professionalSpecialtyServiceLocations,
    setProfessionalSpecialtyServiceLocations,
  ] = useState<ProfessionalSpecialtyServiceLocation[]>([]);

  const [data, setData] = useState<ServiceLocationDataRow[]>([]);

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
      cell: () => <div>Ações!</div>,
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
        setProfessionalSpecialtyServiceLocations(
          await ProfessionalSpecialtyServiceLocationService.findByProfessional(
            professional.id,
          ),
        );
      }
    }

    findAllServiceLocationsByProfessional();
    console.log({ professional });
  }, [professional]);

  useEffect(() => {
    if (!professionalSpecialtyServiceLocations.length) {
      setData([]);
      return;
    }

    const dataTable = professionalSpecialtyServiceLocations.map(
      professionalSpecialtyServiceLocation => ({
        id: professionalSpecialtyServiceLocation.serviceLocation?.id || 'N/A',
        countryState:
          professionalSpecialtyServiceLocation.serviceLocation?.countryState
            ?.name || 'N/A',
        city:
          professionalSpecialtyServiceLocation.serviceLocation?.city?.name ||
          'N/A',
        address:
          professionalSpecialtyServiceLocation.serviceLocation?.address ||
          'N/A',
      }),
    );

    setData(dataTable);
  }, [professionalSpecialtyServiceLocations]);

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
