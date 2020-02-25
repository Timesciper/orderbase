import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Select from 'react-select';

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
        );
        if (order!==null && order!==undefined){
            this.setState({
                items: order[0].items,
                target: order[0]
            });
        }
    }
    // что тут должно быть: если ты работник - все серое, кнопка взять заказ, если он уже им взят, то кнопка выполнить
    // если ты работодатель, который открыл заказ - возможность его закрыть, изменить items в заказе
    // если за него кто-то взялся - будет видно кто
    // если юзер - система, скорее всего просто все серое?
    render () {

        const user = this.props.user;
        let items = [];
        let order = this.state.target;
        let userType = '';
        if (user!==undefined){
           userType = user.user_type
        }// endif
        items = this.state.items;
        let selectOptions = [];
        for (let key in items){
            selectOptions.push(
                {
                    label: items[key].name,
                    value: items[key].id
                }
            )
        }
        console.log('********************');
        console.log(this.state);
        console.log('********************');
        const statuses = {
            open: 'Открытый',
            in_progress: 'Выполняется',
            finished: 'Выполнен'
        };

        let disabled = true;
        const handleSelect = (inputValue) => {
            this.setState({
                items: inputValue.value
            })
        };
        // у нас есть items этого заказа (вроде бы) так что осталось сделать селект и просто дизейбл, если исполнитель
        if (order===undefined){
            return <h1> Не найдено </h1>
        }
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
                            placeholder={'Выберите товары'}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            isMulti
                    />
                    <hr/>
                        <h4>Стоимость заказа {order.price}</h4>
                    </div>

                )

        }

    }

}

const mapStateToProps = state => ({
    user: state.auth.user,
    orders: state.orders.orders,
    items: state.items.items
});

export default connect(mapStateToProps)(OrderCard)