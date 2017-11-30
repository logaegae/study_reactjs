import React from 'react';

class ContactDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isEdit : false,
            name : '',
            phone : ''
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleToggle(){
        if(!this.state.isEdit){
            this.setState({
                name : this.props.contact.name,
                phone : this.props.contact.phone
            })
        }else{
            this.handleEdit();
        }
        this.setState({
            isEdit : !this.state.isEdit
        });
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleEdit(){
        this.props.onEdit(this.state.name, this.state.phone);
    }

    render(){
        const detail = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const edit = (
            <div>
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="name..." value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="phone" placeholder="phone... XXX-XXXX-XXXX" value={this.state.phone} onChange={this.handleChange}/>
                </div>
            </div>
        );
        const view  = this.state.isEdit ? edit : detail;
        const buttons = (
            <div>
                <button className="btn btn-md btn-default" onClick={this.handleToggle}>{!this.state.isEdit ? 'Edit' : 'OK'}</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-md btn-default" onClick={this.props.onRemove}>Remove</button>
            </div>
        );
        const blank = (<div>Not Selected</div>);

        return(
            <div>
                {this.props.isSelected ? view : blank}
                <br/>
                {this.props.isSelected ? buttons : ''}
            </div>

        );
    }
}

ContactDetail.defaultProps = {
    contact : {
        name : '',
        phone : ''
    },
    onRemove : () => {console.error('onRemove is not defiend');},
    onEdit : () =>{console.error('onEdit is not defined');}
};
export default ContactDetail;
