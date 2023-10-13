import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AutoIncrement,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Column,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DataType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    PrimaryKey,
    Sequelize,
    SequelizeOptions,
    Model,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Table,
} from 'sequelize-typescript';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;
@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'users',
})
// eslint-disable-next-line no-use-before-define
class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    override id = 0;
}

const createClientAndConnect = async (): Promise<Sequelize | null> => {
    const sequelizeOptions: SequelizeOptions = {
        host: 'localhost',
        port: Number(POSTGRES_PORT) || 8432,
        username: POSTGRES_USER || 'postgres',
        password: POSTGRES_PASSWORD || 'postgres',
        database: POSTGRES_DB || 'postgres',
        dialect: 'postgres',
        models: [User],
    };

    try {
        const sequelize = new Sequelize(sequelizeOptions);

        await sequelize.authenticate(); // Проверка аутентификации в БД
        await sequelize.sync({ force: true }); // Синхронизация базы данных
        console.log('Connection has been established successfully.');

        return sequelize;
    } catch (e) {
        console.error(e);
    }

    return null;
};

export default createClientAndConnect;
