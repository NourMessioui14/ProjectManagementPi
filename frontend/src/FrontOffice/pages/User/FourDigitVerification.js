import { React, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link ,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FourDigitVerification(props) {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [num3, setNum3] = useState("");
    const [num4, setNum4] = useState("");
    const navigate = useNavigate();

    const onNum1Change = (e) => {
        setNum1(e.target.value)
    }
    const onNum2Change = (e) => {
        setNum2(e.target.value)
    }
    const onNum3Change = (e) => {
        setNum3(e.target.value)
    }
    const onNum4Change = (e) => {
        setNum4(e.target.value)
    }

    const enteredNumber=num1+num2+num3+num4;
    const onSubmit = (e) => {

        e.preventDefault();
        if (!num1 || !num2 ||!num3 || !num4) {
            toast.error('Please Enter a complete 4-Digit Verification Number');
        } else {
            axios
                .get('http://localhost:5000/login/allUsers')
                .then((response) => {
                    const userArray = response.data;
                    const userExists = userArray.find((user) => user.Verification === enteredNumber);
                    if (userExists) {
                        toast.success('Verification Successful Now Create a new Password');
                        navigate(`/NewPassword/1`);
                    } else {
                        toast.error('Invalid 4-Digit Verification Number');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            
    }

    return (
        <>
            <section className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2'>
                <article className='writing-section   flex justify-center items-center p-8 text-center'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quia fugiat cumque molestias nobis exercitationem consequatur harum suscipit laudantium explicabo laborum ad, omnis beatae, sequi, veritatis magni aliquam! Error hic laboriosam deleniti inventore minima consequatur, illum corrupti odio maxime nihil asperiores accusamus debitis, repellendus architecto eligendi perferendis quaerat distinctio sunt consequuntur aspernatur. Hic magnam esse impedit, ut placeat unde, commodi quis recusandae ullam possimus sit adipisci. Tempore in dolorem cumque!</p>
                </article>
                <article className='form-section bg-gray-100  flex justify-center items-center p-4'>
                    <form action="/" className='bg-white p-6  w-96 rounded-lg' onSubmit={onSubmit}>
                        <div className='my-4'>
                            <h1 className='text-blue-500 text-2xl text-center'>Forget Password</h1>
                        </div>
                        <div className="mb-4 mt-6">
                            <label htmlFor="email" className="block font-medium mb-1 my-2">
                                4-Digit Verification Number
                            </label>
                            <div className='flex gap-1 text-2xl'>
                                <input
                                    type="text"
                                    id="text"
                                    name="text"
                                    className="w-full px-3 py-2 border rounded text-center"
                                    placeholder="X"
                                    value={num1}
                                    onChange={onNum1Change}
                                />
                                <input
                                    type="text"
                                    id="text"
                                    name="text"
                                    className="w-full px-3 py-2 border rounded text-center"
                                    placeholder="X"
                                    value={num2}
                                    onChange={onNum2Change}
                                />
                                <input
                                    type="text"
                                    id="text"
                                    name="text"
                                    className="w-full px-3 py-2 border rounded text-center "
                                    placeholder="X"
                                    value={num3}
                                    onChange={onNum3Change}
                                />
                                <input
                                    type="text"
                                    id="text"
                                    name="text"
                                    className="w-full px-3 py-2 border rounded text-center"
                                    placeholder="X"
                                    value={num4}
                                    onChange={onNum4Change}
                                />
                            </div>
                        </div>
                        <button className='w-full bg-blue-500 p-2 text-white'>Submit</button>
                        <p className='text-center mt-8  italic'>Don't have any Account?</p>
                        <p className='text-center font-semibold mb-6 text-blue-500 italic'><Link to={'/Signup'}>SignUp</Link></p><br />
                        <p className=' font-semibold mt-8 text-blue-500 italic'><Link to={'/ForgetPassword'}>Previous</Link></p>
                    </form>
                </article>
            </section>
        </>
    )
}

export default FourDigitVerification
