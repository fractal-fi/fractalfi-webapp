import axios from 'axios';
export class APIClient {
    private readonly _apiUrl = `http://localhost:3000`;

    async getBitcoinPrice() {
        const url = `${this._apiUrl}/price`;
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (e) {
            return null;
        } 
    }
    async getAddressSummary(address: string): Promise<{ [key: string]: { availableBalance: string; transferableBalance: string } }> {
        const url = `${this._apiUrl}/indexer/address/${address}/summary`;
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            console.error('Failed to fetch address summary:', error);
            throw error;
        }
    }

    async getTransferBlocksByTicker(address: string, ticker: string) {
        const url = `${this._apiUrl}/indexer/address/${address}/transferable/${ticker}`;
        try {
            const  { data } = await axios.get(url);
            return data;
        } catch (e) {
            return [];
        }
    }

}
