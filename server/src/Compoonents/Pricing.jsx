import React from "react";
import { Card } from "flowbite-react";
import {useRazorpay}  from "react-razorpay";
import api from "./Api"
import { useAuth } from '../../store/auth';
import { useNavigate } from "react-router-dom";

function Pricing({amt, uses, type, credits}) {
  const Razorpay = useRazorpay();
  const navigate = useNavigate()
  const {user} = useAuth()

  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const data = {
    amount: amt,
    currency: "INR",
    receipt: "saifkhan",
    note: {
      "description": "best for jweller designer",
      "access": "for 1 month"
    }
  }

  
  const handlePayment = async () => {
    if(user?.userData?.verified==false){
      navigate("/register-info")
    }else{
      try {
        // Make the API call to backend
        const order = await api.post("/payment", {
          amount: amt,
          currency: "INR",
          receipt: "saifkhan",
          note: {
            "description": "best for jweller designer",
            "access": "for 1 month"
          }
        }
      );
        console.log("order", order)
      // add option for the payment gateway it can be dynamic if you want 
      // we can use prop drilling to make it dynamic
      console.log(order.data.amount)
      console.log(order.data.currency)
      console.log(order.data.id)
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: order.data.amount,
          currency: order.data.currency,
          name: "Jeweallity", // Add company details
          description: "Payment for your order", // Add order details
          order_id: order.data.id,
          handler: async (response) => {
            console.log("1",response)
            try {
              await fetch(`${import.meta.env.VITE_BACKEND_URL}/verify-payment`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
              // Add onPaymentSuccessfull function here
              alert("Payment successful!");

              if(uses == "Business version"){
                await api.post("/subscription", {subscription: uses , email: user?.userData?.email, type}).then((res)=>{
                  console.log(res.data)
                  navigate("/partner/1200")
                 }).catch((err)=>{
                  console.log("error in stroing subscription", err)
                 })
              }else{
                await api.post("/subscription", {subscription: uses ,credits, email: user?.userData?.email, type}).then((res)=>{
                 console.log(res.data)
                }).catch((err)=>{
                 console.log("error in stroing subscription", err)
                })
              }
  
  
            } catch (err) {
              // Add onPaymentUnSuccessfull function here
              alert("Payment failed: " + err.message);
            }
          },
          prefill: {
            name: user?.userData?.name, // add customer details
            email: user?.userData?.email, // add customer details
            contact: user?.userData?.phone, // add customer details
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
      // you can change the gateway color from here according to your
      // application theme
            color: "#284e1f",
          },
        };
  
  
        console.log(options)
        const rzpay = new window.Razorpay(options);
        // this will open razorpay window for take the payment in the frontend
        // under the hood it use inbuild javascript windows api 
        rzpay.open(options);
  
        console.log(rzpay)
  
      } catch (err) {
        console.log("Error creating order: ", err)
        alert("Error creating order: " + err.message);
      }
    }
  };

  return (
    <Card className=' m-auto max-w-sm shadow-2xl ml-10 my-10'>
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
       {uses}
        <br />
        {type=="y"? "Yearly" : "Monthly"} creation
        </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">Rs</span>
        <span className="text-5xl font-extrabold tracking-tight">{amt}</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/{type=="y"? "year" : "month"}</span>
      </div>
      <ul className="my-7 space-y-5">
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 ac-color dark:ac-color"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{credits} times credits for free</span>
        </li>
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 ac-color dark:bg-color"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            4 Images per creation
          </span>
        </li>
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 ac-color dark:ac-color"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Resolution: 1024 * 1024</span>
        </li>
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 ac-color dark:ac-color"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Get 800 stunning design images</span>
        </li>    
      </ul>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-lg ac-bg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#284e1f] focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
        onClick={handlePayment}
      >
        Choose plan
      </button>
    </Card>
  );
}

export default Pricing;
