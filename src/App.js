import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    guessArray: [13],
    wins: 0,
    losses: 0,
    guessCount: 0,
    gameOver: false
  };
  
  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue= array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleGuessIncrement = () => {
    console.log("incrementing guesses");
    this.setState({ guessCount: this.state.guessCount + 1 });
  }
  
  handleWinIncrement = () => {
    console.log("incrementing wins");
    this.setState({ wins: this.state.wins +1 });
  }
  
  handleLossIncrement = () => {
    console.log("incrementing Losses");
    this.setState({ losses: this.state.losses +1 });
  }
  


  game = id => {
    console.log("id: " + id);
    this.setState({ guessCount: this.state.guessCount +1});
    this.state.guessArray.push(id);
    this.setState({ guessArray: this.state.guessArray });
    this.shuffle(friends);
    for (var i=0; i<this.state.guessCount+1; i++) {
      console.log("for loop starting...ID: " + id + " guessArray index: " + this.state.guessArray[i]);
      if (id === this.state.guessArray[i]) {
        this.setState({gameOver: true});
        console.log("gameover set to true");
        this.setState({guessCount: 0});
        this.setState({losses: this.state.losses + 1});
        this.setState({guessArray : [13]});
        alert("you lose");
      }
      else if(!this.state.gameOver && i >= this.state.friends.length -1) {
      this.setState({guessCount: 0});
      this.setState({wins: this.state.wins + 1});
      this.setState({guessArray : [13]});
      alert("you win"); 
      }
      else if(this.state.gameOver === true) {
        this.setState({gameOver: false})
      }
        
  }console.log("i: " + i)
}

      // shuffle()


    // Filter this.state.friends for friends with an id not equal to the id being removed
    // const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    // this.setState({ friends });
  // };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div className="container">
        <Title>Total Rickall</Title>
        <h3>Guesses: {this.state.guessCount}</h3>
        <h3>Wins: {this.state.wins}</h3>
        <h3>Losses: {this.state.losses}</h3>
        {this.state.friends.map(friend => (
          <button className="btn">
          
          <FriendCard
            game={this.game}
            id={friend.id}
            key={friend.id}
            image={friend.image}
          />
          </button>
        ))}
      </div>
    );
  }
}

export default App;
