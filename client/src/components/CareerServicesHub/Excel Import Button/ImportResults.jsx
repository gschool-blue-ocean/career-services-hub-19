import React, { useContext } from 'react';
import './ImportResults.css';
import { StudentsContext } from '../../../context/studentsContext';
import { ManagersContext } from '../../../context/managersContext';

export default function ImportResults({setAddStudent, newStudents, importManager, importMCSP, handleAddStudentModalToggle, handleUpdateNewStudent}) {

    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://career-services-server.onrender.com';
    
    const studentContext = useContext(StudentsContext);
    const students = studentContext.studentsData;

    const managersContext = useContext(ManagersContext);
    const managers = managersContext.managersData;

    let headerArray = Object.keys(newStudents[0]); // Extract only the keys from the object, we will use it to contain the headers of the table
    let milestoneArray = [];

    if (students) {
        students[0].milestones.forEach((milestone) =>{
            milestoneArray.push(milestone.mile_name);
        })
    }

    function handleUploadClick(){
        setAddStudent(false);

        newStudents.map((student) => {
            student.career_status = 'Not Started'     //Adding Career Status to Student
            student.course_status = 'Student'         // Adding Course Status to Student
            student.tscm_id = importManager;          // Adding MCSP/Cohort to Student
            student.cohort = `MCSP-${importMCSP}`     // Adding Identified Career Manager to Student
            student.college_degeree = `Unknown`       // Adding Identified Career Manager to Student

            const managerFirst = managers[student.tscm_id - 1].tscm_first;
            const managerLast = managers[student.tscm_id - 1].tscm_last;
            student.tscm_first = managerFirst;
            student.tscm_last = managerLast;

            fetch(`${url}/students`, 
                {
                    method:"POST", 
                    body: JSON.stringify(student),
                    headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }
                }
                )
                .then(response => response.json())   
                .then(data => {
                    student.milestones = [];
                    //Adding Milestones to Student
                    milestoneArray.forEach((milestone_name) => {

                        let newMilestone = {
                            mile_name: milestone_name,
                            progress_stat: 'In-Progress'
                        }
                    student.milestones.push(newMilestone);
                        fetch(`${url}/students/${data.student_id}/milestones`, 
                        {
                            method:"POST", 
                            body: JSON.stringify(newMilestone),
                            headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            }
                        }
                        )
                        .then(response => response.json())   
                        .then(data => {
                            // Update Context with response
                        })
                        .catch(function(error) {
                        console.log(error);
                        }); 
                    })
                handleUpdateNewStudent(student)
                handleAddStudentModalToggle();
                })
                .catch(function(error) {
                console.log(error);
                });
        })
    }

    return (
    <>
        <div className='import-results-table'>
            <div className='results-student-row header-row'>
                    {headerArray.map((header) => {
                        return(
                            <span className='results-student-cell header' key={header}>{header}</span>
                        )    
                    })}
                    <span className='results-student-cell header'>Career Status</span>
                    <span className='results-student-cell header'>Course Status</span>
                    <span className='results-student-cell header'>MCSP</span>
                    <span className='results-student-cell header'>Career Manager </span>
                    <span className='results-student-cell header'> College Degree </span>
                </div>
            {newStudents.map((student) => {
                return(
                    <div className='results-student-row' key={student.student_id}>
                        <span className='results-student-cell'>{student.student_first}</span>
                        <span className='results-student-cell'>{student.student_last}</span>
                        <span className='results-student-cell'>{student.sec_clearance}</span>
                        <span className='results-student-cell'> Not Started </span>
                        <span className='results-student-cell'> Student </span>
                        <span className='results-student-cell'> MCSP-{importMCSP} </span>
                        <span className='results-student-cell'> { managers ? `${managers[importManager-1].tscm_first}, ${managers[importManager-1].tscm_last}` : ""} </span>
                        <span className='results-student-cell'> Unknown </span>
                    </div>
                )    
            })}
        </div>
        <div className='results-upload-button-container'>
             <button className='header-buttons' onClick={handleUploadClick}> Upload Students </button>
        </div>
    </>    
  )
}
