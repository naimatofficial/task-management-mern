import { apiSlice } from "./apiSlice";
import { TASK_URL } from "../constants";

export const taskApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation({
			query: (data) => ({
				url: `${TASK_URL}/admin`,
				method: "POST",
				body: data,
			}),
		}),
		getTasks: builder.query({
			query: (query) => ({
				url: `${TASK_URL}/admin`,
				params: query,
			}),
			providesTags: ["Task"],
			keepUnusedDataFor: 5,
		}),
		deleteTask: builder.mutation({
			query: (id) => ({
				url: `${TASK_URL}/admin/${id}`,
				method: "DELETE",
			}),
		}),
		getTaskDetails: builder.query({
			query: (id) => ({
				url: `${TASK_URL}/admin/${id}`,
			}),
			keepUnusedDataFor: 5,
		}),
		updateTask: builder.mutation({
			query: (task) => ({
				url: `${TASK_URL}/admin/${task.id}`,
				method: "PUT",
				body: task,
			}),
			invalidatesTags: ["Task"],
		}),
	}),
});

export const {
	useCreateTaskMutation,
	useGetTasksQuery,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
	useGetTaskDetailsQuery,
} = taskApiSlice;
