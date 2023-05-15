import './App.css';
import React from 'react';


let parsed = '';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    // Initializing the state 
    this.state = { songs: [], checked: {}  };
  }

  parsedict(data){
    const dict = { ...this.state.checked};
    console.log(data)
    data.map( (d) => dict[d._id] = false )
    console.log(dict);
    return dict;
  }

  componentDidMount() {
  
    fetch('https://annie-apiproject-1.azurewebsites.net/api/getall')
        .then(response => response.json())
        .then(data => 
          this.setState({ songs: data, checked : this.parsedict(data) }));
          //console.log(typeof(this.state.songs))

  }


  handleClick = () => {
    console.log(' clicked!!');
  }

  handleCheck = (id) => {
    console.log(id)
    const dict = { ...this.state.checked};
    dict[id] = !this.state.checked[id];
    if(!this.state.checked[id]){
      console.log(dict)
      console.log("joooo")
      fetch('https://annie-apiproject-1.azurewebsites.net/api/' + id)
        .then(response => response.json())
        .then(data => 
          this.setState({ songs: [data], checked : dict }));
    }
    else{
      fetch('https://annie-apiproject-1.azurewebsites.net/api/getall')
      .then(response => response.json())
      .then(data => 
        this.setState({ songs: data, checked : dict }));

    }
  };

  render() {

    const songs = this.state.songs;
    console.log(songs)
    const listItems = songs.map((data) =>
    <tr>
    <td key={data.id} > {data.name} </td>
    <td> {data.artist} </td>
    <td> {data.year} </td>
    <td> {data.album} </td>
    <td> <input type="checkbox" onChange={() => this.handleCheck(data._id)} id={data._id} /> </td>
    <td><span class="pure-form-message">Click to filter/unfilter</span></td>
    </tr>
    );
    return (
      <div>
      <table class='pure-table pure-table-bordered'>
      <thead>
      <tr>
        <th>Song name</th>
        <th>Artist</th>
        <th>Year</th>
        <th>Album</th>
        <th>Single Out</th>
        <th>Help text</th>
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