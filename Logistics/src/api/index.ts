import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import truck from './routes/truckRoute';
import course from './routes/courseRoute';
import planning from './routes/planningRoute';
import packagee from './routes/packageRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truck(app);
	course(app);
  planning(app);
	packagee(app);
	return app
}
