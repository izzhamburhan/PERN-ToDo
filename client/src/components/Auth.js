import { useState } from "react"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [emaill, setEmaill] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogin && password != confirmPassword) {
      setError('Make sure password is correct')
      return
    }

    await fetch(`https://localhost:8000/${endpoint}`)
  }

    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogin ? 'Please Log in' : 'Please Sign Up'}</h2>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            {!isLogin && <input type="password" placeholder="confirm password"/>}
            <input type="submit" className="create" onClick={handleSubmit(e.isLogin ? 'login' : 'signup')} />
            {error && <p>{error}</p> }
          </form>
          <div className="auth-options">
            <button 
            onClick={()=> viewLogin(false)}
            style={{backgroundColor : !isLogin ? 'rgba(255,255,255)' : 'rgba(188,188,188)'}}
            >Sign Up</button>
            <button 
            onClick={()=> viewLogin(true)}
            style={{backgroundColor : !isLogin ? 'rgba(255,255,255)' : 'rgba(188,188,188)'}}
            >Log In</button>
          </div>
          </div> 
      </div>
    )
  }
  
  export default Auth;
  