const stylesArray = [
    'backgroundColor',
    'backgroundColorSecondary',
    'backgroundInput',
    'backgroundButtonColor',
];
type TColorMode = 'Light' | 'Dark';

const bodyStyles = window.getComputedStyle(document.body);

export default function changeColorMode(modeName: TColorMode) {
    stylesArray.forEach(styleName => {
        document.documentElement.style.setProperty(
            `--${styleName}`,
            bodyStyles.getPropertyValue(`--${styleName}${modeName}Mode`)
        );
    });
}
