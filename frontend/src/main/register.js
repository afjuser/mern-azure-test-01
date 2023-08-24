import React, { useState } from "react";
import { useNavigate } from "react-router";
import baseUrl from "../baseURL";
import "../styles/login.css";

export default function Register() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password:"",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This method will navigate to login page.
    function goToLoginPage() {
        navigate("/portal/login");
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch(baseUrl +"/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        }).catch(error => {
            window.alert(error);
            return;
        });

        setForm({ name: "", position: "", level: "" });
        navigate("/portal/login");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <>
            <div className="row margin-top-3-percent">
                <div className="col-md-4">&nbsp;</div>
                <div className="col-md-4 login-style">
                    <h3 className="text-align-center text-white">Register to SPortal</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group text-white margin-top-20">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                value={form.firstname}
                                onChange={(e) => updateForm({ firstname: e.target.value })} />
                        </div>
                        <div className="form-group text-white margin-top-20">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                value={form.lastname}
                                onChange={(e) => updateForm({ lastname: e.target.value })} />
                        </div>
                        <div className="form-group text-white margin-top-20">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={form.username}
                                onChange={(e) => updateForm({ username: e.target.value })} />
                        </div>
                        <div className="form-group text-white margin-top-20">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                value={form.password}
                                onChange={(e) => updateForm({ password: e.target.value })} />
                        </div>
                        <div className="form-group text-white margin-top-20">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="confirmPassword"
                                value={form.confirmPassword}
                                onChange={(e) => updateForm({ confirmPassword: e.target.value })} />
                        </div>
                        <div className="form-group text-align-center margin-top-20">
                            <input
                                type="submit"
                                value="Submit Registration"
                                className="btn btn-primary login-btn" />
                        </div>
                    </form>
                    <div className="form-group text-align-center">
                        <input
                            type="button"
                            value="Already have an account? Click here to Login"
                            className="btn btn-link login-btn"
                            onClick={() => goToLoginPage()}/>
                    </div>
                </div>
            </div>
        </>
    );
}