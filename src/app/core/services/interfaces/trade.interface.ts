export interface Trade {
  id: number;
  planetId: number;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  energyQty: number;
  type: string;
  status: string;
}
