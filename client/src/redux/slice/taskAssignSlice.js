import { apiSlice } from "./apiSlice";
import { TASK_ASSIGN_URL } from "../constants";

export const taskAssignApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createTaskAssign: builder.mutation({
			query: (data) => ({
				url: `${TASK_ASSIGN_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		getTaskAssigns: builder.query({
			query: (query) => ({
				url: TASK_ASSIGN_URL,
				params: query,
			}),
			providesTags: ["TaskAssign"],
			keepUnusedDataFor: 5,
		}),
		deleteTaskAssign: builder.mutation({
			query: (id) => ({
				url: `${TASK_ASSIGN_URL}/${id}`,
				method: "DELETE",
			}),
		}),
		getTaskAssignDetails: builder.query({
			query: (id) => ({
				url: `${TASK_ASSIGN_URL}/${id}`,
			}),
			keepUnusedDataFor: 5,
		}),
		updateTaskAssign: builder.mutation({
			query: (taskAssign) => ({
				url: `${TASK_ASSIGN_URL}/${taskAssign.id}`,
				method: "PUT",
				body: taskAssign,
			}),
			invalidatesTags: ["TaskAssign"],
		}),
	}),
});

export const {
	useCreateTaskAssignMutation,
	useGetTaskAssignsQuery,
	useDeleteTaskAssignMutation,
	useUpdateTaskAssignMutation,
	useGetTaskAssignDetailsQuery,
} = taskAssignApiSlice;
