import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Headers required for the RapidAPI request
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '1780df252cmsh67857abc7ddd65fp1caec6jsn437c462eba1e', // Ensure your API key is valid
};

// Function to create requests with headers
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// Base URL for the API
const baseUrl = 'https://coinranking1.p.rapidapi.com';

// Define the API service using RTK Query's `createApi`
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi', // Name for the slice of state managed by this API
  baseQuery: fetchBaseQuery({ baseUrl }), // Base query to fetch from the API
  endpoints: (builder) => ({
    // Define an endpoint to get a list of cryptocurrencies
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`), // Append the limit to the request
    }),

    // Define an endpoint to get the details of a specific cryptocurrency
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`), // Use coin ID to get specific coin details
    }),

    // Define an endpoint to get the price history of a cryptocurrency
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`), // Adjusted the endpoint URL format
    }),

    // Define an endpoint to get exchanges data
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'), // This endpoint may require a premium API plan
    }),
  }),
});

// Export hooks for each query to use in your components
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
