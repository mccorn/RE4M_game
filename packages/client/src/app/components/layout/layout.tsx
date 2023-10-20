import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import style from './layout.module.scss';
import Header from '@/app/components/header/header';
import AnimatedBackground from '../animatedBackground/animatedBackground';
import svgIconEnterFullScreen from '@/assets/images/enterFullScreen.svg';
import svgIconExitFullScreen from '@/assets/images/exitFullScreen.svg';
import useFullScreen from '@/app/hooks/useFullScreen';
import Button from '@/app/components/common/button/button';

// todo move this to redux later
type TLayoutProps = {
    isAuthorized?: boolean;
};

const Layout: FC<TLayoutProps> = ({ isAuthorized = true }) => {
    const { isFullScreen, toggleFullScreen } = useFullScreen(null);

    return (
        <div className={style.wrapper}>
            <Header isAuthorized={isAuthorized} />
            <AnimatedBackground />
            <div className={style.content}>
                <Outlet />

                <div className={style.fullScreenButton}>
                    <Button buttonStyle="icon" size="small" click={toggleFullScreen}>
                        <img
                            src={isFullScreen ? svgIconExitFullScreen : svgIconEnterFullScreen}
                            alt="fullScreenIcon"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Layout;
