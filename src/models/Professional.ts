import Person from './Person';

export default interface Professional {
  id?: string;
  personCpf: string;
  isActive?: boolean;
  person?: Person;
}
