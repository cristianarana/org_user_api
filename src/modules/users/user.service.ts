import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

export class UserService {
    constructor (
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async createUser(data:
        {
            name: string;
            email: string;
            password: string;
        }): Promise<UserEntity> {

        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ id });
    }
}