import React, { Component } from 'react';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('https://simpleosbackend.herokuapp.com/users')
        .then(res => res.json())
        .then(data => this.setState({users: data}))
        .catch(err => console.log(err));
    }

    onSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const cert = document.getElementById('certifications').value;
        const qualifications = document.getElementById('qualifications').value;
        const org = document.getElementById('organization').value;
        if(username.trim().length > 3 && password.trim().length > 3 &&  email.trim().length > 3 && qualifications.trim().length > 3 && cert.trim().length > 3 && org.trim().length > 3) {
            let checkAvaibility = true;
            this.state.users.map(user => {
                if(user.username === username) {
                    checkAvaibility = false;
                }
            });
            if(checkAvaibility) {
                this.showAlert("Creating the user!")
                fetch(`https://simpleosbackend.herokuapp.com/users/${username}/${password}/${email}/${cert}/${qualifications}/${org}`, {
                    method: "POST"
                })
                .then(res => this.afterCreated(username))
                .catch(res => this.showAlert("Problems creating the user!"));
            } else {
                this.showAlert("This username is taken, please choose another one!");
            }
        } else {
            this.showAlert("Every field should have ate least 4 characters!");
        }
    }

    showAlert = (s) => {
        document.querySelector('.myAlert').style.display = "block";
        document.querySelector('.myAlertText').innerHTML = s;
        setTimeout(() => {
            document.querySelector('.myAlert').style.display = "none"; 
        }, 5000)
    }

    afterCreated = (username) => {
        localStorage.setItem("username", username);
        window.location.href = '/';
    }

    render() {
        return(
            <div className="categories_list"> 
                <div className="container" style={{marginTop: "150px"}}>
                    <form onSubmit={this.onSubmit}>
                        <center style={{marginBottom: 15}}><h1>Sign Up</h1></center>
                        <h3>Username: </h3>
                        <input id="username" type="text" className="form-control" style={{marginBottom: 15}} />
                        <h3>Email: </h3>
                        <input id="email" type="email" className="form-control" style={{marginBottom: 15}} />
                        <h3>Password: </h3>
                        <input id="password" type="password" className="form-control" style={{marginBottom: 15}} />
                        <h3>Certifications</h3>
                        <textarea id="certifications" className="form-control" style={{marginBottom: 15}}></textarea>
                        <h3>Qualifications</h3>
                        <textarea id="qualifications" className="form-control" style={{marginBottom: 15}}></textarea>
                        <h3>Organization</h3>
                        <input id="organization" type="text" className="form-control" style={{marginBottom: 15}} />
                        <div className="myAlert">
                            <h3 className="myAlertText">Every field should have at least 4 characters!</h3>
                        </div>
                        <input type="submit" className="btn btn-info" style={{width: "100%", marginBottom: "30px"}} />
                    </form>
                </div>
            </div>
        );
    }
}