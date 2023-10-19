export type FullScreen = {
    isFullScreen: boolean;
    enterFullScreen: () => void;
    exitFullScreen: () => void;
    toggleFullScreen: () => void;
};

export type Nullable<T> = T | null;

export interface DocumentWithFullscreen extends Document {
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    webkitExitFullscreen?: () => void;
}

export interface DocumentElementWithFullscreen extends Element {
    msRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
}
