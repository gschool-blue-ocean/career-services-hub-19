import React from 'react';

function Filter({ currentCohort, setCurrentCohort, currentClearance, setCurrentClearance, currentStatus, setCurrentStatus,
            currentMilestonStatus, setCurrentMilestonStatus, milestoneDocument, setMilestoneDocument }) {
  
  const cohorts = ['MCSP-16', 'MCSP-17', 'MCSP-18', 'MCSP-19', 'MCSP-20', 'MCSP-21', 'MCSP-22'];
  const secClearance = ['None', 'SECRET', 'TOP SECRET', 'TOP SECRET//SCI'];
  const courseStatus = ['Student', 'Graduate'];
  const studentMilestone = ['Cover Letter', 'Resume', 'LinkedIn', 'Personal Narrative', 'Hunter Access'];
  const progress_stat = ['In-Progress', 'Completed', 'Un-Satisfactory'];
  
  return (
    <div id='filt_container' >
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Select a MCSP</h1>
          <select
            value={currentCohort}
            onChange={(e) => setCurrentCohort(e.target.value)}
          >
            <option value=''>Select a MCSP</option>
            {
              cohorts.map((cohort, index) => {
                return(
                  <option
                    key={index}
                    value={cohort}
                  >
                    {cohort}
                  </option>
                )
              })
            }
          </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Security Clearance</h1>
        <select
          value={currentClearance}
          onChange={(e) => setCurrentClearance(e.target.value)}
        >
          <option value=''>Select a Security Clearance</option>
          {
            secClearance.map((security, index) => {
              return (
                <option
                  key={index}
                  value={security}
                >
                  {security}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Current Course Standing</h1>
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
        >
          <option value=''>Student/Graduate</option>
          {
            courseStatus.map((schoolStat, index) => {
              return (
                <option
                  value={schoolStat}
                  key={index}
                >
                  {schoolStat}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Milestone Document</h1>
        <select
          value={milestoneDocument}
          onChange={(e) => setMilestoneDocument(e.target.value)}
        >
          <option value=''>Milestone Document</option>
          {
            studentMilestone.map((mileDoc, index) => {
              return (
                <option
                  key={index}
                  value={mileDoc}
                >
                  {mileDoc}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Milestone Status</h1>
        <select
          value={currentMilestonStatus}
          onChange={(e) => setCurrentMilestonStatus(e.target.value)}
        >
          <option value=''>Document Status</option>
          {
            progress_stat.map((docStatus, index) => {
              return (
                <option
                  key={index}
                  value={docStatus}
                >
                  {docStatus}
                </option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}

export default Filter
