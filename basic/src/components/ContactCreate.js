import React from 'react';

class ContactCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            phone : '',
            message : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick(){
        const contact = {
            name : this.state.name,
            phone : this.state.phone
        };
        if(contact.name != '' && contact.phone != ''){
            this.props.onCreate(contact);
            this.setState({
                name : '',
                phone : '',
                message : ''
            });
        }else{
            this.setState({
                message : 'No name, No phone'
            });
        }

        this.nameInput.focus();
    }

    handleKeyPress(e){
        if(e.charCode == 13) this.handleClick();
    }

    render(){
        return (
            <div>
                <hr/>
                <h2>Create Contact</h2>
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="name..." value={this.state.name}
                    onChange={this.handleChange}
                    ref={(ref) => {this.nameInput = ref }}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="phone" placeholder="phone... XXX-XXXX-XXXX" value={this.state.phone}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}/>
                </div>
                <br/>
                <button onClick={this.props.onClear} className="btn btn-md btn-default">Reset</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.handleClick} className="btn btn-md btn-primary">Create</button>
                <br/>
                <p>{this.state.message}</p>
            </div>
        )
    }
}


ContactCreate.defaultProps = {
    onCreate : () => {console.log("contents is not defined!");}
}
export default ContactCreate;
