export class APIClient {
    private readonly _apiUrl = `http://localhost:3000`;

    async getAddressSummary(address: string): Promise<{ [key: string]: { availableBalance: string; transferableBalance: string } }> {
        const url = `${this._apiUrl}/indexer/address/${address}/summary`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching address summary: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch address summary:', error);
            throw error;
        }
    }
}
