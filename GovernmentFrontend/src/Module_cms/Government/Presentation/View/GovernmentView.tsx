import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../../../Shared/Header";

import './Government.css';

import GovernmentViewModel from "./GovernmentViewModel";

  export const GovernmentView = ()=> {


    const toast = useRef(null);
    const title="Entidades Gubernamentales";

    const columns = [
        { field: 'name', header: 'Nombre', editable: false },
        { field: 'description', header: 'Descripción', editable: false },
        { field: 'address', header: 'Address', editable: false },
        { field: 'phone', header: 'Phone', editable: false },
        { field: 'options', header: 'Opciones', editable: false },
    ];
    
    const {
        governments,
        getGovernments,
        removeGovernment,
      } = GovernmentViewModel();


    useEffect(() => { 
        let isMounted = true; 
    
    const fetchGovernments = async () => {
        try {
            
            if (isMounted) {
                getGovernments();
            }
        } catch (error) {
            console.error("Error al obtener los Governments:", error);
        }
    };
    fetchGovernments();

    return () => {
        isMounted = false;
    };
    }, []);

    const btnOptions = (id: number)=>{
        return(
            <>
                <Toast ref={toast} />
                <div className="d-flex">
                   
                    <Link to={`/editar/${id}`} className="p-2 bg-primary text-white radius-btn"><i className="pi pi-pencil"></i></Link>&nbsp;
                    <button onClick={()=>confirmDelete(id)} className="button p-2 bg-red-500 text-white border-none radius-btn"><i className="pi pi-eraser"></i></button>
                </div>
            </>
        );
    }
  
    const accept = async (id: number) => {
        
        let deleted = await removeGovernment(id);
       
        if(deleted){
            // @ts-ignore
            toast.current?.show({ severity: 'info', summary: 'Confirmada', detail: 'has aceptado', life: 3000 });
          // @ts-ignore
           await getGovernments();
        }     
    }
    const reject = () => {
        // @ts-ignore
        toast.current?.show({ severity: 'warn', summary: 'Rechazada', detail: 'has rechazado', life: 3000 });
    }
    const confirmDelete = (id: number) => {

        confirmDialog({
            message: '¿Quieres eliminar este registro?',
            header: 'Eliminar confirmación',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => accept(id),
            reject
        });
    };
    return (
        <>
                  <div>
              <Header name={title}/>
              <div className="page-content">
                  <div className="content">
                  <ConfirmDialog />
                      <div className="card">
                        <DataTable 
                        value={governments} 
                        paginator rows={5} 
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        tableStyle={{ minWidth: '50rem' }}
                        
                        >
                             <Column
                                header="N°"
                                body={(rowData, { rowIndex }) => rowIndex + 1}
                            />
                            {columns.map(({ field, header  }) => {
                                            return <Column key={field} field={field} header={header}  
                                            body={field === 'options' ? (e)=> btnOptions(e.id) : null                                           
                                            }
    
                                            />
                                    })}
                        </DataTable>
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
  }