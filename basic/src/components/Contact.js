import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetail from './ContactDetail';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedKey : -1,
            keyword : '',
            contactData: [{
                name : 'Albert',
                phone : '010-0000-0001'
            },
            {
                name : 'Betty',
                phone : '010-0000-0002'
            },
            {
                name : 'Charlie',
                phone : '010-0000-0003'
            },
            {
                name : 'David',
                phone : '010-0000-0004'
            }]
        };

        this.save = this.state.contactData;

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentWillMount(){
        const contactData = localStorage.contactData;
        if(contactData){
            this.setState({
                contactData : JSON.parse(contactData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)){
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    handleChange(e){
        this.setState({
            keyword : e.target.value
        });
    }

    handleClear(){
        localStorage.clear();
        this.setState({
            contactData : this.save
        });
    }

    handleClick(key){
        this.setState({
            selectedKey : key
        });
    }

    handleCreate(contact){
        this.setState({
            contactData : update(
                this.state.contactData,
                {
                    $push : [contact]
                }
            )
        });
    }

    handleRemove(){
        this.setState({
            contactData : update(
                this.state.contactData,
                {
                    $splice : [[this.state.selectedKey,1]]
                }
            ),
            selectedKey : -1
        });
    }

    handleEdit(name, phone){
        this.setState({
            contactData : update(
                this.state.contactData,
                {
                    [this.state.selectedKey] : {
                        name : { $set : name },
                        phone : { $set : phone }
                    }
                }
            )
        });
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter((contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            });
            return data.map((v,i) => {
                return (<ContactInfo contact={v} key={i} index={i+1} onClick={() => this.handleClick(i)} />);
            });
        };
        return(
            <div>
                <h1 className="text-center">contact</h1>
                <hr/>
                <h2>List</h2>
                <input className="pull-right" type="text" placeholder="Search..." name="keyword" value={this.state.value} onChange={this.handleChange}/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>phone</th>
                        </tr>
                    </thead>
                    <tbody>{mapToComponents(this.state.contactData) }</tbody>
                </table>
                <hr/>
                <h2>Detail</h2>
                <ContactDetail
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                    onStaet={this.state.contactData}
                />
                <ContactCreate onCreate={this.handleCreate} onClear={this.handleClear}/>
                <br/>
            </div>
        );
    }
}

export default Contact;
