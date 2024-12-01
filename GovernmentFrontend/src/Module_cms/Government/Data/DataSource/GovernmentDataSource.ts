import { GovernmentApiEntity } from "./API/Entity/GovernmentApiEntity";


export default interface GovernmentDataSource{
    getGovernments() : Promise<GovernmentApiEntity[]>;
    getGovernment(id: number) : Promise<GovernmentApiEntity>;
    createGovernment(data: GovernmentApiEntity): Promise<GovernmentApiEntity[]>;
    updateGovernment(data: GovernmentApiEntity): Promise<boolean>;
    removeGovernment(id: number): Promise<boolean>;

}