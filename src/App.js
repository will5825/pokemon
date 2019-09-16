import React from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

class App extends React.PureComponent {

  constructor(props){
    super(props);

    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);

    this.state = {
      pokemon: [],
      next: null,
      previous: null,
    }
  }

  componentDidMount(){
    console.log(this.props.match.params.index);
    if(this.props.match.params.index != null){
      axios.get('https://pokeapi.co/api/v2/pokemon?offset='+this.props.match.params.index*20+'&limit=20')
        .then(res => {
          this.setState({
            pokemon: res.data.results.map(results => <li><Link to={'/pokemon/'+results.name}>{results.name}</Link></li>),
            next: res.data.next,
            previous: res.data.previous
          });
        });
    }
    else{
      axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(res => {
          this.setState({
            pokemon: res.data.results.map(results => <li><Link to={'/pokemon/'+results.name}>{results.name}</Link></li>),
            next: res.data.next,
            previous: res.data.previous
          });
        });
    }

    
  }

  onNext(e){
    axios.get(this.state.next)
    .then(res => {
      this.setState({
        pokemon: res.data.results.map(results => <li><Link to={'/pokemon/'+results.name}>{results.name}</Link></li>),
        next: res.data.next,
        previous: res.data.previous
      });
    })
  }

  onPrevious(e){
    axios.get(this.state.previous)
      .then(res => {
        this.setState({
          pokemon: res.data.results.map(results => <li><Link to={'/pokemon/'+results.name}>{results.name}</Link></li>),
          next: res.data.next,
          previous: res.data.previous
        });
      })
  }

  render () {
    return (
      <div>
        <ul>{this.state.pokemon}</ul>
        <button onClick={this.onPrevious}>prev</button>
        <button onClick={this.onNext}>next</button>
      </div>
    )
  }
}

export default App;
