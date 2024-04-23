from . import stripe_bp
import json
import os
import requests
import stripe

stripe.api_key = 'sk_test_51P8fGPP9qqQjmmJga93eBzYA6Z5dxpRSZVJb7xe34zJ26MQPQ78vnc0eMvvuNS6ZP64XsLBpP2ZU6L8oRfginUQS00BRUIHF4o'
endpoint_secret = 'whsec_946cfcb5d032f74872a69849f096404f5de9504e6e8520dfd113e9e29350414f'

from flask import jsonify, request, redirect



domain = "http://127.0.0.1:5000"


def calculate_order_amount():

    return int(1400.0)



@stripe_bp.route('/stripe/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)

        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='gbp',

            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403
    

@stripe_bp.route('/stripe/stripe-webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.data

    try:
        event = json.loads(payload)
    except json.decoder.JSONDecodeError as e:
        print('⚠️  Webhook error while parsing basic request.' + str(e))
        return jsonify(success=False)
    if endpoint_secret:
        # Only verify the event if there is an endpoint secret defined
        # Otherwise use the basic event deserialized with json
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            print('⚠️  Webhook signature verification failed.' + str(e))
            return jsonify(success=False)

    # Handle the event
    if event and event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']  # contains a stripe.PaymentIntent
        print('Payment for {} succeeded'.format(payment_intent['amount']))
        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
    elif event['type'] == 'payment_method.attached':
        payment_method = event['data']['object']  # contains a stripe.PaymentMethod
        # Then define and call a method to handle the successful attachment of a PaymentMethod.
        # handle_payment_method_attached(payment_method)
    else:
        # Unexpected event type
        print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)





@stripe_bp.route('/stripe/service/<service_name>/<order_id>/create-checkout-session', methods=['POST'])
def create_checkout_session(service_name, order_id):
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price_data': {"currency": "gbp",
                                   "product_data": {
                                       "name": service_name,
                                       
                                   },
                                   "unit_amount": calculate_order_amount()
                                   },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=f"{domain}/api/stripe/order/{order_id}/success",
            cancel_url=f"{domain}/api/stripe/order/{order_id}/cancelled",
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)



            
            

@stripe_bp.route('/stripe/order/<order_id>/success', methods=['GET'])
def order_succ(order_id):
    try:
       reqOrderData = requests.get(f"{domain}/api/orders/{order_id}")
       if reqOrderData.ok:
           orderData = reqOrderData.json()
           del orderData['_id']
           orderData['status'] = 'Processed'

           requests.put(f"{domain}/api/orders/{order_id}/edit", json=orderData)

           return redirect("http://localhost:3000", code=303)
           

    except Exception as e:
        return str(e)



@stripe_bp.route('/stripe', methods=['GET'])
def test():
    return jsonify("hello")