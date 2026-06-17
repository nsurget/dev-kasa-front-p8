export interface Host {
  name: string;
  picture: string;
}

export interface Property {
  id: string;
  title: string;
  cover: string;
  pictures: string[];
  description: string;
  host: Host;
  rating: string | number;
  location: string;
  equipments: string[];
  tags: string[];
}
