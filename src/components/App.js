import React from 'react';
import axios from 'axios';
import Map from './Map';
import Shield from '../assets/icons/ISS_insignia.png';

const openNotifyAPI = axios.create({
  baseURL: `http://api.open-notify.org/iss-now.json`,
});

function Info(props) {
  return (
    <div className="info">
      <p>
        The <b>International Space Station (ISS)</b> is a modular space station
        (habitable artificial satellite) in low Earth orbit. It is a
        multinational collaborative project between five participating space
        agencies: NASA (United States), Roscosmos (Russia), JAXA (Japan), ESA
        (Europe), and CSA (Canada). The ownership and use of the space station
        is established by intergovernmental treaties and agreements. The ISS
        program evolved from the Space Station Freedom, an American proposal in
        the 1980s to construct a permanently crewed Earth-orbiting station.
      </p>
      <img src={Shield} alt="ISS Shield" className="shield" />
    </div>
  );
}

function Table(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Longitude</th>
          <th>Latitude</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="longitude">{props.longitude}</td>
          <td className="latitude">{props.latitude} </td>
        </tr>
      </tbody>
    </table>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
    };
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
    setInterval(this.getLocation, 1000);
  }

  getLocation() {
    openNotifyAPI.get('/').then((response) => {
      this.setState({
        longitude: response.data.iss_position.longitude,
        latitude: response.data.iss_position.latitude,
      });
    });
  }

  render() {
    return (
      <div className="app">
        <h1 className="title-app">ISS Realtime Locator</h1>
        <div className="container">
          <Table
            longitude={this.state.longitude}
            latitude={this.state.latitude}
          />
          <Map
            longitude={this.state.longitude}
            latitude={this.state.latitude}
            className="map"
          />
          <Info />
        </div>
      </div>
    );
  }
}

export default App;
