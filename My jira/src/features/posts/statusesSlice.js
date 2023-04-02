import { apiSlice } from "../api/apiSlice";
import {
    createSelector,
    createEntityAdapter,
    nanoid
} from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { useSelector } from "react-redux";

const statusesAdapter = createEntityAdapter({
    // sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = statusesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStatuses: builder.query({
            query: () => '/statuses',
            transformResponse: responseData => {
                const loadedStatuses = responseData;//.map(status => return status);
                return statusesAdapter.setAll (initialState, loadedStatuses)
            },
            providesTags: (result, error, arg) => [
                { type: 'Status', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Status', id }))
            ]
        }),
        addNewStatus: builder.mutation({
            query: initialPost => ({
                url: '/statuses',
                method: 'POST',
                body: { ...initialPost }
            }),
            invalidatesTags: [
                { type: 'Status', id: "LIST" }
            ]
        }),
        editStatus: builder.mutation({
            query: initialStatus => ({
                url: `/statuses/${initialStatus.id}`,
                method: 'PUT',
                body: { ...initialStatus }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Status', id: arg.id }
            ]
        }),
        deleteStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/statuses/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Status', id: arg.id }
            ]
        }),
    })
})

export const {
    useAddNewStatusMutation,
    useDeleteStatusMutation,
    useGetStatusesQuery
} = extendedApiSlice

export const selectStatusesResult = extendedApiSlice.endpoints.getStatuses.select()

const selectStatusesData = createSelector(
    selectStatusesResult,
    statusesResult => statusesResult.data // normalized state object with ids & entities
)

export const {
    selectAll: selectAllStatuses,
} = statusesAdapter.getSelectors(state => selectStatusesData(state) ?? initialState)