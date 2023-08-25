export default {
    getcookie: (a: string) => {
        const b = new RegExp(`${a}=([^;]){1,}`);
        const c = b.exec(document.cookie);
        let s;

        if (c) {
            s = c[0].split('=');
        } else {
            return false;
        }

        return s[1] ? s[1] : false;
    },
};
