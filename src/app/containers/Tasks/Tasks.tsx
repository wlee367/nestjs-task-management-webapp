import * as React from 'react';
import { TaskManagementBoard } from '../../components/TaskManagement/TaskManagementBoard';
import { Layout } from '../../components/Layout/Layout';
import { StoreState } from '../../redux/reducers';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const Tasks = () => {
    const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;
    const todos = typedUseSelector((state)=> state.todos.items);
    const columns = typedUseSelector((state) => state.todos.columns);
    const columnsOrder = typedUseSelector((state)=> state.todos.columnsOrder)
    console.log(todos)
    console.log(columns)
    console.log(columnsOrder)
    return (
        <>
            <Layout>
                <TaskManagementBoard todos={todos} columns={columns} columnsOrder={columnsOrder}/>
            </Layout>
        </>
    );
};
