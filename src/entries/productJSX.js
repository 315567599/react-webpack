/**
 * Created by Administrator on 2017/8/30.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CustomTextInput from '../components/CustomTextInput';

function ProductCategoryRow(props) {
    return (<tr><th colSpan="2">{props.category}</th></tr>);
}

function ProductRow(props) {
    const name = props.product.stocked
        ? props.product.name
        : <span style={{color:'red'}}> {props.product.name} </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{props.product.price}</td>
        </tr>
    );
}

function Author(props) {
    return <p><span>{props.firstName}</span>{' '}<span>{props.lastName}</span></p>
}

function ProductTable(props) {
    var rows = [];
    var lastCategory = null;
    console.log(props.inStockOnly);
    props.products.forEach((product) => {
        if(product.name.indexOf(props.filterText) == -1 || (!product.stocked && props.inStockOnly)) {
           return;
        }

        if (product.category !== lastCategory) {
           rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }
    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextInputChange} />
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockInputChange} />
                    {' '}
                    only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           filterText:'',
           inStockOnly: false
       };
       this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
       this.handleInStockInput = this.handleInStockInput.bind(this);
    }

    handleFilterTextInput(filterText) {
       this.setState({
           filterText:filterText
       });
    }
    handleInStockInput(inStockOnly) {
       this.setState({
           inStockOnly:inStockOnly
       });
    }

    render() {
        const author = {firstName:'jiangcho', lastName:'chao'};
        return (
            <div>
                <SearchBar
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
                    onFilterTextInput = {this.handleFilterTextInput}
                    onInStockInput = {this.handleInStockInput}
                />
                <ProductTable
                    products = {this.props.products}
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
                />
                <Author {...author} />
                <CustomTextInput />
            </div>
        );
    }

}

var products = [
    {category:'Sporting Goods', price:'$49.99', stocked:true, name:'Football'},
    {category:'Sporting Goods', price:'$9.99', stocked:true, name:'Baseball'},
    {category:'Sporting Goods', price:'$29.99', stocked:false, name:'Baketball'},
    {category:'Electronics', price:'$99.99', stocked:true, name:'iPod Touch'},
    {category:'Electronics', price:'$399.99', stocked:false, name:'iPhone 5'},
    {category:'Electronics', price:'$199.99', stocked:true, name:'Nexus 7'},
];

ReactDOM.render(
    <FilterableProductTable products={products}/>,
    document.getElementById('root')
);
