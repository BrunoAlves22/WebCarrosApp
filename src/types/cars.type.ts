export interface CarsProps {
  id: string;
  name: string;
  year: string;
  km: string;
  city: string;
  price: string | number;
  uid: string;
  images: CarImageProps[];
}

export interface CarImageProps {
  id: string;
  name: string;
  url: string;
}

export interface CarDetailProps {
  id: string;
  name: string;
  model: string;
  year: string;
  km: string;
  city: string;
  price: string | number;
  description: string;
  created: string;
  owner: string;
  uid: string;
  whatsapp: string;
  images: CarImageProps[];
}
