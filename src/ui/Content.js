import React, {Component} from 'react';
import {
    Form
} from 'react-bootstrap';
import {CATEGORIES} from "../constants";

class Content extends Component {
    render() {
        return (
            <React.Fragment>
                <Form.Group controlId="">
                    <Form.Label>Category</Form.Label>
                    {CATEGORIES.map((category, i) =>
                        <Form.Check
                            inline
                            key={i}
                            type={'radio'}
                            name={'contentCategories'}
                            value={category.value}
                            label={category.label}
                            id={`content-category-${category.value}`}
                            checked={this.props.category.value === category.value}
                            onChange={(e) => {
                                this.props.changeParams({
                                    category: category
                                });
                            }}
                        >
                        </Form.Check>
                    )}
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label>Contents</Form.Label>
                    <Form.Control
                        type={"textarea"}
                        rows={"5"}
                        placeholder={"내용을 입력해주세요."}
                        value={this.props.contents}
                        onChange={(e) => this.props.changeParams({
                            contents : e.target.value
                        })}
                    />
                </Form.Group>
            </React.Fragment>
        );
    }
}

export default Content;