import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const courseSchema = {
    // compare with the approach followed in repos and services
    name: 'courseSchema',
    schema: '../persistence/schemas/courseSchema',
  };

  const packageSchema = {
    // compare with the approach followed in repos and services
    name: 'packageSchema',
    schema: '../persistence/schemas/packageSchema',
  };

  const planningSchema = {
    // compare with the approach followed in repos and services
    name: 'planningSchema',
    schema: '../persistence/schemas/planningSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }

  const courseController = {
    name: config.controllers.course.name,
    path: config.controllers.course.path
  }

  const packageController = {
    name: config.controllers.packagee.name,
    path: config.controllers.packagee.path
  }

  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path
  }

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }

  const courseRepo = {
    name: config.repos.course.name,
    path: config.repos.course.path
  }

  const packageRepo = {
    name: config.repos.packagee.name,
    path: config.repos.packagee.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const planningRepo = {
    name: config.repos.planning.name,
    path: config.repos.planning.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }

  const courseService = {
    name: config.services.course.name,
    path: config.services.course.path
  }

  const packageService = {
    name: config.services.packagee.name,
    path: config.services.packagee.path
  }

  const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      courseSchema,
      packageSchema,
      planningSchema
    ],
    controllers: [
      roleController,
      userController,
      truckController,
      courseController,
      packageController,
      planningController
    ],
    repos: [
      roleRepo,
      userRepo,
      truckRepo,
      courseRepo,
      packageRepo,
      planningRepo
    ],
    services: [
      roleService,
      userService,
      truckService,
      courseService,
      packageService,
      planningService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
