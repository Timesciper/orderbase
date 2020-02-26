import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Select from 'react-select';
import { Button, ButtonsToolbar, Clay } from '@n3/kit'
import { getItems } from "../../actions/items";
import {createOrder} from "../../actions/orders";


class CreateCard extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    };
    componentDidMount(){
        this.props.getItems()
    }
    state = {
        hidden: false,
        price: 0.0,
        status: 'open',
        creator: this.props.user.id,
        executor: null,
        items: []
    };
    render () {
        const onSave = () => {
            const data = {
            price: this.state.price,
            status: 'open',
            creator: this.props.user.id,
            executor: null,
            items: this.state.items
            };
            this.props.createOrder(data);
            this.setState({
                hidden: true
            })
        };
        const handleChange = (event) => {
            this.setState({
                price: event.target.value,
            })
        };
        const handleSelect = (inputValue) => {
            let selected = [];
            for (let key in inputValue){
                selected.push(inputValue[key].value)
            }
            this.setState({
                items: selected
            })
        };
        let selectOptions = [];
        for (let key in this.props.items){
            selectOptions.push(
                {
                    label: this.props.items[key].name,
                    value: this.props.items[key].id
                }
            )
        }
        return (
            <div hidden={this.state.hidden} className={'container'}>
                <hr/>
                    <h3>Создание нового заказа. Статус - Открытый </h3>
                    <hr/>
                    <Select onChange={handleSelect}
                            options={selectOptions}
                            placeholder={'Выберите товары'}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            isMulti
                    />
                    <hr/>
                        <h4>Стоимость заказа</h4>
                        <hr/>
                <input onChange={handleChange} type={'number'} className={'form-control'}/>
                <hr/>
                <Button onClick={onSave}>Сохранить</Button>

                    </div>
        )

    }

}

const mapStateToProps = state => ({
    items: state.items.items,
    user: state.auth.user
});

export default connect(mapStateToProps, {getItems, createOrder})(CreateCard)