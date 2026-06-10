export interface Brand {
  id: string;
  name: string;
  description: string;
  tagline: string;
  collectionCount: number;
}

export const BRANDS: Brand[] = [
  { id: 'nike', name: 'Nike / Jordan', description: 'Grails and street culture icons.', tagline: 'The Blueprint of Street Culture.', collectionCount: 4 },
  { id: 'adidas', name: 'Adidas', description: 'Terrace heritage and athletic performance.', tagline: 'Timeless Terraces.', collectionCount: 4 },
  { id: 'newbalance', name: 'New Balance', description: 'Boston craftsmanship meets modern minimal design.', tagline: 'Craftsmanship First.', collectionCount: 3 },
  { id: 'yeezy', name: 'Yeezy', description: 'Sculptural organic footwear silhouettes.', tagline: 'Design in its Purest Form.', collectionCount: 2 },
  { id: 'asics', name: 'Asics', description: 'Technical runners for modern fit aesthetics.', tagline: 'The Technical Renaissance.', collectionCount: 1 },
  { id: 'puma', name: 'Puma', description: 'Terrace Palermo and Speedcat designs.', tagline: 'Terrace Cool Reborn.', collectionCount: 2 },
  { id: 'converse', name: 'Converse', description: 'Classic canvas silhouettes that define eras.', tagline: 'Eras of Canvas.', collectionCount: 2 },
  { id: 'reebok', name: 'Reebok', description: 'Heritage court trainers and clean sportswear classics.', tagline: 'Heritage of the Court.', collectionCount: 2 },
  { id: 'vans', name: 'Vans', description: 'Classic vulcanized skate footwear since 1966.', tagline: 'Off The Wall.', collectionCount: 2 }
];
