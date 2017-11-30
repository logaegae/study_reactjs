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
    }

    render(){
        return (
            <div>
                <hr/>
                <h2>Create Contact</h2>
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="name..." value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="phone" placeholder="phone... XXX-XXXX-XXXX" value={this.state.phone} onChange={this.handleChange}/>
                </div>
                <br/>
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
