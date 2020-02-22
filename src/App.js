import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';
import firebase from 'firebase';
import { Card } from 'antd';
import { Button } from 'antd';

const { Meta } = Card;


var config = {
  apiKey: "AIzaSyDPTL4TuBYjIKABivsEJZc4BnTdlM4vpng",
  authDomain: "dog-guessing.firebaseapp.com",
  databaseURL: "https://dog-guessing.firebaseio.com",
  projectId: "dog-guessing",
  storageBucket: "dog-guessing.appspot.com",
  messagingSenderId: "1020583029447"
};
firebase.initializeApp(config);
var database = firebase.database();


class App extends Component {
  state = {
    guess: "",
    guesses: [],
  };
  updateGuess = (guess) => {
    this.setState({
      guess: guess
    })
  }
  componentDidMount () {
    fetch("https://random.dog/woof.json").then(response => response.json())
    .then(
      res => {
         this.setState ({
        image: res.url,
      })
    }
    );
  }
  cardPics = () => {
    let pics = this.state.image;
      return (
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="Open in new tab" src={pics} />}
      >
        <Meta
          title="Random Dog"
          description="From https://random.dog/woof.json"
        />
      </Card>
      )
  }
  submit = () => {
    let guess = this.state.guess;
    this.setState({
    guesses: this.state.guesses.concat({
      guess: this.state.guess
    }),
    guess: ""
    })
    fetch("https://random.dog/woof.json").then(response => response.json())
    .then(
      res => {
         this.setState ({
        image: res.url,
      })
    }
    );
  }
  pass = () => {
    fetch("https://random.dog/woof.json").then(response => response.json())
    .then(
      res => {
         this.setState ({
        image: res.url,
      })
    }
    );
  }
  render() {
    return ( <div style = {{ display: "flex", flexDirection: "column", alignItems: "center", }}>
      <header>Guess that Dog Breed!</header>
      {this.cardPics()}
      <p>Guess: <input value = {this.state.guess} onChange = {(e) => this.updateGuess(e.target.value)}></input></p>
      <Button type = "primary" onClick = {this.submit}>Guess</Button>
      <Button type="primary" onClick = {this.pass}>Pass</Button> 
      <List guesses = {this.state.guesses}/>

      </div>
    );
  }
}
export default App;