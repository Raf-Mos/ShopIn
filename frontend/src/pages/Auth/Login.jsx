import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <section className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
                <div className="w-full lg:w-1/2 max-w-md">
                    <h1 className="text-2xl font-semibold mb-6">Sign In</h1>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="mt-1 p-2 w-full border rounded-md focus:border-gray-500 focus:ring focus:ring-gray-200"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="mt-1 p-2 w-full border rounded-md focus:border-gray-500 focus:ring focus:ring-gray-200"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button 
                            disabled={isLoading} 
                            type="submit" 
                            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-6">
                        <p className="text-sm text-gray-600">
                            New Customer?{" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2">
                    <img
                        src="/images/store1.png"
                        alt="Store"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </section>
        </div>
    )
}