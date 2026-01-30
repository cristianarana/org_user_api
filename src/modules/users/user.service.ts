import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { OrganizationService } from "../organizations/organization.service";

export class UserService {
    constructor (
        private readonly userRepository: Repository<UserEntity>,
        private readonly organizationService: OrganizationService
    ){}

        async createUser(data:
            {
                name: string;
                email: string;
                password: string;
                organizationCode: string;
            }): Promise<UserEntity> {

            const validateOrg = await this.organizationService.getOrganizationByOrgCode(data.organizationCode);
            if (!validateOrg) {
                throw new Error('Invalid organization code');
            }

            const user = this.userRepository.create(data);
            return await this.userRepository.save(user);
        }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUserByUsername(username: string): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ username });
    }

    async updateUser(id: string, data:
        {
            name?: string;
            email?: string;
            password?: string;
            organizationCode?: string;
        }): Promise<UserEntity | null> {
        
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new Error('User not found or not exists');
            }

            const validateOrg = data.organizationCode ? await this.organizationService.getOrganizationByOrgCode(data.organizationCode) : null;
            if (data.organizationCode && !validateOrg) {
                throw new Error('Invalid organization code');
            }

            Object.assign(user, data);
            return await this.userRepository.save(user);
        }
}