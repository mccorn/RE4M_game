/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
import React, { FC, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import style from './landing.module.scss';
import AnimatedBackground from '@/app/components/animatedBackground/animatedBackground';
import OAuthAPI from '@/app/api/OAuthAPI';
import { REDIRECT_URI } from '@/const/types';
import utils from '@/utils';
import { signIn } from '@/app/store/slices/userSlice';

const Landing: FC = () => {
    const dispatch = useDispatch();
    const handleOAuth = useCallback(() => {
        const searchParams = new URLSearchParams(document.location.search);
        const code = searchParams.get('code');
        if (code) {
            OAuthAPI.oauth({
                code,
                redirect_uri: REDIRECT_URI,
            }).then(response => {
                if (!response) return;
                const responseData = utils.safeGetData(response);
                dispatch(signIn(responseData));
            });
        }
    }, []);

    useEffect(() => {
        handleOAuth();
    }, []);
    return (
        <div className={style.landingBackground}>
            <AnimatedBackground noInvert />

            <main>
                <h1 className={style.landingBackground_title}>Black Star</h1>
                <img
                    className={style.landingBackground_battleCruiser}
                    src="/src/assets/images/battle-cruiser.png"
                    alt="battle cruiser"
                />
                <div className={style.landingBackground_planet} />
                <div className={style.landingBackground_console}>
                    <span className={style.landingBackground_typeConsole}>
                        Black star it`s arcade shooting space game from RE4M team by
                        Yandex.Practicum. Please check your ammunition and fasten your seat belts
                    </span>
                </div>
                <a className={style.landingBackground_playBtn} href="/game">
                    Play
                </a>
            </main>
        </div>
    );
};

export default Landing;
