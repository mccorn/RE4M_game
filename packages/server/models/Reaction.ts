// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,max-len
// import { Table, Model, Column, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';

// import Comment from './Comment';
// import Post from './Post';
// import Reply from './Reply';
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
// import User from './User';

// @Table({
//     tableName: 'reactions',
// })
class Reaction extends Model {
    //     @Column({
    //         type: DataType.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true,
    //     })
    //     override id!: number;
    //
    //     @Column({
    //         type: DataType.STRING,
    //     })
    //         reaction!: string;
    //
    //     @ForeignKey(() => User)
    //     @Column({
    //         type: DataType.INTEGER,
    //     })
    //         userId!: number;
    //
    //     // reply
    //     @Index
    //     @ForeignKey(() => Reply)
    //     @Column({
    //         type: DataType.INTEGER,
    //         allowNull: true,
    //     })
    //         replyId?: number;
    //
    //     @BelongsTo(() => Reply, {
    //         foreignKey: 'replyId',
    //         constraints: false, // Make the association optional
    //     })
    //         reply?: Reply;
    //
    //     // post
    //     @Index
    //     @ForeignKey(() => Post)
    //     @Column({
    //         type: DataType.INTEGER,
    //         allowNull: true,
    //     })
    //         postId?: number;
    //
    //     @BelongsTo(() => Post, {
    //         foreignKey: 'postId',
    //         constraints: false, // Make the association optional
    //     })
    //         post?: Post;
    //
    //     // comment
    //     @Index
    //     @ForeignKey(() => Comment)
    //     @Column({
    //         type: DataType.INTEGER,
    //         allowNull: true,
    //     })
    //         commentId?: number;
    //
    //     @BelongsTo(() => Comment, {
    //         foreignKey: 'commentId',
    //         constraints: false, // Make the association optional
    //     })
    //         comment?: Comment;
}

export default Reaction;
