import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import style from './layout.module.scss';
import Header from '@/app/components/header/header';
import AnimatedBackground from '../animatedBackground/animatedBackground';
import EnterFullScreen from '@/assets/images/enterFullScreen.svg';
import exitFullScreen from '@/assets/images/exitFullScreen.svg';
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

                <div className={style.fullScreen}>
                    <Button buttonStyle="icon" size="small" click={toggleFullScreen}>
                        <img
                            src={isFullScreen ? exitFullScreen : EnterFullScreen}
                            alt="fullScreenIcon"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Layout;
