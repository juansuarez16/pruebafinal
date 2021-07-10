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
    id: '',
    Nombre: '',
    Apellido: '',
    Tipo_de_documento: '',
    Documento_de_identidad: '',
    Correo_Electrónico: '',
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
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url+this.state.form.id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(url+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarPersona=(Persona)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: Persona.id,
      nombre: Persona.nombre,
      pais: Persona.pais,
      capital_bursatil: Persona.capital_bursatil
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
          <td>{persona.Correo_Electrónico}</td>
          <td>{persona.Celular}</td>
          <td>{persona.Fecha_de_Nacimiento}</td>
          <td>{persona.url}</td>
          {/* <td>{new Intl.NumberFormat("en-EN").format(empresa.capital_bursatil)}</td>  */}
          <td>
                <button className="btn btn-primary" ><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.Nombre: ''}/>
                    <br />
                    <label htmlFor="apellido">Apellido</label>
                    <input className="form-control" type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form?form.Apellido: ''}/>
                    <br />
                    <label htmlFor="tipodocumento">Tipo de documento de identidad</label>
                    <input className="form-control" type="text" name="tipodocumento" id="tipodocumento" onChange={this.handleChange} value={form?form.Tipo_de_documento: ''}/>
                    <br />
                    <label htmlFor="documento de identidad">Documento de identidad</label>
                    <input className="form-control" type="text" name="documentonum" id="documentonum" onChange={this.handleChange} value={form?form.Documento_de_identidad: ''}/>
                    <br />
                    <label htmlFor="correo_electronico">Correo Electrónico</label>
                    <input className="form-control" type="text" name="correoelectro" id="correoelectro" onChange={this.handleChange} value={form?form.Correo_Electrónico: ''}/>
                    <br />
                    <label htmlFor="correo_electronico">Celular</label>
                    <input className="form-control" type="text" name="celular" id="celular" onChange={this.handleChange} value={form?form.Celular: ''}/>
                    <br />
                    <label htmlFor="fechanacimiento">Fecha de Nacimiento</label>
                    <input className="form-control" type="text" name="fechanacimiento" id="fechanacimiento" onChange={this.handleChange} value={form?form.Fecha_de_Nacimiento: ''}/>
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
               Estás seguro que deseas eliminar a la empresa {form && form.nombre}
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
