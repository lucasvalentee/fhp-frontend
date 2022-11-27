import { FiMap } from 'react-icons/fi';
import CardData from '../../models/CardData';
import { Card, Container } from './styles';

interface ChatbotCardDataProps {
  data: CardData[];
  index: number;
}

const ChatbotCardData: React.FC<ChatbotCardDataProps> = ({
  data,
  index,
}: ChatbotCardDataProps) => {
  return (
    <Container>
      {data.map(cardData => (
        <Card key={`CardMessage_${index}`}>
          <h3>{cardData.professionalName}</h3>

          <p>
            <FiMap size={14} />
            {cardData.countryState} - {cardData.city}
          </p>

          <p>
            <strong>Endereço: </strong>
            {cardData.address}, {cardData.district} - {cardData.zipCode}
          </p>

          <p>
            <strong>Telefone: </strong>
            {cardData.phoneNumber}
          </p>

          <p>
            <strong>Convênios: </strong>
            {cardData.medicalInsurance}
          </p>

          {cardData.paymentMethods && (
            <p>
              <strong>Métodos de Pagamento: </strong>
              {cardData.paymentMethods}
            </p>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default ChatbotCardData;
