import React from "react";
import callApi from './../../utils/apiCaller'
import { Link } from 'react-router-dom'
import {actAddProductRequest, actGetProductRequest, actUpdateProduct, actUpdateProductRequest} from './../../actions/index'
import { connect } from "react-redux";

class ProductActionPage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            id:'',
            txtName:'',
            txtPrice:'',
            chkbStatus:false
        }
    }

    componentDidMount(){
        var { match } = this.props
        if(match){
            this.props.onEditProduct(match.params.id)
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditting){
            var {itemEditting} = nextProps
            console.log(itemEditting)
            this.setState({
                id: itemEditting.id,
                txtName: itemEditting.name,
                txtPrice: itemEditting.price,
                chkbStatus: itemEditting.status
            })
        }
    }

    onChange=(e)=>{
        var target = e.target;
        var name = target.name;
        var value = target.type==='checkbox'?target.checked:target.value
        if(name==='txtPrice'){
            value=parseInt(target.value)
        }
        this.setState({
            [name]:value
        })
    }

    onSave=(e)=>{
        e.preventDefault()
        var { txtName, txtPrice, chkbStatus, id } = this.state
        var { history } = this.props
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if(id){
            this.props.onUpdateProduct(product)
        }else{
            this.props.onAddProduct(product)
        }
        history.goBack()                    
    }

    render() {
        var { txtName, txtPrice, chkbStatus } = this.state
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <form onSubmit={this.onSave}>
                    <legend>Thêm sản phẩm</legend>
                
                    <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input type="text" className="form-control" id="" placeholder="Input field" name='txtName'
                            value={txtName} onChange={this.onChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input type="number" className="form-control" id="" placeholder="Input field" name='txtPrice'
                            value={txtPrice} onChange={this.onChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type='checkbox' name='chkbStatus'
                                value={chkbStatus} onChange={this.onChange}
                                checked={chkbStatus}
                            /> 
                            Còn hàng
                        </label>
                    </div>
                    <Link to='/product-list' className='btn btn-danger'>Trở về</Link>
                    <button type="submit" className="btn btn-primary">Lưu lại</button>
                </form>
                
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        itemEditting: state.itemEditting
    }
}

const mapDispatchToProps=(dispatch,props)=>{
    return {
        onAddProduct : product => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct : id => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct : product => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
