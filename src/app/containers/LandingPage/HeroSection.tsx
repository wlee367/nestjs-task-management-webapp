import React from 'react';
import styled from 'styled-components';
import Hero from '../../../assets/hero.jpg';
import { Button } from '@material-ui/core';

interface SectionProps {
    img: string;
}

export const Section = styled.section`
    width: 100%;
    height: 600px;
    background-image: url(${Hero});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const HeroTextContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const HeroMessage = styled.h1`
    margin-top: 10%;
    font-size: 40px;
    text-transform: uppercase;
`;

const HeroSubMessage = styled.h2`
    font-size: 28px;
`;

const CTAButton = styled(Button)`
    margin-top: 3em;
    font-size: 18px;
    text-transform: normal;
`;

//Photo by bongkarn thanyakij from Pexels
export const HeroSection = () => {
    return (
        <Section>
            <HeroTextContainer>
                <HeroMessage>Task management made easy</HeroMessage>
                <HeroSubMessage>
                    Keep track of all your tasks in one simple place
                </HeroSubMessage>
                <CTAButton href="/register" variant="contained" color="primary">
                    Register Now
                </CTAButton>
            </HeroTextContainer>
        </Section>
    );
};
