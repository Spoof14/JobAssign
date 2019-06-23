module.exports = (Job, Category, Area, Corp) => {
    let express = require('express');
    let router = express.Router();
	const checkJwt = require('express-jwt');


	//Methods for getting lists of objects
	async function findCats(name){
		let cats = name ? await Category.findOne({name: name}) : await Category.find();
		return cats
	}
	async function findAreas(name){
		let areas = name ? await Area.findOne({name:name}) : await Area.find();
		return areas
	}
	async function findJobs(category, area){
		let categoryObj = await findCats(category)
		let areaObj = await findAreas(area)
		let jobs = await Job.find({category:categoryObj._id, area:areaObj._id});
		return jobs
	}
	async function findJob(id){
		let job = await Job.findOne({_id:id})
			.populate([
				{path:'category', select:'name'},
				{path:'area', select:'name'}, 
				{path:'corp' , select:['name', 'email', 'phone']}
			]);
		return job
	}
	async function findCorp(name){
		let corp = await Corp.findOne({name:name})
		return corp
	}

	async function makejobs(){
		let areas = await findAreas();
		let categories = await findCats()
		let corpObj = await findCorp('admin')
		
		areas.forEach(area => {
			categories.forEach(cat => {
				try {
					let job = Job({name: `${cat.name}`, description:`${cat.name} i ${area.name}`, category: cat._id, area: area._id, corp: corpObj._id})
					console.log(job)
					job.save()
				} catch (error) {
					console.error(error)
				}
			})
		});
	}
	

	/****** Routes *****/
	router.get('/categories', async (req, res) => {
		let cat = await findCats();
		res.send(cat)
	})
	router.post('/categories', async (req, res) => {
		const { name }  = req.body;
		let newCat= Category({name})
		newCat.save();
		res.send(newCat);
	})

	router.get('/areas', async (req, res) => {
		let areas = await findAreas();
		res.send(areas);
	})
	router.post('/areas', async (req, res) => {
		const { name }  = req.body;
		let newArea= Area({name})
		newArea.save();
		res.send(newArea);
	})

	router.get('/jobs', async (req, res) => {
		let { category, area } = req.query
		console.log(req.query)
		let jobs = await findJobs(category, area)
		console.log(jobs)
		res.send(jobs)
	})
	router.get('/job', async (req, res) => {
		let { id } = req.query
		let job = await findJob(id)

		console.log(id)
		res.send(job)
	})
	router.post('/jobs', checkJwt({secret:process.env.JWT_SECRET}), async (req, res) => {
		console.log(req.headers)
		const { name, description, area, category, corp }  = req.body;
		let corpObj = await findCorp(corp)
		console.log(corpObj._id)

		let job = Job({name, description, area, category, corp:corpObj._id})
		console.log(job)
		job.save();
		res.send(job);
	})


    return router;
};