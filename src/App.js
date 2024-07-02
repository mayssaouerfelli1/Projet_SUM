import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCircle, faEye, faChartBar, faStar, faUser, faEdit, faCheck, faStickyNote, faShoppingCart, faGlasses } from '@fortawesome/free-solid-svg-icons';
import data from './data.js';

const App = () => {
  const [verres, setVerres] = useState([]);
  const [diametres, setDiametres] = useState([]);
  const [traitements, setTraitements] = useState([]);
  const [colorations, setColorations] = useState([]);
  const [selectedVerre, setSelectedVerre] = useState('');
  const [selectedDiametre, setSelectedDiametre] = useState('');
  const [selectedTraitement, setSelectedTraitement] = useState('');
  const [selectedColoration, setSelectedColoration] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    if (Array.isArray(data)) {
      const uniqueVerres = [...new Set(data.map(item => item.familleLibelle))];
      setVerres(uniqueVerres);
    } else {
      console.error('data is not an array');
    }
  }, []);

  const handleVerreChange = (e) => {
    const verre = e.target.value;
    setSelectedVerre(verre);
    const filteredDiametres = [...new Set(data.filter(item => item.familleLibelle === verre).map(item => item.codeDiametre))];
    setDiametres(filteredDiametres);
    setTraitements([]);
    setColorations([]);
  };
  
  const handleDiametreChange = (e) => {
    const diametre = e.target.value;
    setSelectedDiametre(diametre);
    const filteredTraitements = [...new Set(data.filter(item => item.familleLibelle === selectedVerre && item.codeDiametre === diametre).map(item => item.traitement))];
    setTraitements(filteredTraitements);
    setColorations([]);
  };
  
  const handleTraitementChange = (e) => {
    const traitement = e.target.value;
    setSelectedTraitement(traitement);
    const filteredColorations = [...new Set(data.filter(item => item.familleLibelle === selectedVerre && item.codeDiametre === selectedDiametre && item.traitement === traitement).map(item => item.coloration))];
    setColorations(filteredColorations);
  };

  const handleColorationChange = (e) => {
    setSelectedColoration(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row text-white p-3 mb-3 rounded-pill" style={{ backgroundImage: 'linear-gradient(to right, #1E3A5F, #3C9BD1)' }}>
        <div className="col">
          <nav className="nav">
            <a className="nav-link text-white" href="#">
              <FontAwesomeIcon icon={faSquare} /> <b>Sans Forme</b>
            </a>
            <a className="nav-link text-white" href="#">
              <FontAwesomeIcon icon={faCircle} /> <b>Avec Forme</b>
            </a>
            <a className="nav-link text-white" href="#">
              <FontAwesomeIcon icon={faEye} /><b> Lentille</b>
            </a>
            <a className="nav-link text-white" href="#">
              <FontAwesomeIcon icon={faChartBar} /><b> Suivi</b>
            </a>
            <a className="nav-link text-white" href="#">
              <FontAwesomeIcon icon={faStar} /> <b>Favoris</b>
            </a>
            <a className="nav-link text-white" href="#">
              <FontAwesomeIcon icon={faUser} /><b> Mon Profil</b>
            </a>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <div className="border border-dark rounded p-3 mb-3">
            <h5><FontAwesomeIcon icon={faStar} /> Mes favoris</h5>
            <ul className="list-group">
              <li className="list-group-item">CELESTE MAGIC BROWN 1.56 D70</li>
              <li className="list-group-item">CELESTE MAGIC GRAY 1.56 D65</li>
              <li className="list-group-item">CELESTE MAGIC GRAY 1.56 D70</li>
              <li className="list-group-item">CELESTE THIN</li>
              <li className="list-group-item">ORMA BLANC</li>
            </ul>
          </div>
        </div>

        <div className="col-9">
          <div className="border border-dark rounded p-3 mb-3">
            <h5><FontAwesomeIcon icon={faUser} /> Client</h5>
            <select className="form-control mb-3">
              <option value="">Aucun client sélectionné pour afficher l'agence</option>
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-lg-6">
              <div className="border border-dark rounded p-3 min-height-section">
                <h5><FontAwesomeIcon icon={faGlasses} /> Verres</h5>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label>Verre</label>
                    <select className="custom-select rounded-border" value={selectedVerre} onChange={handleVerreChange}>
                      <option value="">Sélectionner verre</option>
                      {verres.map((verre, index) => <option key={index} value={verre}>{verre}</option>)}
                    </select>
                  </div> <br />
                  <div className="form-group col-md-3">
                    <label>Diamètre</label>
                    <select className="custom-select rounded-border" value={selectedDiametre} onChange={handleDiametreChange} disabled={!selectedVerre}>
                      <option value="">Sélectionner diamètre</option>
                      {diametres.map((diametre, index) => <option key={index} value={diametre}>{diametre}</option>)}
                    </select>
                  </div> <br />
                  <div className="form-group col-md-3">
                    <label>Traitement</label>
                    <select className="custom-select rounded-border" value={selectedTraitement} onChange={handleTraitementChange} disabled={!selectedDiametre}>
                      <option value="">Sélectionner traitement</option>
                      {traitements.map((traitement, index) => <option key={index} value={traitement}>{traitement}</option>)}
                    </select>
                  </div><br />
                  <div className="form-group col-md-3">
                    <label>Coloration</label>
                    <select className="custom-select rounded-border" value={selectedColoration} onChange={handleColorationChange} disabled={!selectedTraitement}>
                      <option value="">Sélectionner coloration</option>
                      {colorations.map((coloration, index) => <option key={index} value={coloration}>{coloration}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="border border-dark rounded p-3 min-height-section">
                <h5><FontAwesomeIcon icon={faEdit} /> Correction</h5>
                <div className="table-responsive"><br />
                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Quantité</th>
                        <th>Cylindre</th>
                        <th>Sphère</th>
                        <th>Axe</th>
                        <th>Addition</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>OD</td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                      </tr>
                      <tr>
                        <td>OG</td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                        <td><input type="number" className="form-control" defaultValue="0" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-dark rounded p-3 mb-3">
            <h5><FontAwesomeIcon icon={faCheck} /> Validation Commande</h5>
            <button className="btn btn-primary mr-2" style={{ backgroundColor: '#1E3A5F' }}>Vérifier Stock</button>&nbsp;
            <button className="btn btn-secondary">Equivalent</button>
            <div className="form-group mt-3">
              <label><FontAwesomeIcon icon={faStickyNote} /> Note</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group mt-3">
              <label><FontAwesomeIcon icon={faUser} /> Porteur</label>
              <input type="text" className="form-control" />
            </div>
            <button className="btn btn-success">Ajouter</button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="border border-dark rounded p-3">
            <h5><FontAwesomeIcon icon={faShoppingCart} /> Panier</h5>
            <p>Aucune commande ajoutée</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
