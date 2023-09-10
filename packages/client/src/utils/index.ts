const getCookie = (key: string) => {
    const regExp = new RegExp(`${key}=([^;]){1,}`);
    const foundCookie = regExp.exec(document.cookie);
    let result;

    if (foundCookie) {
        result = foundCookie[0].split('=');
    } else {
        return false;
    }

    return result[1] ? result[1] : false;
};

const approximatelyEqual = (firstNumber: number, secondNumber: number, epsilon: number) =>
    Math.abs(firstNumber - secondNumber) < epsilon;

export { getCookie, approximatelyEqual };
