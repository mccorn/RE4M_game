import BattlecruiserImage from '@/assets/images/game/ships/Battlecruiser.png';
import BomberImage from '@/assets/images/game/ships/Bomber.png';
import FighterImage from '@/assets/images/game/ships/Fighter.png';
import FrigateImage from '@/assets/images/game/ships/Frigate.png';
import RocketImage from '@/assets/images/game/shots/Rocket.png';
import PlayerRocketImage from '@/assets/images/game/shots/PlayerRocket.png';
import { DrawableObjectParams, ShipType, ShotType } from '../types/commonTypes';

/* Shots parameters */

const shotParams = {
    width: 9,
    height: 16,
    imageSpriteWidth: 36,
    frameCount: 4,
};

export const ShotParametersValues: Record<ShotType, DrawableObjectParams> = {
    [ShotType.Enemy]: new DrawableObjectParams(
        shotParams.width,
        shotParams.height,
        RocketImage,
        shotParams.imageSpriteWidth,
        shotParams.frameCount
    ),
    [ShotType.Player]: new DrawableObjectParams(
        shotParams.width,
        shotParams.height,
        PlayerRocketImage,
        shotParams.imageSpriteWidth,
        shotParams.frameCount
    ),
} as const;

/* Ships parameters */

const commonEnemyParameters = {
    imageSpriteWidth: 959,
    frameCount: 18,
};

export const ShipTypesParameterValues: Record<ShipType, DrawableObjectParams> = {
    [ShipType.Battlecruiser]: new DrawableObjectParams(
        128,
        128,
        BattlecruiserImage,
        commonEnemyParameters.imageSpriteWidth,
        commonEnemyParameters.frameCount
    ),
    [ShipType.Fighter]: new DrawableObjectParams(
        64,
        64,
        FighterImage,
        commonEnemyParameters.imageSpriteWidth,
        commonEnemyParameters.frameCount
    ),
    [ShipType.Bomber]: new DrawableObjectParams(
        64,
        64,
        BomberImage,
        commonEnemyParameters.imageSpriteWidth,
        commonEnemyParameters.frameCount
    ),
    [ShipType.Player]: new DrawableObjectParams(64, 64, FrigateImage, 1024, 16),
} as const;
