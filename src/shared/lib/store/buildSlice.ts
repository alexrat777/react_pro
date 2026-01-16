import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export function buildSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);
    // useActions возвращает забинденный и замемозированные экшены без диспатча что бы пользоваться напрямую
    const useActions = ():typeof slice.actions => {
        const dispatch = useDispatch();
        // @ts-ignore
        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch]);
    };
    // в итоге получилось при создании слайса еще возвращаются экшены из слайса
    return {
        ...slice,
        useActions,
    };
}
