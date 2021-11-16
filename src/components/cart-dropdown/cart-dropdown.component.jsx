
import './cart-dropdown.styles.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';





const CartDropdown = ({ cartItems }) => (

    <div className = 'cart-dropdown'>
        <div className = 'cart-items'>
            {
                cartItems.map(cartitem => (
                    <CartItem key = {cartitem.id} item = {cartitem} />
                ))
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>

)

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})


export default connect(mapStateToProps)(CartDropdown);







