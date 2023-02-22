import React from 'react'
import {Elments} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'
const Public_Key = "pk_test_51Kbog5SDs9tcgyN4NFha1BgK91xkEcoD6RIDmAr8Idr64A2ObXPvz9i4bkvoQjQxk8TAwfKsDK3VN3yYHH5YUB5z00M3vbalRv"
const StripeTestPromise = loadStripe(Public_Key)
function StripeContainer() {
  return (
 <Elments stripe={StripeTestPromise}>
<PaymentForm></PaymentForm>
 </Elments>
  )
}

export default StripeContainer