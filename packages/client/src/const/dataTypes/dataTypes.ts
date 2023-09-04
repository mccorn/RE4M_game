// todo move to redux slice
type TUser = {
    id: number;
    login: string;
    email: string;
    firstName: string;
    secondName: string;
    displayName: string;
    phone: string;
    avatar?: string | null;
};

export type AuthUserData = {
    login: string;
    password: string;
};

export default TUser;