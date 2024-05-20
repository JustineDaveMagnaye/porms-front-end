import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/ListCommunityServiceReport.css';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo_new.png';
const CsListPageAdmin = () => {
    const [csSlips, setCsSlips] = useState([]); // hook pang store lahat ng data sa community service slips
    const [filteredCsSlips, setFilteredCsSlips] = useState([]); // hook pang store sa filtered slips
    const [searchInput, setSearchInput] = useState(''); // hook pang store sa search input
    const navigate = useNavigate();
    useEffect(() => {
        loadCsSlips();
        let exp = localStorage.getItem('exp')
        let currentDate = new Date();
        if(exp * 1000 < currentDate.getTime()){
            navigate('/login')
        }
        const role = localStorage.getItem('role')
        if(role != "ROLE_ROLE_ADMIN"){
            if(role === "ROLE_ROLE_EMPLOYEE"){
                navigate('/employee/cs-list');
            } else if (role === "ROLE_ROLE_STUDENT"){
                navigate('/student/violation')
            } else if (role === "ROLE_ROLE_GUEST"){
                navigate('/guest/violation')
            } else {
                navigate('/login')
            }
        }
    }, []);

    useEffect(() => {
        // Hook filter
        filterCsSlips();
    }, [searchInput, csSlips]);

    const loadCsSlips = async () => {
        try {
            const response = await axios.get("http://localhost:8080/CSSlip/commServSlips", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setCsSlips(response.data);
        } catch (error) {
            console.error('Error fetching community service slips:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filterCsSlips = () => {
        const filtered = csSlips.filter(csSlip => {
            const studentName = `${csSlip.student.firstName} ${csSlip.student.lastName}`.toLowerCase();
            return studentName.includes(searchInput.toLowerCase());
        });
        setFilteredCsSlips(filtered);
    };

    const csSlipsToDisplay = searchInput ? filteredCsSlips : csSlips;
    const handleLogout = () => {
        localStorage.setItem('token', '');
        localStorage.setItem('role', '');
        localStorage.setItem('exp', '');
        navigate('/login')
    };
    return (
        <div className="list-cs-page-admin">
           <nav className="nav-bar">
                <img src={logo} alt="Logo" className="rc-logo"/>
                <div className="nav-links">
                    <a href="/admin/offense">STUDENTS OFFENSE</a>
                    <a href="/admin/violation">STUDENTS VIOLATION</a>
                    <a href="/admin/cs-list">STUDENTS LIST</a>
                    <a href="/admin/cs-report">STUDENTS REPORT</a>
                    <a href="#" onMouseDown={handleLogout}>LOGOUT</a>
                </div>
            </nav>
            <div className="container">
                <h1>List of Community Service Reports</h1>
                <div className="content-container">
                    <div className="list-cs-report-search-filter">
                        <input
                            type="text"
                            placeholder="Search by student name"
                            className="list-cs-report-search-input"
                            value={searchInput}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <table className="offense-table">
                        <thead>
                            <tr>
                                <th>STUDENT ID</th>
                                <th>STUDENT NAME</th>
                                <th>AREA OF COMMUNITY SERVICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csSlipsToDisplay.map(csSlip => (
                                <tr key={csSlip.id}>
                                    <td>{csSlip.student.studentNumber}</td>
                                    <td>{`${csSlip.student.firstName} ${csSlip.student.lastName}`}</td>
                                    <td>{csSlip.areaOfCommServ.stationName}</td>
                                </tr>
                            ))}
                            {csSlipsToDisplay.length === 0 && (
                                <tr>
                                    <td colSpan="3">No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CsListPageAdmin;