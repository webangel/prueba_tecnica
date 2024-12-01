import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { classNames } from 'primereact/utils';
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../Shared/Header";
import GovernmentViewModel from "./GovernmentViewModel";

export interface GovernmentForm {
    id?: number;
    name: string;
    description: string;
    website: string;
    address: string;
    phone: string;
    email: string;
}

export const GovernmentFormView = ()=>{

    const { id } = useParams();
    const [nameAction, setNameAction] = useState("Crear");
    const [colorBtn, setColorbtn] = useState<"success" | "warning" | "secondary" | "info" | "danger" | "help" | "contrast">("secondary");
    const title=`${nameAction} Registro`;
    const toast = useRef(null);
     

    const defaultValues = {
        id: 0,
        name: '', 
        description: '', 
        website: '',
        address: '',
        email: '',
        phone: '',
    };

    const {
        government,
        getGovernment,
        createGovernment,
        updateGovernment,
      } = GovernmentViewModel();

    const show = (data: any) => {
        // @ts-ignore
       toast.current.show({ severity: 'success', summary: `Se ${ nameAction==="Crear" ? "registro" : "actualizo"}`, detail: `${data.name}`});
   };
   
   const navigate = useNavigate();

    const onSubmit = (
        data: any) => {
        
        let datos = data;
        if(datos){
            data.name && show(data);
            if(nameAction==="Crear"){
                createGovernment(data);
                reset();
            }else{
                updateGovernment(data);
                reset({
                    name: '',
                    description: '',
                    website: '',
                    address: '',
                    email: '',
                    phone: '',
                  });
            }
            setTimeout(() => {
                return navigate("/listar");
            }, 2000);
            
        }
        
        
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues });

    const getFormErrorMessage = (name: String) => {
        // @ts-ignore
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    

    useEffect(() => {
    
    const fetchGovernment = async () => {
        try {
            if(id){
                const idGov = parseInt(id);
                setNameAction("Editar");
                setColorbtn("warning");
                const data = await getGovernment(idGov); 
                console.log(data);
            if (data !==null) {
                reset({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    website: data.website,
                    address: data.address,
                    email: data.email,
                    phone: data.phone,
                  });
               
            }
            }else {
                reset({
                    id: 0,
                    name: '',
                    description: '',
                    website: '',
                    address: '',
                    email: '',
                    phone: '',
                  });
            }
        } catch (error) {
            console.error("Error al obtener el Government", error);
        }
    };

    fetchGovernment();
        
    }, [id]);
    
return(
    <>
         <div>
        <Header name={title}/>
            <div className="page-content">
                <div className="content">
                <div className='row'>
                    <div className='col-12'>
                        <div className="card p-3">
                            <form onSubmit={handleSubmit(onSubmit)} className="text-start">

                                <Toast ref={toast} />
                                <div className="grid">
                                    <div className="col-6">
                                        <div className="field">
                                            <Controller
                                                name="name"
                                                control={control}
                                                rules={{ required: 'Nombre es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Nombre 
                                                        </label>
                                                        <InputText  id={field.name} name={field.name} value={field.value}  onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            />
                                        </div>
                                        <div className="field">
                                            <Controller
                                                name="description"
                                                control={control}
                                                rules={{ required: 'Descripción es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Descripción
                                                        </label>
                                                        <Editor id={field.name} name={field.name} value={field.value} onTextChange={(e) => field.onChange(e.textValue)} style={{ height: '250px' }} className={classNames({ 'p-invalid': fieldState.error })} />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            />
                                        </div>
                                        <div className="field">
                                            <Controller
                                                name="website"
                                                control={control}
                                                rules={{ required: 'Website es requerido.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name}>
                                                            Website
                                                        </label>
                                                        <InputText id={field.name} name={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })}  />
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                                
                                            />
                                           
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="field">
                                        <Controller
                                                    name="address"
                                                    control={control}
                                                    rules={{ required: 'Address es requerido.' }}
                                                    render={({ field, fieldState }) => (
                                                        <>
                                                            <label htmlFor={field.name}>
                                                                Address
                                                            </label>
                                                            <InputText id={field.name} name={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })} />
                                                            {getFormErrorMessage(field.name)}
                                                        </>
                                                    )}
                                                    
                                                />
                                        </div>
                                        <div className="field">
                                            <Controller
                                                    name="phone"
                                                    control={control}
                                                    rules={{ required: 'Phone es requerido.' }}
                                                    render={({ field, fieldState }) => (
                                                        <>
                                                            <label htmlFor={field.name}>
                                                                Phone
                                                            </label>
                                                            <InputText id={field.name} name={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })} />
                                                            {getFormErrorMessage(field.name)}
                                                        </>
                                                    )}
                                                    
                                                />
                                        </div>
                                        <div className="field">
                                            <Controller
                                                    name="email"
                                                    control={control}
                                                    rules={{ required: 'Email es requerido.' }}
                                                    render={({ field, fieldState }) => (
                                                        <>
                                                            <label htmlFor={field.name}>
                                                                Email
                                                            </label>
                                                            <InputText id={field.name} name={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames('w-full',{ 'p-invalid': fieldState.error })} />
                                                            {getFormErrorMessage(field.name)}
                                                        </>
                                                    )}
                                                    
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-float-content">
                                    <Button label="Guardar" type="submit" icon="pi pi-check" severity={colorBtn} />  
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
);
}