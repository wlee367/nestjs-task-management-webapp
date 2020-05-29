import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { HeroSection } from './HeroSection';
import { LandingPageLayout } from './LandingPageLayout';
import { FeaturesSection } from './FeaturesSection';

export const styles = (theme: Theme) => ({
    root: {
        height: 64,
        [theme.breakpoints.up('sm')]: {
            height: 70,
        },
    },
});

const LandingPage = () => {
    return (
        <>
            <LandingPageLayout>
                <HeroSection />
                <FeaturesSection />
            </LandingPageLayout>
        </>
    );
};

export default withStyles(styles)(LandingPage);
