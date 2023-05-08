import React, {useContext} from 'react';
import { StudentsContext } from '../../context/studentsContext';
import StudentCard from './StudentCard';
import './StudentCardList.css'


export default function StudentCardslist ({ currentCohort, currentClearance, currentStatus, milestoneDocument, currentMilestonStatus }) {
const studentContext = useContext(StudentsContext);
const students = studentContext.studentsData;
console.log(students);

    // Filter the list of students based on the current cohort or clearance level
    const filterStudents = (students, currentCohort, currentClearance, currentStatus, milestoneDocument, currentMilestonStatus) => {
        if(!students){
            return [];
        }
        return students.filter((student) => {
          if (currentCohort && currentClearance && currentStatus) {
            return (
              student.cohort === currentCohort &&
              student.sec_clearance === currentClearance &&
              student.course_status === currentStatus
            );
          } else if (milestoneDocument && currentMilestonStatus) {
            return (
                student.mile_name === milestoneDocument &&
                student.progress_stat === currentMilestonStatus
            );
          } else if (currentCohort) {
            return student.cohort === currentCohort;
          } else if (currentClearance) {
            return student.sec_clearance === currentClearance;
          } else if (currentStatus) {
            return student.course_status === currentStatus;
          } else {
            return true; // show all students if neither currentCohort nor currentClearance are selected
          }
        });
    };

    const filteredStudents = filterStudents(students, currentCohort, currentClearance, currentStatus, milestoneDocument, currentMilestonStatus);
    
    return (
        <>
<div className='student-card-container'>
    {filterStudents != null ? filteredStudents.map((student) => {
        console.log(student);
    return(
        <div key={student.student_id}>
            <StudentCard  student={student}/>
        </div>
    )
    }) : "Loading"}
</div>
</>
    )
}

