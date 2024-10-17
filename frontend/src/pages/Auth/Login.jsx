import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

const Login = () => {
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

    return <div>
        <section className='pl-[10rem] flex felx-wrap'>
            <div className='mr-[4rem] mt-[5rem]'>
                <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor='email' className='black text-sm font-medium text'>Email Address</label>
                    <input 
                    type="email" 
                    id='email' 
                    className='mt-1 p-2 border rounded w-full'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor='password' className='black text-sm font-medium text'>Password</label>
                    <input 
                    type="password" 
                    id='password' 
                    className='mt-1 p-2 border rounded w-full'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    </div>

                    <button 
                    disabled={isLoading} 
                    type="submit" 
                    className='bg-gray-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                    >{isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    {isLoading && <Loader />}
                            </form>

        <div className='mt-4'>
            <p className='text-black font-semibold mb-4'>
                New Customer ? {" "}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-blue-800 hover:underline'>Register</Link>
            </p>
        </div>
            </div>
            <img
          src="/images/store1.png"
          alt=""
          className="h-[55rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg"
        />
        </section>
    </div>
};

export default Login