export interface Host {
  name: string;
  picture: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  cover: string;
  pictures: string[];
  description: string;
  host: Host;
  rating: string | number;
  location: string;
  equipments: string[];
  tags: string[];
  price_per_night: number;
  rating_avg?: number;
  ratings_count?: number;
}
