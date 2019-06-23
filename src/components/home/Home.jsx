import React, { PureComponent } from 'react';
import Header from '../header/Header';
import Login from '../login/Login';
import Modal from '../../utility/Modal';
import NewJob from '../jobs/NewJob';


export default class Home extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			showModal: '',
			name: '',
			password: '',
			msg: '',
			token:'',
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.logout = this.logout.bind(this);
		this.createNewJob = this.createNewJob.bind(this)
	}



	onChange(e) {
		let { name, value } = e.target
		this.setState({
			[name]: value
		})
	}

	toggleModal(modal) {
		this.setState({
			showModal: modal
		})
	}

	async onSubmit(e) {
		e.preventDefault();
		let { Api } = this.props;
		let { name, password } = this.state;
		let res = await Api.Auth.login(name, password)
		
		if (res.token) {
			this.setState({ token: res.token })
			this.toggleModal();
		} else {
			this.setState({ msg: res.msg })
		}
	}

	componentDidMount(){
		let { Api } = this.props;
		
		if(Api.Auth.loggedIn()){
			this.setState({
				token:Api.Auth.getToken()
			})
		}
	}

	logout(){
		let { Api } = this.props;
		Api.Auth.logout();
		this.setState({
			token:''
		})
	}

	async createNewJob(job){
		let { Api } = this.props;
		let decodedCorpName = Api.Auth.decodeToken().name;
		job.corp = decodedCorpName
		let newJob = await Api.Jobs.postJob(job, this.state.token)
		this.props.history.push(`/job/${newJob._id}`)
		this.toggleModal('')
	}

	render() {
		let { showModal, name, password, msg, token } = this.state
		let { areas, categories } = this.props
		let hasToken = !!token
		return (
			<div className="container">
				<Header 
					title='JobAssign'
					onClick={hasToken ? this.logout : () => this.toggleModal('login')} 
					toggleModal={() => this.toggleModal('new job')} 
					hasToken={hasToken}>
				</Header>

				{
					showModal === 'login'
					&&
					<Modal showModal={showModal} onClick={() => this.toggleModal('')}>
						<Login onChange={this.onChange} name={name} password={password} onSubmit={this.onSubmit} msg={msg} hasToken={!!token}></Login>
					</Modal>
				}
				{
					showModal === 'new job'
					&&
					<Modal showModal={showModal} onClick={() => this.toggleModal('')}>
						<NewJob areas={areas} categories={categories} createNewJob={this.createNewJob}></NewJob>
					</Modal>
				}
			</div>
		)
	}
}
