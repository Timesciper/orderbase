import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Select from 'react-select';
import { Button, ButtonsToolbar, Clay } from '@n3/kit'
import {putOrder, getOrders, deleteOrder} from '../../actions/orders'


class OrderCard extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        orders: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired
    };
    state = {
        items: [],
        price: 0,
        creator: '',
        executor: '',
    };
    componentDidMount(){
        const order = this.props.orders.filter(
            order => {
                if (order.id.toString()===this.props.target.toString()){
                    return true
                }
            }
        )[0];
        let items = order.items;
        this.setState({
            items: items,
            order: order
        })
    }

    // что тут должно быть: если ты работник - все серое, кнопка взять заказ, если он уже им взят, то кнопка выполнить
    // если ты работодатель, который открыл заказ - возможность его закрыть, изменить items в заказе
    // если за него кто-то взялся - будет видно кто
    // если юзер - система, скорее всего просто все серое?
    render () {
        const items = this.state.items;
        const order = this.state.order;
        const user = this.props.user;
        let userType = '';
        if (user!==undefined){
           userType = user.user_type
        }// endif

        let selectOptions = [];
        for (let key in this.props.items){
            selectOptions.push(
                {
                    label: this.props.items[key].name,
                    value: this.props.items[key].id
                }
            )
        }

        let defaultItems = selectOptions.filter(option=> {
            if(items!==undefined){
                if(items.includes(option.value)){
                    return true
                }
            }
        });

        const statuses = {
            open: 'Открытый',
            in_progress: 'Выполняется',
            finished: 'Выполнен'
        };
        let disabled = true;
        const handleSelect = (inputValue) => {
            let selected = [];
            for (let key in inputValue){
                selected.push(inputValue[key].value)
            }
            this.setState({
                items: selected
            })
        };
        // у нас есть items этого заказа (вроде бы) так что осталось сделать селект и просто дизейбл, если исполнитель
        if (order===undefined){
            return <h1> Не найдено </h1>
        }
        const onDelete =() => {
            this.props.deleteOrder(this.state.order.id);
        };
        const onSave = () => {

            const data = {
                id: this.state.order.id,
                price: this.state.price,
                items: this.state.items,
                status: this.state.order.status,
                creator: this.props.user.id,
                executor: null
            };
            this.props.putOrder(data);
            this.props.getOrders()
        };
        const status = statuses[order.status];
        switch (userType) {
            case 'exe':
                disabled = true;
                return (
                    <div className={'container'}>
                    <h3>Заказ № {order.id}. Статус - {status} </h3>
                    <hr/>
                    <Select onChange={handleSelect}
                            options={selectOptions}
                            value={defaultItems}
                            isDisabled={disabled}
                            placeholder={'Выберите товары'}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            isMulti
                    />
                    <hr/>
                        <h4>Стоимость заказа {order.price}</h4>
                        <hr/>

                    </div>

                );
            case 'work':
                if(order.status==='open'){
                disabled = false;
                }else{
                    disabled = true;
                }
                return (
                    <div className={'container'}>
                    <h3>Заказ № {order.id}. Статус - {status} </h3>
                    <hr/>
                    <Select onChange={handleSelect}
                            options={selectOptions}
                            isDisabled={disabled}
                            value={defaultItems}
                            placeholder={'Выберите товары'}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            isMulti
                    />
                    <hr/>
                        <h4>Стоимость заказа {order.price}</h4>
                        <hr/>
                        <ButtonsToolbar>
                        <Button disabled={disabled} onClick={onSave} color={'primary'}>Сохранить</Button>
                        <Button disabled={disabled} color={'default'} onClick={onDelete}>Удалить</Button>
                        </ButtonsToolbar>


                    </div>

                );
            case 'system':
                disabled = true;
                return (
                    <div className={'container'}>
                    <h3>Заказ № {order.id}. Статус - {status} </h3>
                    <hr/>
                    <Select onChange={handleSelect}
                            options={selectOptions}
                            value={defaultItems}
                            placeholder={'Выберите товары'}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            isMulti
                    />
                    <hr/>
                        <h4>Стоимость заказа {order.price}</h4>
                        <hr/>

                    </div>

                );

        }

    }

}

const mapStateToProps = state => ({
    user: state.auth.user,
    orders: state.orders.orders,
    items: state.items.items
});

export default connect(mapStateToProps,{putOrder, getOrders, deleteOrder})(OrderCard)