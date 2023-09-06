import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import {Postrequest} from "../../../../apicall/index";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    PaymentElement,
    CardElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);


const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

export default function CForm({
    cardMonth,
    cardYear,
    onUpdateState,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
    onCardInputFocus,
    onCardInputBlur,
    cardCvv,
    children,
    productId,
    setActiveStep
}) {
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const stripe = useStripe();
     const elements = useElements();

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setName(name, value)
        onUpdateState(name, value);
    };

    
    const paymentCardSubmit = async(event)=>{

          await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        }).then(async(cardResponse)=>{
           const {id} = cardResponse;
            await axios.post("api/orders/payment-intent", {
                 id,
                 productId
            }).then(async(paymentIntents)=>{
             paymentConform(paymentIntents)
             setActiveStep(3)
            }).catch((error)=>{
                console.log(error.message)  
            })
        }).catch((error)=>{
          console.log(error.message)
        })
    }


    async function paymentConform(paymentIntents) {

        const cardElement = elements.getElement(CardNumberElement);
        const { paymentIntent, error } = await stripe.confirmCardPayment(paymentIntents?.data?.order?.client_secret, {
            payment_method: {
              card: cardElement,
              billing_details: {
               name: name,
              },
            },
          });
      
          if (error) {
            return
            console.log(error,"error");
          } else if (paymentIntent.status === 'succeeded') {
            return paymentIntent
          }   
    }
    // TODO: We can improve the regex check with a better approach like in the card component.
    const onCardNumberChange = (event) => {
        let { value, name } = event.target;
        let cardNumber = value;
        
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            // regular cc number, 16 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        setCardNumber(cardNumber.trimRight());
        onUpdateState(name, cardNumber);
    };

    const onCvvFocus = (event) => {
        // value = value.replace(/\D/g, '');
        // if (/^3[47]\d{0,13}$/.test(value)) {
        // }
        onUpdateState('isCardFlipped', true);
    };

    const onCvvBlur = (event) => {
        onUpdateState('isCardFlipped', false);
    };

    // NOTE: Currently the cursor on the card number field gets reset if we remove a number, the code bellow was used
    // in class components, need to transform this to work with functional components.
    // getSnapshotBeforeUpdate() {
    //     return this.props.cardNumberRef.current.selectionStart;
    // }

    // const componentDidUpdate = function (prevProps, prevState, cursorIdx) {
    //     const node = cardNumberRef.current;
    //     const { cardNumber: cardNum } = state;
    //     const { cardNumber: prevCardNum } = prevState;
    //     if (
    //         cardNum.length > prevCardNum.length &&
    //         cardNum[cursorIdx - 1] === ' '
    //     ) {
    //         cursorIdx += 1;
    //     } else if (prevCardNum[cursorIdx - 1] === ' ') {
    //         cursorIdx -= 1;
    //     }
    //     node.selectionStart = node.selectionEnd = cursorIdx;
    // };


    return (
        <div className="card-form">
            <div className="card-list">{children}</div>
            <div className="card-form__inner">
        
                <div className="card-input">
                    <label htmlFor="cardNumber" className="card-input__label">
                        Card Number
                    </label>
                    {/* <input
                        type="tel"
                        name="cardNumber"
                        className="card-input__input"
                        autoComplete="off"
                        onChange={onCardNumberChange}
                        maxLength="19"
                        ref={cardNumberRef}
                        onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
                        onBlur={onCardInputBlur}
                        value={cardNumber}
                    /> */}
                    <CardNumberElement  options={CARD_ELEMENT_OPTIONS}
                     id="cc-number"
                    name="cardNumber1"
                    className="card-input__input"
                    autoComplete="off"
                    onChange={onCardNumberChange}
                    maxLength="19"
                    ref={cardNumberRef}
                    onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
                    onBlur={onCardInputBlur}
                    value={cardNumber}
                    />
                   
                </div>

                <div className="card-input">
                    <label htmlFor="cardName" className="card-input__label">
                        Card Holder
                    </label>
                    <input
                        type="text"
                        className="card-input__input"
                        autoComplete="off"
                        name="cardHolder"
                        onChange={handleFormChange}
                        ref={cardHolderRef}
                        onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
                        onBlur={onCardInputBlur}
                    />
                </div>

                <div className="card-form__row">
                    <div className="card-form__col">
                        <div className="card-form__group">
                            <label
                                htmlFor="cardMonth"
                                className="card-input__label"
                            >
                                Expiration Date
                            </label>
                            <CardExpiryElement name="cardMonth" ref={cardDateRef} onFocus={(e) => onCardInputFocus(e, 'cardDate')} className="card-input__input" onChange={handleFormChange} options={CARD_ELEMENT_OPTIONS}/> 
                            {/* <select
                                className="card-input__input -select"
                                value={cardMonth}
                                name="cardMonth"
                                onChange={handleFormChange}
                                ref={cardDateRef}
                                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                onBlur={onCardInputBlur}
                            >
                                <option value="" disabled>
                                    Month
                                </option>

                                {monthsArr.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="cardYear"
                                className="card-input__input -select"
                                value={cardYear}
                                onChange={handleFormChange}
                                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                onBlur={onCardInputBlur}
                            >
                                <option value="" disabled>
                                    Year
                                </option>

                                {yearsArr.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select> */}
                        </div>
                    </div>
                    <div className="card-form__col -cvv">
                        <div className="card-input">
                            <label
                                htmlFor="cardCvv"
                                className="card-input__label"
                            >
                                CVV
                            </label>
                            <CardCvcElement
                                options={CARD_ELEMENT_OPTIONS}
                                type="tel"
                                className="card-input__input"
                                maxLength="4"
                                autoComplete="off"
                                name="cardCvv"
                                onChange={handleFormChange}
                                onFocus={onCvvFocus}
                                onBlur={onCvvBlur}
                                ref={cardCvv}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-input">
                    <button
                        className="card-form__button"
                        onClick={paymentCardSubmit}
                    >Submit</button>
                </div>
            </div>
        </div>
    );
}
