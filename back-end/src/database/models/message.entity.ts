import { Field, ObjectType } from '@nestjs/graphql'
import User from './user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    OneToMany,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'messages' })
export default class Message {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    content: string;

    @Field()
    @Column({ name: 'user_id' })
    userID: number;

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Field(() => User)
    user: User;

    // Associations

    @ManyToOne(() => User, user => user.messageConnection, {
        primary:
            true
    })

    @JoinColumn({ name: 'user_id' })
    userConnection: Promise<User>;

}

