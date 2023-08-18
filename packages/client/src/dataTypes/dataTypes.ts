// todo move to redux
type TUser = {
    id: number;
    login: string;
    email: string;
    firstName: string;
    secondName: string;
    displayName: string;
    phone: string;
    avatar: string | null;
};

export default TUser;
