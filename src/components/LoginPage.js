import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../redux/reducers/authReducer.js';


const Login = ({ name, password, onChange, login, error, GOOGLE_OAUTH, GITHUB_OAUTH } )=> {
  return (
    <form className='well'>
      {
        error ? (
          <div className='alert alert-warning'>Bad username/password</div>
        ): (null)
      }
      <div className='form-group'>
        <input value={ name } className='form-control' name='name' onChange={ onChange }/>
      </div>
      <div className='form-group'>
        <input value={ password } className='form-control' name='password' onChange={ onChange }/>
      </div>
      <button className='btn btn-primary' onClick={ login } disabled={ !name || !password}>Login</button>
      { GOOGLE_OAUTH ? (
        <a id='login' className='btn btn-primary' href='/login/google'>Log into our site from Google</a>
        ): (null)
      }
      { GITHUB_OAUTH ? (
        <a id='login' className='btn btn-primary' href='/login/github'>Log into our site from Github</a>
        ): (null)
      }
    </form>
  );
};

class LoginPage extends Component{
  constructor(){
    super();
    this.state = { name: '', password: '' };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev){
    let change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render(){
    const { name, password, error } = this.state;
    const { USE_OAUTH } = this.props;
    const login = (ev)=> {
      ev.preventDefault();
      this.props.login({ name, password })
        .catch((ex)=> { this.setState( { error: 'bad username and password' })});
    }
    return (
      <Login error={error} login={ login } GITHUB_OAUTH={GITHUB_OAUTH} GOOGLE_OAUTH={GOOGLE_OAUTH} name={ name } password={ password } onChange={ this.onChange } login={ login }></Login>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    login: (credentials)=> {
      return dispatch(login(credentials))
        .then(()=> hashHistory.push('/'))
    }
  };
};

const mapStateToProps = ()=> {
  return {
    GOOGLE_OAUTH: window.GOOGLE_OAUTH,
    GITHUB_OAUTH: window.GITHUB_OAUTH
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
