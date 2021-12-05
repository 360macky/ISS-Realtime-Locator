import React from 'react';
import Map from './Map';
import Shield from '../assets/icons/ISS_insignia.png';

function Info() {
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
      limitReached: false,
    };
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 429) {
          this.setState({ limitReached: true });
        } else {
          this.setState({
            longitude: Number(data.longitude.toFixed(3)),
            latitude: Number(data.latitude.toFixed(3)),
            limitReached: false,
          });
        }
      });
  }

  render() {
    return (
      <div className="app">
        <h1 className="title-app">ISS Realtime Locator</h1>
        <div className="container">
          {this.state.limitReached ? (
            <div className="app-error">Alert: Tracking limit reached</div>
          ) : null}
          <Table
            longitude={this.state.longitude}
            latitude={this.state.latitude}
          />
          <Map
            longitude={this.state.longitude}
            latitude={this.state.latitude}
          />
          <Info />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getLocation();
    setInterval(this.getLocation, 2000);
  }
}

export default App;
