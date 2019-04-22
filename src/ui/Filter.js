import React, {Component} from 'react';
import {
    Form
} from "react-bootstrap";
import {CATEGORIES} from "../constants";

class Filter extends Component {
    render() {
        return(
            <div className={"mb-3"}>
                <Form.Group controlId="">
                    <Form.Label>Search</Form.Label>
                    {CATEGORIES.map((category, i) =>
                        <Form.Check
                            inline
                            key={i}
                            type={'checkbox'}
                            name={'categories'}
                            value={category.value}
                            label={category.label}
                            id={`category-${category.value}`}
                            checked={this.props.categories.filter(v => v === category.value).length > 0}
                            onChange={(e) => {
                                this.props.setCategories([e.target.value], e.target.checked);
                            }}
                        >
                        </Form.Check>
                    )}
                </Form.Group>
            </div>
        )
    }
}

export default Filter;