import { apiSlice } from "./apiSlice";
import { STATS_URL } from "../constants";

export const statsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDashboardStats: builder.query({
			query: (query) => ({
				url: `${STATS_URL}/dashboard`,
				params: query,
			}),
			providesTags: ["Stats"],
			keepUnusedDataFor: 5,
		}),
		getUserStats: builder.query({
			query: (userId) => ({
				url: `${STATS_URL}/user/${userId}`,
			}),
			providesTags: ["Stats"],
			keepUnusedDataFor: 5,
		}),
	}),
});

export const { useGetDashboardStatsQuery, useGetUserStatsQuery } =
	statsApiSlice;
