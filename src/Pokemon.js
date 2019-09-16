import React from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Pokemon extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            sprite: '',
            name: '',
            abilities: [],
            index: 0,
        }
    }

    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon/'+this.props.match.params.name)
            .then(res => {
                console.log(res);
                this.setState({
                    sprite: res.data.sprites.front_default,
                    name: res.data.name,
                    abilities: res.data.abilities.map(abilities => <li>{abilities.ability.name}</li>),
                    index: Math.floor(res.data.id/20),
                });
            });
    }


    render (){
        return (
          <div>
              <img src={this.state.sprite} />
              <br />
              {this.state.name}
              <ul>
                  {this.state.abilities}
              </ul>
              <Link to={(this.state.index == 0) ? '/':'/'+this.state.index}>back</Link>
          </div>
        )
    }
}
export default Pokemon;