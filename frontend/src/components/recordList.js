import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../baseURL";
import "../styles/record-style.css";
import Navbar from "./navbar";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/portal/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
            >
          Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${baseUrl}/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`${baseUrl}/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <Navbar />
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-white margin-left-10-percent margin-top-20">Record List</h3>
                </div>
                <div className="col-md-6">
                    <Link to="/portal/create" className="margin-top-20">
                        <input type="button"
                            value="Create New Record"
                            className="btn btn-light create-style" />
                    </Link>
                </div>
            </div>
            <div className="tableFixHead">
                <table id="record-table" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Level</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{recordList()}</tbody>
                </table>
            </div>
        </div>
    );
}