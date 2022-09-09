import { createContext, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const MyContext = createContext();

const DEFAULT_STATE = {
    stage: 1,
    players: [],
    result: ''
};

class MyProvider extends Component {
  state = DEFAULT_STATE;

  addPlayerHandler = (name) => {
    this.setState((prevState) => ({
      players: [
        ...prevState.players,
        name
      ]
    }))
  }

  removePlayerhandler = (index) => {
    let newArr = this.state.players;
    newArr.splice(index, 1);
    this.setState({ players: newArr });
  }

  nextStageHandler = () => {
    const { players } = this.state;

    if (players.length < 2) {
      toast.error("You need to add more than one player", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    } else {
      this.setState({
        stage: 2
      }, () => {
        setTimeout(() => {
          this.generateLoser()
        }, 1000);
      })
    }
  }

  generateLoser = () => {
    const { players } = this.state;

    this.setState({
      result: players[Math.floor(Math.random() * players.length)]
    })
  }

  resetGame = () => {
    this.setState(DEFAULT_STATE);
  }

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addPlayer: this.addPlayerHandler,
            removePlayer: this.removePlayerhandler,
            nextStage: this.nextStageHandler,
            getNewLooser: this.generateLoser,
            resetGame: this.resetGame
          }}
        >
          {this.props.children}
        </MyContext.Provider>
        <ToastContainer />
      </>
    );
  }
}

export { MyContext, MyProvider };
