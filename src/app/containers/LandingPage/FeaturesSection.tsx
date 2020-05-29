import React from 'react';
import styled from 'styled-components';
import { Container, IconButton } from '@material-ui/core';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const Section = styled.section`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const FeatureRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`;

const FeatureCard = styled.div`
    width: 300px;
    height: 250px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 1em;

    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 1px 4px 4px rgba(0, 0, 0, 0.34);

    text-align: center;
`;

const FeatureH1 = styled.h1`
    font-size: 32px;
`;

const FeatureCardHeader = styled.label`
    font-size: 28px;
    margin-bottom: 2em;
`;

const FeatureCardText = styled.p`
    font-size: 14px;
    margin-top: 4em;
`;

const features = [
    {
        name: 'Identify Task',
        id: 0,
        icon: <QuestionAnswerRoundedIcon fontSize="large" />,
        description: 'Think of any task you need to complete.',
    },
    {
        name: 'Create Task',
        id: 1,
        icon: <AddCircleRoundedIcon fontSize="large" />,
        description:
            'Simply record it into this app using our simple and clean UI.',
    },
    {
        name: 'Finish Task',
        id: 2,
        icon: <CheckCircleRoundedIcon fontSize="large" />,
        description:
            'With reminders coming from the app, you will finish your tasks on time, everytime.',
    },
];

export const FeaturesSection = () => {
    return (
        <Section>
            <Container maxWidth="lg">
                <FeatureRow>
                    <FeatureH1>
                        Take control of your tasks in 3 easy steps:
                    </FeatureH1>
                </FeatureRow>
                <FeatureRow>
                    {features.map((feature) => {
                        return (
                            <FeatureCard key={feature.id}>
                                <FeatureCardHeader>
                                    {feature.name}
                                </FeatureCardHeader>
                                <IconButton
                                    style={{
                                        fontSize: '48px',
                                        width: '48px',
                                        height: '48px',
                                    }}
                                >
                                    {feature.icon}
                                </IconButton>
                                <FeatureCardText>
                                    {feature.description}
                                </FeatureCardText>
                            </FeatureCard>
                        );
                    })}
                </FeatureRow>
            </Container>
        </Section>
    );
};
