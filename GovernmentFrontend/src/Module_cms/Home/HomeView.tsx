import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import Header from "../../Shared/Header";



const HomeView = () =>{
    const title="Home";
    return (
      <>
          
          <div>
          <Header name={title}/>
              <div className="page-content">
                  <div className="content">
                      <h1>Bienvenido Admin<i className="pi pi-user" style={{ fontSize: '2.5rem', padding: '1em' }}></i></h1>
                      <div className="flex flex-row justify-content-around">
                            <Link className="nav-link" to="/listar">
                                <Card title="Entidades Gubernamentales">
                                    <i className="pi pi-building-columns" style={{ fontSize: '2.5rem', padding: '1em' }}></i>
                                    <p className="m-0">
                                    Entidades Gubernamentales
                                    </p>
                                </Card>
                            </Link>
                            <Link className="nav-link" to="/listar">
                                <Card title="Entidades Gubernamentales">
                                    <i className="pi pi-building-columns" style={{ fontSize: '2.5rem', padding: '1em' }}></i>
                                    <p className="m-0">
                                    Entidades Gubernamentales
                                    </p>
                                </Card>
                            </Link>
                            <Link className="nav-link" to="/listar">
                                <Card title="Entidades Gubernamentales">
                                    <i className="pi pi-building-columns" style={{ fontSize: '2.5rem', padding: '1em' }}></i>
                                    <p className="m-0">
                                    Entidades Gubernamentales
                                    </p>
                                </Card>
                            </Link>
                        </div>                  


                  </div>
              </div>
          </div>
      </>
    );
}

export default HomeView;