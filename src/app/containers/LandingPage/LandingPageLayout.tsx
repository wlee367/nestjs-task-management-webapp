import React, { FunctionComponent } from 'react';
import MenuAppBar from '../../components/Layout/MenuAppBar/MenuAppBar';
import { createGlobalStyle } from 'styled-components';

type LayoutProps = {
    title?: string;
};

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

export const LandingPageLayout: FunctionComponent<LayoutProps> = ({
    children,
}) => {
    return (
        <>
            <MenuAppBar />
            {children}
            <GlobalStyle />
        </>
    );
};
