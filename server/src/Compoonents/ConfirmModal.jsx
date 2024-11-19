import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = ({ user }) => {
  const [isChecked, setIsChecked] = useState(false); // To track checkbox state
  const [showModal, setShowModal] = useState(true);  // To control modal visibility
  const navigate = useNavigate(); // For navigation

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOkClick = () => {
    localStorage.setItem('dont', true)
      // You can set a flag in localStorage or state to remember this
    setShowModal(false);
    navigate('/post-review'); // Replace '/another-page' with your route
  };

  const handleCancelClick = () => {
    if (isChecked) {
      localStorage.setItem('dont', true)
      console.log("Don't show me again");
      // You can set a flag in localStorage or state to remember this
    }
    setShowModal(false)
  };

  const dont = localStorage.getItem("dont")

  return (
    <>
      {dont==null && dont || showModal  && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center poppins">Reviews</h2>
            <p className="mb-4 luxuria">Are you want to give review about our jeweallity</p>

            {/* Show the checkbox only if user?.userData?.credits === 10065 */}
            {user <= 10 && (
              <div className="flex items-center mb-4 poppins">
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  className="mr-2"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="dontShowAgain" className="text-sm">Don't show me again</label>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                className="px-4 py-2 ac-bg text-white rounded-full "
                onClick={handleOkClick}
              >
                Give Review
              </Button>
              <Button
                className="px-4 py-2 bg-gray-500 text-white rounded-full"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
