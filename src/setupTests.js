import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import AuthService from './utility/AuthService';
import JobService from './utility/JobService';


global.areas = [{id:111, name:'Jylland'}, {id:222, name:'Fyn'}];
global.categories = [{ id:11, name:'IT'},{id:22, name: 'Sikkerhed'}]
global.corp = {name:'admin', hash:'asd', phone:'8888888', email:'asd@admin.com', id:1}
global.jobs = [{id:1111,name:'job1', description:'test job', area:1, category:1, corp:1}, {id:2222,name:'job2', description:'test job', area:1, category:1, corp:1}]
global.Api = {Auth: new AuthService(), Jobs: new JobService()}