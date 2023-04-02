import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { id } from "date-fns/locale";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const boardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        getTodos: builder.query({
            query: () => '/posts',
            transformResponse: responseData => {
                return boardAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.filter(currentStatus === 'to do')
            ]
        }),
        getInProgress: builder.query({
            query: () => '/posts',
            transformResponse:responseData => {
                return boardAdapter.setAll(initialState, response)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.filter(currentStatus === 'in progress')
            ]
        })
    })
})