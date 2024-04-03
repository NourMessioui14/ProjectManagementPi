import { React, useState, props } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function NewPassword() {
    const [newPass, setNewPass] = useState("");
    const [cNewPass, setCNewPass] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    console.log(id)

    const onNewPassChange = (e) => {
        setNewPass(e.target.value)
    }
    const onCNewPassChange = (e) => {
        setCNewPass(e.target.value)
    }


    const onSubmit = (e) => {
        e.preventDefault()

        if (newPass === cNewPass) {
            const updatedData = {
                password: newPass,
            };
            axios
                .patch('http://localhost:5000/auth/' + id, updatedData)
                .then((response) => {
                    const userArray = response.data;
                    toast.success("Password Changed Successfully!")
                    navigate('/Login')
                })
                .catch((err) => {
                    toast.error("Some Error Occurred Try Again Later")
                    console.log(err);
                });
        }
        else{
            toast.error('Password Does not Match')
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
                            <h1 className='text-blue-500 text-2xl text-center'>New Password</h1>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block font-medium mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Create new Password"
                                value={newPass}
                                onChange={onNewPassChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="block font-medium mb-1">
                                Confrim New Password
                            </label>
                            <input
                                type="password"
                                id="cpassword"
                                name="cpassword"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Confirm New password"
                                value={cNewPass}
                                onChange={onCNewPassChange}
                            />
                        </div>
                        <button className='w-full bg-blue-500 p-2 text-white'>Submit</button>
                        <p className='text-center mt-8  italic'>Don't have any Account?</p>
                        <p className='text-center font-semibold mb-6 text-blue-500 italic'><Link to={'/Signup'}>SignUp</Link></p><br />
                        <p className=' font-semibold mt-8 text-blue-500 italic'><Link to={'/Digitverify'}>Previous</Link></p>
                    </form>
                </article>
            </section>
        </>
    )
}


export default NewPassword
