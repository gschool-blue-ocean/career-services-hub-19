import React, {useContext, useState} from 'react';
import exportFromJSON from 'export-from-json';
import { StudentsContext } from '../../context/studentsContext';

function Export({ currentCohort, setCurrentCohort }) {

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  console.log(students);

  const fields = ['cohort', 'student_first', 'student_last', 'sec_clearance', 'career_status', 'course_status'];
  const milestoneFields = [{ name: 'mile_name' }, { name: 'progress_stat' }];
  const milestoneColumns = milestoneFields.map(field => `milestones.${field.name}`);
  const allFields = fields.concat(milestoneColumns);

  const onExportToCsv = () => {
    const selectedCohort = students.filter(student => student.cohort === currentCohort)
      .flatMap(student => {
        return student.milestones.map(milestone => ({
          ...student,
          'milestones.mile_name': milestone.mile_name,
          'milestones.progress_stat': milestone.progress_stat
        }))
    });

    const data = selectedCohort;
    const fileName = `${currentCohort}_report`;
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({data, fileName, fields: allFields, exportType});
  }

  return (
    <div>
      <button
        onClick={onExportToCsv}
      >
        Export to CSV
      </button>
    </div>
  )
}

export default Export;