import axios from "axios";
import { Environment } from "../../../../../Config/Constants/environment";
import { Government } from "../../../Domain/Model/Government";
import GovernmentDataSource from "../GovernmentDataSource";
import { GovernmentApiEntity } from "./Entity/GovernmentApiEntity";

const baseURL = `${Environment.apiUrl}/Government`;
const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlRlc3RVc2VyIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzMzMDAzNjE4LCJleHAiOjE3MzM2MDg0MTgsImlhdCI6MTczMzAwMzYxOCwiaXNzIjoiU0JJc3N1ZXIiLCJhdWQiOiJTQkF1ZGllbmNlIn0.bLxZWXRkfLhjQZGs89D4o5ViU2rBZBY2Rn83bMpesoo';
export default class GovernmentApiDataSource implements GovernmentDataSource{
    async getGovernment(id: number): Promise<GovernmentApiEntity> {
        try {
            const response = await axios.get(`${baseURL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
                },
            );
            const government: GovernmentApiEntity = response.data;
            console.log(government);
            return government || null;
            
        } catch (error) {
            console.error("Error al obtener Governments:", error);
            throw new Error("Error al obtener Governments");
        }
    }
    async getGovernments(): Promise<GovernmentApiEntity[]> {
        try {
            const response = await axios.get(baseURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            });
            const listGovernments = response.data;
            if (listGovernments && Array.isArray(listGovernments)) {
                // Mapea los datos de la respuesta al formato de Category que esperas
                const governments: Government[] = listGovernments.map((item: Government) => ({
                  id: item.id,  
                  name: item.name, 
                  description: item.description,
                  website: item.website,
                  address: item.address,
                  phone: item.phone,
                  email: item.email,
                }))
                .sort((a, b) => {
                    if (a.id > b.id) return -1;
                    if (a.id < b.id) return 1;
                    return 0;
                });
                
                return governments;
              } else {
                throw new Error("La respuesta no tiene el formato esperado");
              }
        } catch (error) {
            console.error("Error al obtener governments:", error);
        throw new Error("Error al obtener governments");
        }
    }
    async createGovernment(data: GovernmentApiEntity): Promise<GovernmentApiEntity[]> {
        try {
            const postData = {
                id: data.id,  
                name: data.name, 
                description: data.description,
                website: data.website,
                address: data.address,
                phone: data.phone,
                email: data.email,
              };
              const response = await axios.post(baseURL, postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
              });

              if (response.status === 201) {
                
                const government = response.data;
                
                return government;
              } else {
                throw new Error("La respuesta no tiene el formato esperado");
              }
            
        } catch (error) {
            console.error("Error al agragar government:", error);
            throw new Error("Error al agragar government");
        }
    }
    async updateGovernment(data: GovernmentApiEntity): Promise<boolean> {
        try {
            const response = await axios.put(`${baseURL}/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            });
            if (response.status === 200) {
                return true;
            } else {
                throw new Error("La respuesta no tiene el formato esperado");
            }
        } catch (error) {
            console.error("Error al actualizar government:", error);
            throw new Error("Error al actualizar government");
        }
    }
    async removeGovernment(id: number): Promise<boolean> {
        try {
            const response = await axios.delete(`${baseURL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            });
            if (response.status === 204) {
                return true;
            } else {
                throw new Error("La respuesta no tiene el formato esperado");
            }
        } catch (error) {
            console.error("Error al eliminar government:", error);
            throw new Error("Error al eliminar government");
        }
    }


}