import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { HeroSection } from './HeroSection';
import { LandingPageLayout } from './LandingPageLayout';
import { FeaturesSection } from './FeaturesSection';
import { CTASection } from './CTASection';
import { Redirect } from 'react-router-dom';

export const styles = (theme: Theme) => ({
    root: {
        height: 64,
        [theme.breakpoints.up('sm')]: {
            height: 70,
        },
    },
});

const LandingPage = () => {
    return <Redirect to={'/login'}/>
    // return (
        // <>
        //     <LandingPageLayout>
        //         <HeroSection />
        //         <FeaturesSection />
        //         <CTASection />
        //     </LandingPageLayout>
        // </>
    // );
};

export default withStyles(styles)(LandingPage);
