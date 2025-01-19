export interface Trade {
  id: number;
  sellerId: number | null;
  buyerId: number | null;
  sellerName: string | null;
  buyerName: string | null;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  energyQty: number;
  type: string;
  status: string;
}
