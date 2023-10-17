import {
    AutoIncrement,
    Column,
    DataType,
    PrimaryKey,
    Sequelize,
    SequelizeOptions,
    Model,
    Table,
    ForeignKey,
    Unique,
} from 'sequelize-typescript';

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;
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

    @ForeignKey(() => Theme)
    @Column({
        type: DataType.INTEGER,
        field: 'id',
    })
    themeId = 0;

    @Column(DataType.STRING)
    login = '';
}

@Table({
    timestamps: false,
    tableName: 'themes',
})
// eslint-disable-next-line no-use-before-define
class Theme extends Model<Theme> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    override id: number | undefined;

    @Unique
    @Column(DataType.STRING)
    name: string | undefined;
}

const createClientAndSeed = async (): Promise<Sequelize | null> => {
    const sequelizeOptions: SequelizeOptions = {
        host: POSTGRES_HOST || 'localhost',
        port: Number(POSTGRES_PORT) || 8432,
        username: POSTGRES_USER || 'postgres',
        password: POSTGRES_PASSWORD || 'postgres',
        database: POSTGRES_DB || 'postgres',
        dialect: 'postgres',
        models: [User, Theme],
    };

    try {
        const sequelize = new Sequelize(sequelizeOptions);

        await sequelize.authenticate();
        await sequelize.sync();
        const themes = await Theme.findAll();
        if (!themes.length) {
            const defaultThemes = [
                {
                    name: 'Light',
                },
                {
                    name: 'Black',
                },
            ];
            await Theme.bulkCreate(defaultThemes as Theme[]);
        }
        console.log('Connection has been established successfully.');

        return sequelize;
    } catch (e) {
        console.error(e);
    }

    return null;
};

export default createClientAndSeed;
