import * as React from "react";
import TaskManagementBoard from "../../components/TaskManagement/TaskManagementBoard";
import { Layout } from "../../components/Layout/Layout";

export const Tasks = () => {
  return (
    <>
      <Layout>
        <TaskManagementBoard />
      </Layout>
    </>
  );
};
