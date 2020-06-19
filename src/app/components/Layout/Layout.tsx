import React, { FunctionComponent, useEffect } from 'react';
import { Container } from '@material-ui/core';
import MenuAppBar from './MenuAppBar/MenuAppBar';
import Styled, { createGlobalStyle } from 'styled-components';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/users';

type LayoutProps = {
    title?: string;
    section?: boolean;
};

const StyledContainer = Styled(Container)`
    margin-top: 1em;
    height: 100%;
`;

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

export const Layout: FunctionComponent<LayoutProps> = ({
    children,
    section,
}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    return (
        <>
            <MenuAppBar />
            {section ? (
                { children }
            ) : (
                <StyledContainer maxWidth={'xl'}>{children}</StyledContainer>
            )}
            <GlobalStyle />
        </>
    );
};
