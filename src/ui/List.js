import React, {Component} from 'react';
import {
    Table
} from 'react-bootstrap';
import moment from 'moment';

class List extends Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Content</th>
                    <th>Category</th>
                    <th>Create Date</th>
                </tr>
                </thead>
                <tbody>
                {this.props.list.length === 0 ? (
                    <tr>
                        <td colSpan={3}>
                            Empty list
                        </td>
                    </tr>
                ) : (
                    <React.Fragment>
                        {this.props.list.map((item) =>
                            <tr key={item.id}>
                                <td>{item.contents ? item.contents : '-'}</td>
                                <td>{item.category.label ? item.category.label : '-'}</td>
                                <td>{item.createDatetime ? moment(item.createDatetime).format('YYYY-MM-DD HH:mm:ss') : '-'}</td>
                            </tr>
                        )}
                    </React.Fragment>
                )}
                </tbody>
            </Table>
        )
    }
}

export default List;