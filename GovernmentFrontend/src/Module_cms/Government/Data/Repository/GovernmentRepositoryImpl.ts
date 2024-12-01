import { Government } from "../../Domain/Model/Government";
import { GovernmentRepository } from "../../Domain/Repository/GovernmentRepository";
import GovernmentDataSource from "../DataSource/GovernmentDataSource";

export class GovernmentRepositoryImpl implements GovernmentRepository{

    dataSource: GovernmentDataSource;

    constructor(_datasource: GovernmentDataSource) {
      this.dataSource = _datasource;
    }
    getGovernment(id: number): Promise<Government | null> {
        return this.dataSource.getGovernment(id);
    }

    getGovernments(): Promise<Government[]> {
        return this.dataSource.getGovernments();
    }
    createGovernment(data: Government): Promise<Government[]> {
        return this.dataSource.createGovernment(data);
    }
    updateGovernment(data: Government): Promise<boolean> {
        return this.dataSource.updateGovernment(data);
    }
    removeGovernment(id: number): Promise<boolean> {
        return this.dataSource.removeGovernment(id);
    }

}