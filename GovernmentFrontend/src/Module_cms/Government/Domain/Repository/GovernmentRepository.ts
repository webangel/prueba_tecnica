import { Government } from "../Model/Government";


export interface GovernmentRepository {
    getGovernments() : Promise<Government[]>;
    getGovernment(id: number) : Promise<Government | null>;
    createGovernment(data: Government): Promise<Government[]>;
    updateGovernment(data: Government): Promise<boolean>;
    removeGovernment(id: number): Promise<boolean>;
}