import React from 'react';

class ContactInfo extends React.Component {
    render() {
        return(
            <tr onClick={this.props.onClick} className="pointer">
                <th>{this.props.index}</th>
                <td>{this.props.contact.name}</td>
                <td>{this.props.contact.phone}</td>
            </tr>
        );
    }
}

export default ContactInfo;
