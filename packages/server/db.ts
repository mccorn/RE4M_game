import { Optional } from 'sequelize';
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
import { NullishPropertiesOf } from 'sequelize/types/utils';

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

const createClientAndConnect = async (): Promise<Sequelize | null> => {
    const sequelizeOptions: SequelizeOptions = {
        host: 'localhost',
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
            await Theme.bulkCreate([
                {
                    name: 'Light',
                } as Optional<Theme, NullishPropertiesOf<Theme>>,
                {
                    name: 'Black',
                } as Optional<Theme, NullishPropertiesOf<Theme>>,
            ]);
        }
        console.log('Connection has been established successfully.');

        return sequelize;
    } catch (e) {
        console.error(e);
    }

    return null;
};

export default createClientAndConnect;
