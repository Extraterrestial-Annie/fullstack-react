import './App.css';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);

    // Initializing the state 
    this.state = { songs: [], checked: {} };
  }

  parsedict(data) {
    const dict = { ...this.state.checked };
    //console.log(data)
    data.map((d) => dict[d._id] = false)
    //console.log(dict);
    return dict;
  }

  componentDidMount() {

    fetch('https://annie-apiproject-1.azurewebsites.net/api/getall')
      .then(response => response.json())
      .then(data =>
        this.setState({ songs: data, checked: this.parsedict(data) }));
    //console.log(typeof(this.state.songs))

  }


  handleCheck = (id) => {
    //console.log(id)
    const dict = { ...this.state.checked };
    dict[id] = !this.state.checked[id];
    if (!this.state.checked[id]) {
      //console.log(dict)
      //console.log("joooo")
      fetch('https://annie-apiproject-1.azurewebsites.net/api/' + id)
        .then(response => response.json())
        .then(data =>
          this.setState({ songs: [data], checked: dict }));
    }
    else {
      fetch('https://annie-apiproject-1.azurewebsites.net/api/getall')
        .then(response => response.json())
        .then(data =>
          this.setState({ songs: data, checked: dict }));

    }
  };

  render() {

    const songs = this.state.songs;
    //console.log(songs)
    const listItems = songs.map((data) =>
      <tr key={data._id}>
        <td> {data.name} </td>
        <td> {data.artist} </td>
        <td> {data.year} </td>
        <td> {data.album} </td>
      </tr>
    );

    const listItems2 = songs.map((data) =>
    <li class="pure-menu-item" key={data._id}>
      <button onClick={() => this.handleCheck(data._id)} class="pure-menu-link">{songs.length > 1 ? data._id : "show all"}</button>
    </li>
  );

    return (
      <div>
        <div class="pure-menu pure-menu-horizontal">
          <ul class="pure-menu-list">
            <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
              <button id="menuLink1" class="pure-menu-link">Select ID</button>
              <ul class="pure-menu-children">
              {listItems2}
              </ul>
            </li>
          </ul>
        </div>
        <table class='pure-table pure-table-bordered'>
          <thead>
            <tr>
              <th>Song name</th>
              <th>Artist</th>
              <th>Year</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;