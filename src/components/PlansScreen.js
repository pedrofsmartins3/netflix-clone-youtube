import React from 'react'
import './PlansScreen.css'
import { db } from '../firebase'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice'
import { loadStripe } from '@stripe/stripe-js';


function PlansScreen() {

    const [products, setProducts] = React.useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = React.useState(null)



    React.useEffect(() => {
        db
        .collection("customers")
        .doc(user.uid)
        .collection("subscriptions").get().then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                console.log(subscription)
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])

    React.useEffect(() => {
        db.collection("products")
            .where("active","==",true)
            .get()
            .then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(async (doc) => {
                    products[doc.id] = doc.data();
                    const priceSnap = await doc.ref.collection("prices").get();
                    priceSnap.docs.forEach((price) => {
                        products[doc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        };
                    });
            });
            setProducts(products)
        });
    }, []);

    const loadCheckout = async (priceId) => {
        console.log('will call doc ref')
        console.log(' userid', user.uid)
        const docRef = await db.collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

            console.log(await docRef.get())

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                //Show an error to your costumer and
                //import your Cloud function logs in the Firebase console.
                alert(`An error occured: ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51NtZpkIMC4ifdCoCajdbGqkuG6FU45Gko6c7nWEsM1lFOXpnEFmExnAJgEUR52D63Zhz4yRwD5lVFfC8WPva7Ezf00R5770ORA")
                stripe.redirectToCheckout({ sessionId });
            }
        })
    };

  return (
    <div className='plansScreen'>
        <br />  
        {subscription && <p>Renewal date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>
}
        {/*com o object.entries eu ja posso dar map() no products que é um object */}
        {Object.entries(products).map(([productId, productData]) => {
            // todo logica para saber se a subscrição do user esta ativa

            const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role.toLowerCase());

            return (
                <div className={`${isCurrentPackage && 'plansScreen_plan--disabled'} plansScreen_plan`} key={productId}>
                    <div className='plansScreen_info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>
                    <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? "Current Subscription" : "Subscribe"}</button>
                </div>
            );

        })}
    </div>
  )
}

export default PlansScreen