import { Button } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { GiTwoCoins } from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import api from './Api';
import { useAuth } from '../../store/auth';

const App = () => {

  const {amt} = useParams()
  const {user} = useAuth()

  console.log(amt)

  const userEmail = user?.userData?.email
  const [data,setData] = useState()

  useEffect(()=>{
    api.get("/resUser").then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])


  const [emailInput, setEmailInput] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [filteredUser, setFilteredUser] = useState(null);
  const [remainingCredits, setRemainingCredits] = useState(amt<500?amt:0);
  const [submittedData, setSubmittedData] = useState([]);
  const [test,setTest] = useState(true)

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailInput(value);

    if (value === userEmail) {
      alert("you are a user 🙁");
      return;
    }

    const user = data.find((item) => item.email === value);
    if (user) {
      setFilteredUser(user);
    } else {
      setFilteredUser(null);
    }
  };

  const handleNumberChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= remainingCredits) {
      setNumberInput(value);
    }
  };

  const handleSubmit = () => {
    if (submittedData.length >= 3) {
      alert("You can only submit data for 3 users.");
      return;
    }

    if (filteredUser && numberInput) {
      const updatedRemainingCredits = remainingCredits - numberInput;
      setRemainingCredits(updatedRemainingCredits);

      setSubmittedData((prev) => {
        const existingUser = prev.find((entry) => entry.email === filteredUser.email);

        if (existingUser) {
          return prev.map((entry) =>
            entry.email === filteredUser.email
              ? { ...entry, credits: entry.credits + numberInput }
              : entry
          );
        } else {
          return [...prev, { email: filteredUser.email, credits: numberInput, type: "member" }];
        }
      });

      // Reset inputs
      setFilteredUser(null);
      setEmailInput('');
      setNumberInput(0);
    }
  };

  // Delete function to remove a user from submittedData
  const handleDelete = (email) => {
    const userToDelete = submittedData.find((entry) => entry.email === email);
    if (userToDelete) {
      setRemainingCredits((prev) => prev + userToDelete.credits);
      setSubmittedData((prev) => prev.filter((entry) => entry.email !== email));
    }
  };

  const sendToken = async () => {
    const newData = {
      email: userEmail,
      type: "leaders",
      credits: remainingCredits
    };

    // Add the newData to the submittedData array
    await setSubmittedData((prevData) => [...prevData, newData]);
    setRemainingCredits(0);
    setTest(!true)

    // api.post("/sendMember", {member: submittedData, email: })
  };


  // Monitor submittedData changes and log it
  useEffect(() => {
    console.log('Updated submittedData:', submittedData);

    // Iterate over submittedData and send API request if needed
    submittedData.forEach((el) => {
      console.log(el);
      if(user?.userData?.member == null){
        api.post("/sendPartCredits",{email: el?.email, partcredits: el?.credits}).then((res)=>{
          console.log(res.data)
         }).catch((err)=>{
          console.log(err)
         })

        api.post("/sendMember", {member: submittedData, email: el?.email}).then((res)=>{
         console.log(res.data)
        }).catch((err)=>{
         console.log(err)
        })
      }else{
        alert("alter send token to there partner or i had already member 🙁")
        setTest(false)
      }
    });
  }, [test]);

  return (
    <div className="container pt-[140px] flex flex-col justify-center items-center poppins">
      <p className='flex justify-center items-center'><GiTwoCoins /> {remainingCredits}</p>
      
      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter email"
        className='py-2 px-3 bg-light rounded-full poppins'
        value={emailInput}
        onChange={handleEmailChange}
      />
      
      {/* Display User Info */}
      {filteredUser ? (
        <div className="user-info py-5">
          <p className='py-3'><span className='text-gray-400'>Name: </span> {filteredUser.firstName}</p>
          <p className='py-3'><span className='text-gray-400'>Email: </span> {filteredUser.email}</p>
         
        </div>
      ) : <p>No user found</p>}

      {/* Number Input */}
      {filteredUser && (
        <input
          type="number"
          placeholder="Enter number (out of 1200)"
          value={numberInput}
          onChange={handleNumberChange}
          className='py-2 px-3 bg-light rounded-full poppins'
          max={remainingCredits}
        />
      )}

      {/* Submit Button */}
      {filteredUser && (
        <Button className='ac-bg my-4' onClick={handleSubmit}>Submit</Button>
      )}

      {/* Submitted Data */}
      <div className="submitted-data">
        <ul>
          {submittedData?.map((entry, index) => (
            <li key={index} className='my-4'>
              {entry.email}: {entry.credits} credits : {entry.type}
              <button className='mx-4 py-2 px-3 text-white ac-bg rounded-full' onClick={() => handleDelete(entry.email)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Send Button */}
      <Button className='ac-bg my-5' onClick={sendToken}>Send</Button>
    </div>
  );
};

export default App;
