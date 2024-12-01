import { GovernmentRepository } from "../Repository/GovernmentRepository";


export interface DeleteGovernmentUseCase {
    invoke: (id: number) => Promise<boolean>;
  }

export class RemoveGovernment implements DeleteGovernmentUseCase {
    private governmentRepo: GovernmentRepository;
    constructor(_GovernmentRepo: GovernmentRepository) {
        this.governmentRepo = _GovernmentRepo;
    }
    async invoke (id: number) {
        if(!id){
            throw new Error(
                "Your todo should have at leat 2 characters."
              );
        }
         
        const deleted  = await this.governmentRepo.removeGovernment(id);
        return deleted;
    }
    
}