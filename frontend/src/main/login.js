import React, { useState } from "react";
import { useNavigate } from "react-router";
import baseUrl from "../baseURL";
import "../styles/login.css";

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setLoginForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This method will navigate to register page.
    function goToRegisterPage() {
        navigate("/portal/register");
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the login url, we'll verify user to the database.
        const newLogin = { ...loginForm };

        await fetch (baseUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLogin),
        }).catch (err => {
            window.alert(err);
            return;
        });

        setLoginForm({ username: "", password: "" });
        navigate("/portal/record");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <>
            <div className="row margin-top-10-percent">
                <div className="col-md-4">&nbsp;</div>
                <div className="col-md-4 login-style">
                    <h3 className="text-align-center text-white">SPortal</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group text-white margin-top-20">
                            <label htmlFor="name">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={loginForm.name}
                                onChange={(e) => updateForm({ username: e.target.value })} />
                        </div>
                        <div className="form-group text-white margin-top-20">
                            <label htmlFor="position">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="position"
                                value={loginForm.position}
                                onChange={(e) => updateForm({ password: e.target.value })} />
                        </div>
                        <div className="form-group text-align-center margin-top-20">
                            <input
                                type="submit"
                                value="Login"
                                className="btn btn-primary login-btn" />
                        </div>
                    </form>
                    <div className="form-group text-align-center">
                        <input
                            type="button"
                            value="Not yet registered? Click here to register"
                            className="btn btn-link login-btn"
                            onClick={() => goToRegisterPage()}/>
                    </div>
                </div>
            </div>
        </>
    );
}