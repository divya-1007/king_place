import React, { useState, useRef, useCallback } from 'react';
import CForm from './components/form';
import Card from './components/card';
import './index.scss';
import {loadStripe} from '@stripe/stripe-js';
import {Elements,} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51NCyjQSG5RXlMLxyjCBneKkHDHGWUnYdX92Lstl7uQcHAX64CodXp3Kn8YlRowTGPKhaVZugmLJi7ppvE7W4eQic00mXYZw07R');

const initialState = {
    cardNumber: '#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false
};

const MainScreen = ({productId ,setActiveStep}) => {
    const [state, setState] = useState(initialState);
    const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

    const updateStateValues = useCallback(
        (keyName, value) => {
            setState({
                ...state,
                [keyName]: value || initialState[keyName]
            });
        },
        [state]
    );
    // References for the Form Inputs used to focus corresponding inputs.
    let formFieldsRefObj = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef(),
        cardCvv: useRef()
    };

    let focusFormFieldByKey = useCallback((key) => {
        formFieldsRefObj[key].current.focus();
    });

    // This are the references for the Card DIV elements.
    let cardElementsRef = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef()
    };

    let onCardFormInputFocus = (_event, inputName) => {
        const refByName = cardElementsRef[inputName];
        setCurrentFocusedElm(refByName);
    };

    let onCardInputBlur = useCallback(() => {
        setCurrentFocusedElm(null);
    }, []);

    return (
        <Elements stripe={stripePromise}>
        <div className="wrapper">
            <CForm
                cardMonth={state.cardMonth}
                cardYear={state.cardYear}
                onUpdateState={updateStateValues}
                cardNumberRef={formFieldsRefObj.cardNumber}
                cardHolderRef={formFieldsRefObj.cardHolder}
                cardDateRef={formFieldsRefObj.cardDate}
                onCardInputFocus={onCardFormInputFocus}
                onCardInputBlur={onCardInputBlur}
                productId={productId}
                setActiveStep={setActiveStep}
                 >
                <Card
                    cardNumber={state.cardNumber}
                    cardHolder={state.cardHolder}
                    cardMonth={state.cardMonth}
                    cardYear={state.cardYear}
                    cardCvv={state.cardCvv}
                    isCardFlipped={state.isCardFlipped}
                    currentFocusedElm={currentFocusedElm}
                    onCardElementClick={focusFormFieldByKey}
                    cardNumberRef={cardElementsRef.cardNumber}
                    cardHolderRef={cardElementsRef.cardHolder}
                    cardDateRef={cardElementsRef.cardDate}
                ></Card>
            </CForm>
        </div>
        </Elements>

    );
};

export default MainScreen;
