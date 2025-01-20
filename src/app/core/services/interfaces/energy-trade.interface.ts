/**
 * Interface for the energy trade object
 * @property id - the id of the trade
 * @property planetSellerId - the id of the planet that sells the energy
 * @property planetSellerName - the name of the planet that sells the energy
 * @property planetBuyerId - the id of the planet that buys the energy. If null, the trade is new
 * @property planetBuyerName - the name of the planet that buys the energy. If null, the trade is new
 * @property energy - the amount of energy traded
 * @property status - the status of the trade. could be new, pending, completed
 */
export interface EnergyTrade {
  id: number;
  planetSellerId: number;
  planetSellerName?: string;
  planetBuyerId?: number | null;
  planetBuyerName?: string | null;
  energy: number;
  status: 'new' | 'pending' | 'completed';
}
