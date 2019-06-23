import { render, fireEvent } from "react-testing-library";
import React from 'react';
import Home from "./Home";
import Header from "../header/Header"
import Modal from "../../utility/Modal";
import Login from "../login/Login";
import NewJob from "../jobs/NewJob";

it('renders home without crashing', () => {
    render(<Home Api={{ Auth: { loggedIn: () => false } }}></Home>)
})

it('renders home and the header', () => {
    const comp = <Home Api={{ Auth: { loggedIn: () => false } }}></Home>
    const { getByText } = render(comp);
    expect(getByText('JobAssign'))
})
it('calls toggleModal', () => {
    const toggleModal = jest.fn();
    const comp = <Header onClick={toggleModal} hasToken={false} title='jobAssign' toggleModal={toggleModal}></Header>
    const { getAllByText } = render(comp);
    fireEvent.click(getAllByText('Log ind')[0])
    expect(toggleModal).toHaveBeenCalled();
})
it('renders the newJob Modal', () => {
    const mockFunc = jest.fn();
    const comp = (<Modal showModal={true} onClick={mockFunc}>
        <NewJob areas={areas} categories={categories} createNewJob={mockFunc}></NewJob>
    </Modal>)
    const { getByText } = render(comp);
    expect(getByText('Categories:'))
})

it('renders the login Modal', () => {
    const mockFunc = jest.fn();
    const comp = (<Modal showModal={true} onClick={mockFunc}>
        <Login onChange={mockFunc} name='' password='' onSubmit={mockFunc} hasToken={false}></Login>
    </Modal>)
    const { getByText } = render(comp);
    expect(getByText('Username:'))
})