import React, {Component} from 'react';
import {
    Container,
    Row,
    Col, 
    Button, 
    Form,
    Alert
} from 'react-bootstrap';
import uniqid from 'uniqid';
import Filter from "./ui/Filter";
import Content from "./ui/Content";
import List from "./ui/List";
import {CATEGORIES} from "./constants";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            params : {
                category : {
                    label : '',
                    value : ''
                },
                contents : '',
            },
            search : {
                categories : []
            },
            errors : {
                contents : false
            },
            list : []
        };
    }
    
    componentDidMount() {
        this.setState({
            ...this.state,
            search : {
                ...this.state.search,
                categories: CATEGORIES.map(v => v.value)
            }
        })
    }

    setSearchCategories = (categories, isChecked) => {
        if(isChecked) {
            this.setState({
                ...this.state,
                search : {
                    ...this.state.search,
                    categories: this.state.search.categories.filter(v => v === categories).length > 0 
                        ? this.state.search.categories 
                        : this.state.search.categories.concat(categories)
                }
            });
        } else {
            let _categories = this.state.search.categories.filter(v => {
                return v !== categories[0];
            });

            this.setState({
                ...this.state,
                search : {
                    ...this.state.search,
                    categories: _categories
                }
            });
        }
    };

    setList = () => {
        if(this.state.params.category.value === '') {
            return this.setState({
                ...this.state,
                errors : {
                    ...this.state.errors,
                    category : true
                }
            })
        } else if (this.state.params.contents === '') {
            return this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    category : false,
                    contents: true
                }
            });
        }

        this.setState({
            ...this.state,
            params : {
                ...this.state.params,
                contents: '',
                category : {
                    label : '',
                    value : ''
                }
            },
            errors : {
                ...this.state.errors,
                contents : false,
                category : false
            },
            list : [
                {
                    id : uniqid(),
                    contents : this.state.params.contents,
                    category : this.state.params.category,
                    createDatetime : new Date().getTime()
                },
                ...this.state.list
            ]
        });
    };

    setParams = (params) => {
        this.setState({
            ...this.state,
            params : {
                ...this.state.params,
                ...params
            }
        });
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h4>새해 복 많이 받으세요.!</h4>
                        <h6>(친구, 동료, 가족에게 메세지를 보내요.)</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form
                            onSubmit={e => {
                                e.preventDefault();
                                this.setList();
                            }}>
                            <Content
                                category={this.state.params.category}
                                contents={this.state.params.contents}    
                                changeParams={this.setParams}/>
                            {this.state.errors.contents &&
                            <Alert variant={"danger"}>
                                내용을 입력해주세요.
                            </Alert>
                            }
                            {this.state.errors.category &&
                            <Alert variant={"danger"}>
                                카테고리를 선택해주세요.
                            </Alert>
                            }
                            <Button
                                type={"submit"}>
                                보내기
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Filter
                            categories={this.state.search.categories}
                            setCategories={this.setSearchCategories}
                        />
                        <hr/>
                        <List list={this.state.list.filter(v => this.state.search.categories.indexOf(v.category.value) !== -1)}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default App;