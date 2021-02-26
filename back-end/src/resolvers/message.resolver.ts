import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import Message from 'src/database/models/message.entity';
import User from 'src/database/models/user.entity';
import RepoService from 'src/repo.service';
import MessageInput, { DeleteMessageInput } from './input/message.input';

@Resolver(() => Message)
export default class MessageResolver {
    constructor(private readonly repoService: RepoService) { }

    @Query(() => [Message])
    public async getMessages(): Promise<Message[]> {
        return this.repoService.messageRepo.find();
    }

    @Query(() => Message, { nullable: true })
    public async getMessagesFromUser(@Args('userID') userID: number): Promise<Message[]> {
        console.log(userID);
        return this.repoService.messageRepo.find({ where: { userID } });
    }

    @Query(() => Message, { nullable: true })
    public async getMessage(@Args('id') id: number): Promise<Message> {
        return this.repoService.messageRepo.findOne(id)
    }

    @Mutation(() => Message)
    public async createMessage(@Args('data') input: MessageInput):
        Promise<Message> {
        console.log(input);
        var message = this.repoService.messageRepo.create({
            content: input.content,
            userID: input.userID
        });
        return this.repoService.messageRepo.save(message);
    }


    @Mutation(() => Message, { nullable: true })
    public async deleteMessage(@Args('data') input: DeleteMessageInput): Promise<Message> {

        var message = await this.repoService.messageRepo.findOne(input.id);

        if (!message || message.userID != input.userID) throw new Error("Message doesn't exist or you're not the author.");


        let copy = { ...message }

        await this.repoService.messageRepo.remove(message);

        return copy
    }


    @ResolveField(() => User, { name: 'user' })
    public async getUser(@Parent() parent: Message): Promise<User> {
        return this.repoService.userRepo.findOne(parent.userID);
    }
}