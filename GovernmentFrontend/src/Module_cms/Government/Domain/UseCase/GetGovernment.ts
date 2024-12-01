import { Government } from "../Model/Government";
import { GovernmentRepository } from "../Repository/GovernmentRepository";


export interface GetGovernmentUseCase {
    invoke: (id: number) => Promise<Government>
}

export class GetGovernment implements GetGovernmentUseCase {
    private governmentRepo: GovernmentRepository;

    constructor(_GovernmentRepo: GovernmentRepository) {
        this.governmentRepo = _GovernmentRepo;
    }
    
    async invoke(id: number): Promise<Government> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid ID. It must be a positive integer.");
        }

        const government = await this.governmentRepo.getGovernment(id);

        if (!government) {
            throw new Error(`No government found with ID: ${id}`);
        }

        return government;
    }

}