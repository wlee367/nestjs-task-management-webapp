import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '@material-ui/core';

const Section = styled.section`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #ccd1d5;
`;
const FeatureH1 = styled.h1`
    font-size: 32px;
`;

const SectionRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

const CTAButton = styled(Button)`
    margin-top: 3em;
    font-size: 18px;
    text-transform: normal;
    width: 200px;
`;

export const CTASection = () => {
    return (
        <Section>
            <Container
                maxWidth="lg"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <SectionRow>
                    <FeatureH1>
                        Completing all the things on your plate won't look so
                        bad with app name
                    </FeatureH1>
                </SectionRow>
                <CTAButton href="/register" variant="contained" color="primary">
                    Register Now
                </CTAButton>
            </Container>
        </Section>
    );
};
