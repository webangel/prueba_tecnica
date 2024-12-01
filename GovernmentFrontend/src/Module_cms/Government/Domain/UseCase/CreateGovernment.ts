import { Government } from "../Model/Government";
import { GovernmentRepository } from '../Repository/GovernmentRepository';


export interface CreateGovernmentUseCase {
    invoke: (data: Government) => Promise<Government[]>
}

export class CreateGovernment implements CreateGovernmentUseCase {

    private governmentRepo: GovernmentRepository;

    constructor(_GovernmentRepo: GovernmentRepository) {
        this.governmentRepo = _GovernmentRepo;
    }
    async invoke(data: Government){
        if(!data){
            throw new Error(
                "Your todo should have at leat 2 characters."
              );
        }

        const created = await this.governmentRepo.createGovernment(data);
        return created;
    }

}