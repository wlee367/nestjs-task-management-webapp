import React from 'react';
import { useParams } from 'react-router-dom';
import  TaskManagementBoard from '../../components/TaskManagement/TaskManagementBoard';
import { createGlobalStyle } from 'styled-components';
import { Layout } from '../../components/Layout/Layout';

// Use createGlobalStyle to change the background of 'body' element
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100vh;
  }

  #root {
    height: 100%;
  }
`;

interface RouteParams {
    id: string;
}

export const TasksDetails = () => {
    const params = useParams<RouteParams>();
    console.log(params.id);
    return (
        <>
            <Layout>
                <TaskManagementBoard detailId={params.id} />
                <GlobalStyle />
            </Layout>
        </>
    );
};
