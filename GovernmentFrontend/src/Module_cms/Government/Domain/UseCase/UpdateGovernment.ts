import { Government } from "../Model/Government";
import { GovernmentRepository } from "../Repository/GovernmentRepository";


export interface UpdateGovernmentUseCase {
    invoke: (id: Government) => Promise<boolean>;
  }

export class UpdateGovernment implements UpdateGovernmentUseCase{
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
        const update  = await this.governmentRepo.updateGovernment(data);
        return update;
    }

}