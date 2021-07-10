import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://localhost:3200/";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id_persona: '',
    Nombre: '',
    Apellido: '',
    Tipo_de_documento: '',
    Documento_de_identidad: '',
    Correo_Electronico: '',
    Celular: '',
    Fecha_de_Nacimiento:'',
    url:'',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data.row});  
 
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id_persona;
 await axios.post(url+"crear",this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url+this.state.form.id_persona, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionDelete=()=>{  
  console.log(this.state)
  axios.delete(url+this.state.form.id_persona).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarPersona=(persona)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id_persona: persona.id_persona,
      Nombre:persona.Nombre,
      Apellido: persona.Apellido,
      Tipo_de_documento: persona.Tipo_de_documento,
      Documento_de_identidad:persona.Documento_de_identidad,
      Correo_Electronico:persona.Correo_Electronico,
      Celular:persona.Celular,
      Fecha_de_Nacimiento:persona.Fecha_de_Nacimiento,
      url:persona.url
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Persona</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Tipo de documento de identidad</th>
          <th>Documento de identidad</th>
          <th>Correo Electrónico</th>
          <th>Celular</th>
          <th>Fecha de Nacimiento</th>
          <th>Archivo</th>  
          <th>Acciones</th>
        </tr>
      </thead>
     <tbody>
        {this.state.data.map(persona=>{
          return(
            <tr>
          <td>{persona.id_persona}</td>
          <td>{persona.Nombre}</td>
          <td>{persona.Apellido}</td>
          <td>{persona.Tipo_de_documento}</td>
          <td>{persona.Documento_de_identidad}</td>
          <td>{persona.Correo_Electronico}</td>
          <td>{persona.Celular}</td>
          <td>{persona.Fecha_de_Nacimiento}</td>
          <td>{persona.url}</td>          
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarPersona(persona); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarPersona(persona); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  
                  <div className="form-group">
                    <label htmlFor="id_persona">ID</label>
                    <input className="form-control" type="text" name="id_persona" id= "id_persona" readOnly onChange={this.handleChange} value={form?form.id_persona: this.state.data.length +1 }/>
                    <br />
                    <label htmlFor="Nombre">Nombre</label>
                    <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre: ''}/>
                    <br />
                    <label htmlFor="Apellido">Apellido</label>
                    <input className="form-control" type="text" name="Apellido" id="Apellido" onChange={this.handleChange} value={form?form.Apellido: ''}/>
                    <br />
                    <label htmlFor="Tipo_de_documento">Tipo de documento de identidad</label>
                    <select className="form-control" value={form?form.Tipo_de_documento: ''} onChange={this.handleChange}>
                              <option value="0">Seleccionar</option>
                              <option value="1">Tarjeta de identidad</option>
                              <option value="2">Cedula de ciudadania</option>                            
                               </select>                    
                    <br />
                    <label htmlFor="Documento_de_identidad">Documento de identidad</label>
                    <input className="form-control" type="text" name="Documento_de_identidad" id="Documento_de_identidad" onChange={this.handleChange} value={form?form.Documento_de_identidad: ''}/>
                    <br />
                    <label htmlFor="Correo_Electronico">Correo Electrónico</label>
                    <input className="form-control" type="text" name="Correo_Electronico" id="Correo_Electronico" onChange={this.handleChange} value={form?form.Correo_Electronico: ''}/>
                    <br />
                    <label htmlFor="Celular">Celular</label>
                    <input className="form-control" type="text" name="Celular" id="Celular" onChange={this.handleChange} value={form?form.Celular: ''}/>
                    <br />
                    <label htmlFor="Fecha_de_Nacimiento">Fecha de Nacimiento</label>
                    <input className="form-control" type="text" placeholder="AAAA-MM-DD" name="Fecha_de_Nacimiento" id="Fecha_de_Nacimiento" onChange={this.handleChange} value={form?form.Fecha_de_Nacimiento: ''}/>
                    <br />    
                    <label htmlFor="url">url</label>
                    <input className="form-control" type="text" name="url" id="url" onChange={this.handleChange} value={form?form.url: ''}/>
                    <br />                
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la persona {form && form.Documento_de_identidad+' '+form.Nombre+' '+form.Apellido}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default App;
