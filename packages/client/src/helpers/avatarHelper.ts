import defaultAvatar from '@/assets/images/defaultAvatar.png';
import API from '@/api/api';

const calculateAvatarUrl = (avatar: string | null) => {
    if (avatar) {
        return API.RESOURCES + avatar;
    }
    return defaultAvatar;
};

export default calculateAvatarUrl;
