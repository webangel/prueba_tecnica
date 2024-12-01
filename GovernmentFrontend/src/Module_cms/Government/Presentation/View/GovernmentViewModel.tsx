import { useState } from "react";
import GovernmentApiDataSourceImpl from "../../Data/DataSource/API/GovernmentApiDataSource";
import { GovernmentRepositoryImpl } from "../../Data/Repository/GovernmentRepositoryImpl";
import { Government } from "../../Domain/Model/Government";
import { CreateGovernment } from "../../Domain/UseCase/CreateGovernment";
import { GetGovernment } from "../../Domain/UseCase/GetGovernment";
import { GetGovernments } from "../../Domain/UseCase/GetGovernments";
import { RemoveGovernment } from "../../Domain/UseCase/RemoveGovernment";
import { UpdateGovernment } from "../../Domain/UseCase/UpdateGovernment";


export default function GovernmentViewModel() {
    const [governments, setGovernments] = useState<Government[]>([]);
    const [government, setGovernment] = useState<Government>();

    const governmentDataSourceImpl = new GovernmentApiDataSourceImpl();

    const governmentRepositoryImpl = new GovernmentRepositoryImpl(governmentDataSourceImpl);

    const getGovernmentsUseCase = new GetGovernments(governmentRepositoryImpl);

    const getGovernmentUseCase = new GetGovernment(governmentRepositoryImpl);

    const createGovernmentUseCase = new CreateGovernment(governmentRepositoryImpl);

    const removeGovernmentUseCase = new RemoveGovernment(governmentRepositoryImpl);
    const updateGovernmentUseCase = new UpdateGovernment(governmentRepositoryImpl);

    async function getGovernments() {
        setGovernments( await getGovernmentsUseCase.invoke());
      }

      async function getGovernment(id: number) {
        const government = await getGovernmentUseCase.invoke(id);
        if(government){
          setGovernment( await getGovernmentUseCase.invoke(id));
          console.log("data", government);
         return government;
        
        }
        return null;
      }

      async function createGovernment(data: Government) {
        try {
          const createdGovernment = await createGovernmentUseCase.invoke(data);
          if(createdGovernment){
            console.log("enviado");
          }
          //_resetValue();
        } catch (e) {
          //_resetValue();
          if (e instanceof Error) {
            console.log(e.message);
          }
        }
      } 

      async function removeGovernment(id: number) {
        try {
          let removedGovernment = await removeGovernmentUseCase.invoke(id);
          if(removedGovernment){
            console.log("eliminado");
           return removedGovernment;
          
          }
          //_resetValue();
        } catch (e) {
          //_resetValue();
          if (e instanceof Error) {
            console.log(e.message);
          }
          return Error;
        }
      }

      async function updateGovernment(data: Government) {
        try {
          let updatedGovernment = await updateGovernmentUseCase.invoke(data);
          if(updatedGovernment){
            console.log("Actualizado");
           return updatedGovernment;
          
          }
          //_resetValue();
        } catch (e) {
          //_resetValue();
          if (e instanceof Error) {
            console.log(e.message);
          }
          return Error;
        }
      }

      return {
        governments,
        government,
        getGovernments,
        getGovernment,
        createGovernment,
        updateGovernment,
        removeGovernment,
      };
}