import { Repository } from "typeorm";
import { OrganizationEntity } from "./organization.entity";


export class OrganizationService {
    constructor (
        private readonly organizationRepository: Repository<OrganizationEntity>,
    ){}

    async createOrganization(data:
        {
            orgCode: string;
            name: string;
            description?: string;
            address?: string;
        }): Promise<OrganizationEntity> {
        const organization = this.organizationRepository.create(data);
        return await this.organizationRepository.save(organization);
    }

    async getAllOrganizations(): Promise<OrganizationEntity[]> {
        return await this.organizationRepository.find();
    }

    async getOrganizationByOrgCode(orgCode: string): Promise<OrganizationEntity | null> {
        return await this.organizationRepository.findOneBy({ orgCode });
    }

    async updateOrganization(orgCode: string, data:
        {
            name?: string;
            description?: string;
            address?: string;
        }): Promise<OrganizationEntity | null> {
        const organization = await this.organizationRepository.findOneBy({ orgCode });
        if (!organization) {
            return null;
        }
        Object.assign(organization, data);
        return await this.organizationRepository.save(organization);
    }
}