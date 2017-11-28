import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name : ''
        };
    }

    render() {
        return(
            <div>
                <button onClick={()=>{this.setState({name : 'BYKIM'});}}> Click </button>
                <div>Hello World??? {this.state.name}</div>
            </div>
        );
    }
}

export default App;
