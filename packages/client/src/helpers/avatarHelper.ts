import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { API_URL } from '@/api';

const calculateAvatarUrl = (avatar: string | null) => {
    if (avatar) {
        return API_URL.RESOURCES + avatar;
    }
    return defaultAvatar;
};

export default calculateAvatarUrl;
