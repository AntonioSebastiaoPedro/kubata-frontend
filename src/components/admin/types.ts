export interface Proprietario {
  id: number;
  name: string;
  email: string;
  phone: string;
  propertiesCount: number;
  status: "Ativo" | "Pendente" | "Bloqueado";
  dateJoined: string;
}

export interface Propriedade {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  ownerName: string;
  status: "Aprovado" | "Pendente" | "Rejeitado";
  views: number;
}

export interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: string;
  activeRentals: number;
  status: "Verificado" | "Pendente";
  totalSpent: string;
}
