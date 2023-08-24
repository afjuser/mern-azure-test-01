import React, { useState } from "react";
import { useNavigate } from "react-router";
import baseUrl from "../baseURL";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
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
        navigate("/portal/record");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <Navbar />
            <div className="form-style">
                <div className="row margin-top-20">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6 create-form-style">
                        <h3 className="text-white">Create New Record</h3>
                        <form onSubmit={onSubmit}>
                            <div className="form-group margin-top-20">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={form.name}
                                    onChange={(e) => updateForm({ name: e.target.value })}
                                />
                            </div>
                            <div className="form-group margin-top-20">
                                <label htmlFor="position">Position</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="position"
                                    value={form.position}
                                    onChange={(e) => updateForm({ position: e.target.value })}
                                />
                            </div>
                            <div className="form-group margin-top-20">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="positionOptions"
                                        id="positionIntern"
                                        value="Intern"
                                        checked={form.level === "Intern"}
                                        onChange={(e) => updateForm({ level: e.target.value })}
                                    />
                                    <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="positionOptions"
                                        id="positionJunior"
                                        value="Junior"
                                        checked={form.level === "Junior"}
                                        onChange={(e) => updateForm({ level: e.target.value })}
                                    />
                                    <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="positionOptions"
                                        id="positionSenior"
                                        value="Senior"
                                        checked={form.level === "Senior"}
                                        onChange={(e) => updateForm({ level: e.target.value })}
                                    />
                                    <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                                </div>
                            </div>
                            <div className="form-group margin-top-20">
                                <input
                                    type="submit"
                                    value="Create Record"
                                    className="btn btn-primary margin-right-15"
                                />
                                <Link to="/portal/record">
                                    <input
                                        type="button"
                                        value="Back"
                                        className="btn btn-light"
                                    />
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
    );
}