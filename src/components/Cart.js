import { useState, useEffect } from "react";
import "./styles.css";
import { CartState } from "../context/Context";
import { Button, ListGroup, Row, Col, Image, Form } from "react-bootstrap";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    // eslint-disable-next-line
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((pre, curr) => pre + Number(curr.price) * curr.qty, 0)
    );

    // eslint-disable-next-line
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.src} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>NT$ {prod.price.split(".")[0]}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <div className="filtersContainer">
          <span className="title">Subtotal: ({cart.length})</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: NT$ {total}
          </span>
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
