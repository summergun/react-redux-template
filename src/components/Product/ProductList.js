import React from 'react';
import { connect } from 'react-redux';
import { destroyProduct } from '../../redux/reducers/productsReducer';

const ProductListItem = ({ product, destroyProduct })=> (
  <li className='list-group-item'>
    { product.name }
    {
      product.imageURL ? (
        <img src={ product.imageURL } width='100px' height='100px'/>
      ) : ( null )
    }
    <button onClick={ destroyProduct } className='btn btn-danger pull-right'>x</button>
    <br style={{ clear: 'both'}} />
  </li>
);

const ProductList = ({ products, destroyProduct})=> (
    <ul className='list-group'>
    {
      products.map( product => {
        return (
          <ProductListItem  key={ product.id} product={ product } destroyProduct={()=> destroyProduct(product)} /> 
        );
      })
    }
    </ul>
);

const mapDispatchToProps = (dispatch)=> (
  {
    destroyProduct: (product)=> dispatch(destroyProduct(product))
  }
);

const mapStateToProps = (state)=> (
  {
    products: state.products
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
