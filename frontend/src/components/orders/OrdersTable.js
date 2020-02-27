import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {getOrders} from "../../actions/orders";
import '@n3/react-full-table/dist/n3-react-full-table.css';
import { FullTable } from '@n3/react-full-table';

class OrdersTable extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        orders: PropTypes.array.isRequired,
        getOrders: PropTypes.func.isRequired
    };
    state={
        getOrders: true
    };
    componentDidMount() {
        if (this.props.find!==false){
            this.props.getOrders(this.props.find)
        }else{
            this.props.getOrders()
        }
    }
    componentDidUpdate(){
        if (this.state.getOrders){
        if (this.props.find!==false){
            this.props.getOrders(this.props.find)
        }else{
            this.props.getOrders()
        }
        this.setState({
        getOrders: false
    })
    }

    }


    render() {
        console.log(this.state.getOrders);
        const statusesTranslated = {
            finished: 'Завершен',
            in_progress: 'Выполняется',
            open: 'Открыт'
        };
        let data = this.props.orders;
        const user = this.props.user;
        // если пользователь - исполнитель, то смотрим, передаем ли мы find, если да, то выбираем заказы, котрорые он
        // выполнил\выполшняет, если нет - то все заказы, которые не являются выполненными, и у которых не назначет
        // исполнитель
        if (user){
        if (user.user_type==='exe'){
            if(this.props.find!==undefined){
                data = data.filter(order=>{
                    return order.executor===user.id
                })
            }else{
                data = data.filter(order=>{
                    return order.status!=='finished' && order.executor===null
                })
            }
        }else if(user.user_type==='work'){
            data = data.filter(order => {
                return order.creator===user.id
            })
        }

        }
        const columns = {
            id: {
                title: 'Номер заказа',
                type: 'link',
                getHref: ({id}) => '/order/'+id+'/'
            },
            price: {
                title: 'Цена заказа',
                canDisable: true
            },
            status: {
                title: 'Статус заказа',
                canDisable: true,
                renderCell: ({status}) => statusesTranslated[status]
            }
        };
        const rootIds = ['id', 'status', 'price'];
        function delay(ms) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });
        }
        const loadItems = async ({
            sort: {
                param: sortParam,
                asc: sortAsc
            }
        }, {serializedValues}) => {
            await delay(350);
            const parsedPerPage = serializedValues.perPage;
             const sortedData = data.sort((item1, item2) => {
                 const value1 = item1[sortParam];
                 const value2 = item2[sortParam];
                 if (value1 === value2){
                     return 0;
                 }
                 if (sortAsc === (value1 > value2)){
                     return 1;
                 }
                 return -1;
             });
            const page = serializedValues || 1;
            const slicedData = parsedPerPage ? sortedData.slice((page-1) * parsedPerPage, page * parsedPerPage) : sortedData;
            return {
                items: slicedData,
                additional: {
                    count: sortedData.length,
                }
            }
        };
        return (
            <
                FullTable
                minColumnsNumber = {3}
                top = {20}
                fixedLeftCols = {2}
                placeholder = 'Нет записей'
                columns = {columns}
                rootIds = {rootIds}
                loadItems = {loadItems}
                appliedFilters = {
                    {
                        perPage: 10
                    }
                }
            />
        )

    }
}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    user: state.auth.user
});

export default connect(mapStateToProps,{getOrders})(OrdersTable);