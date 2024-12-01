import { Government } from "../Model/Government";
import { GovernmentRepository } from "../Repository/GovernmentRepository";


export interface GetGovernmentUseCase {
    invoke: () => Promise<Government[]>
}

export class GetGovernments implements GetGovernmentUseCase {
    private governmentRepo: GovernmentRepository;

    constructor(_GovernmentRepo: GovernmentRepository) {
        this.governmentRepo = _GovernmentRepo;
    }
    
    invoke() {
        const getData = this.governmentRepo.getGovernments();
        return getData;
    };

}