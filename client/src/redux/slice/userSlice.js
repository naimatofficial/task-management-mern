import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		loginUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: "POST",
				body: data,
			}),
		}),
		logoutUser: builder.mutation({
			query: (token) => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		getUsers: builder.query({
			query: (query) => ({
				url: USERS_URL,
				params: query,
			}),
			providesTags: ["User"],
			keepUnusedDataFor: 5,
		}),
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: "DELETE",
			}),
		}),
		getUserDetails: builder.query({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
			}),
			keepUnusedDataFor: 5,
		}),
		updateUser: builder.mutation({
			query: (user) => ({
				url: `${USERS_URL}/${user.id}`,
				method: "PUT",
				body: user,
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useCreateUserMutation,
	useGetUsersQuery,
	useLoginUserMutation,
	useLogoutUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetUserDetailsQuery,
} = userApiSlice;
