import React, {useContext, useState} from 'react';
import { EventsContext } from '../../context/eventsContext';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from '../../context/managersContext';
import StudentCardsList from './StudentCardsList';

import ExcelImportButton from './Excel Import Button/ExcelImportButton'
import Export from './Export';
import '../filter.css';
import Filter_Modal from './Filter_Modal';
import Filter from './Filter_Com';

export default function CareerServicesHub() {

  const [currentCohort, setCurrentCohort] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentClearance, setCurrentClearance] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentMilestonStatus, setCurrentMilestonStatus] = useState('');
  const [milestoneDocument, setMilestoneDocument] = useState('');

  const eventContext = useContext(EventsContext);
  const events = eventContext.eventsData;
  console.log(events);

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  console.log(students);

  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;
  console.log(managers);

  return (
    <div>
      < ExcelImportButton />
      <Export 
        currentCohort={currentCohort}
        setCurrentCohort={setCurrentCohort}
      />
      <div className='filt_wrapper'>
        <button 
          id='filterBtn'
          onClick={() => setFilterOpen(true)}
        >
          Filter
        </button>
        <Filter_Modal
          filterOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        >
          <Filter 
            currentCohort={currentCohort}
            setCurrentCohort={setCurrentCohort}
            currentClearance={currentClearance}
            setCurrentClearance={setCurrentClearance}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            currentMilestonStatus={currentMilestonStatus}
            setCurrentMilestonStatus={setCurrentMilestonStatus}
            milestoneDocument={milestoneDocument}
            setMilestoneDocument={setMilestoneDocument}
          />
        </Filter_Modal>
      </div>
      <StudentCardsList
        currentCohort={currentCohort}
        currentClearance={currentClearance}
        currentStatus={currentStatus}
        milestoneDocument={milestoneDocument}
        currentMilestonStatus={currentMilestonStatus}
      />
    </div>
  )
}
