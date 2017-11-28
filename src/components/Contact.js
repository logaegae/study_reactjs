import React from 'react';
import ContactInfo from './ContactInfo';

class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            keyword : e.target.value
        });
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter((contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            });
            return data.map((v,i) => {
                return (<ContactInfo contact={v} key={i} index={i+1}/>);
            });
        };
        return(
            <div>
                <h2 className="text-center">contact</h2>
                <input className="pull-right" type="text" placeholder="Search..." name="keyword" value={this.state.value} onChange={this.handleChange}/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>phone</th>
                        </tr>
                    </thead>
                    <tbody>{mapToComponents(this.state.contactData)}</tbody>
                </table>
                {this.state.keyword}
            </div>
        );
    }
}

export default Contact;
