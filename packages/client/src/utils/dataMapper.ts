import TUser from '@/const/dataTypes/dataTypes';
import { TUserModel } from '@/const/dataTypes/serverModels';

class DataMapper {
    public static mapServerUserData = (user: TUserModel): TUser => ({
        id: user.id,
        firstName: user.first_name,
        secondName: user.second_name,
        displayName: user.display_name,
        email: user.email,
        login: user.login,
        phone: user.phone,
        avatar: user.avatar,
    });
}

export default DataMapper;
