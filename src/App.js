import React, { PureComponent } from 'react';
import './App.css'
import Home from './components/home/Home';
import JobService from './utility/JobService';
import Auth from './utility/AuthService'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import List from './utility/List';
import LinkListItem from './utility/LinkListItem';
import Jobs from './components/jobs/Jobs';
import Job from './components/jobs/Job';


let tokenContext = React.createContext('');

class App extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			categories: [],
			areas: [],
		}
		this.Api = {Jobs: new JobService(), Auth: new Auth()}
	}

	render() {
		let { areas, categories } = this.state
		return (
			<Router>
				<Route
					path='/' 
					render={(props) => {
						return <Home Api={this.Api} areas={areas} categories={categories} {...props} ></Home>
					}}
				></Route>
			

					<Route 
						exact 
						path='/' 
						render={(props) => {
							return <List  {...props} Component={LinkListItem} listName="list" className="list-item" items={categories} link='/jobs/'></List>
					}} ></Route>

					<Route 
						exact 
						path='/jobs/:category' 
						render={(props) => {
							return <List {...props} Component={LinkListItem} listName="list" className="list-item" items={areas}></List>
					}} ></Route>

					<Route exact path='/jobs/:category/:area' render={(props) => {
						return <Jobs Api={this.Api} {...props}></Jobs>
					}}></Route>
					
					<Route exact path='/job/:id'  render={(props) => {
						return <Job Api={this.Api} {...props}></Job>
					}}></Route>
			</Router>
		)
	}

	async componentDidMount(){
		let categories = await this.Api.Jobs.getCategories();
		let areas = await this.Api.Jobs.getAreas();

		this.setState({
			categories,
			areas
		})
	}
}

export default App;
