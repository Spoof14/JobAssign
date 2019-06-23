import { render, getByText, waitForElement } from "react-testing-library";
import React from 'react';
import Job from "./Job";


it('renders Job without crashing', () => {
    render(<Job ></Job>)
})

it('renders Job and the contact form',async  () => {
    let match = {
        params:{
            id:1111
        }
    }
    let newApi = Api
    newApi.Jobs.getJobById = (id) => jobs.find(job => job.id === id)
    const comp = <Job match={match} Api={newApi}></Job>
    const { findByText } = render(comp);


    const text = await findByText('Kontakt')

    expect(text)
})


it('renders a new job when params change',async  () => {
    let match = {
        params:{
            id:1111
        }
    }
    let newApi = Api
    newApi.Jobs.getJobById = (id) => jobs.find(job => job.id === id)

    let comp = <Job match={match} Api={newApi}></Job>
    let { findByText } = render(comp);
    const text = await findByText('job1')
    
    match.params.id = 2222;
    comp = <Job match={match} Api={newApi}></Job>
    findByText = render(comp).findByText
    const text2 = await findByText('job2')
    expect(text.textContent !== text2.textContent)
})

it('renders Job but no job is found', () => {
    const comp = <Job></Job>
    const { getByText } = render(comp);
    expect(getByText('No such job found'))
})
