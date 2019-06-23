import React, { PureComponent } from 'react'
import './Login.css'

export default class Login extends PureComponent {
    render() {
        let {onChange, onSubmit, name, password, msg } = this.props
        return (
            <form className="login-container" onSubmit={onSubmit}>
                <div className="login-input">
                    <label>
                        Username:
                        <input type="text" name="name" onChange={onChange} value={name}></input>
                    </label>
                </div>
                <div className="login-input">
                    <label>
                        Password:
                        <input type="password" name="password" onChange={onChange} value={password}></input>
                    </label>
                </div>
                {
                    msg
                    &&
                    <span style={{color:'red'}}>{msg}</span>
                }
                <input type="submit" onClick={onSubmit} value="Login"></input>
            </form>
        )
    }
}
