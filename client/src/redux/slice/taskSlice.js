import { apiSlice } from "./apiSlice";
import { TASK_URL } from "../constants";

export const taskApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation({
			query: (data) => ({
				url: `${TASK_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		getTaskDetails: builder.query({
			query: (id) => ({
				url: `${TASK_URL}/${id}`,
			}),
			keepUnusedDataFor: 5,
		}),
		getTasks: builder.query({
			query: (query) => ({
				url: `${TASK_URL}`,
				params: query,
			}),
			providesTags: ["Task"],
			keepUnusedDataFor: 5,
		}),
		updateTask: builder.mutation({
			query: (task) => ({
				url: `${TASK_URL}/${task.id}`,
				method: "PUT",
				body: task,
			}),
			invalidatesTags: ["Task"],
		}),
		deleteTask: builder.mutation({
			query: (id) => ({
				url: `${TASK_URL}/${id}`,
				method: "DELETE",
			}),
		}),
		updateTaskStatus: builder.mutation({
			query: (task) => ({
				url: `${TASK_URL}/${task.id}`,
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
	useUpdateTaskStatusMutation,
} = taskApiSlice;
