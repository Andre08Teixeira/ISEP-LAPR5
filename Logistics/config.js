import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://utilizador:grupo41lapr@cluster0.8h59kcd.mongodb.net/?retryWrites=true&w=majority",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    truck: {
      name: "TruckController",
      path: "../controllers/truckController"
    },
    course: {
      name: "CourseController",
      path: "../controllers/courseController"
    },
    packagee: {
      name: "PackageController",
      path: "../controllers/packageController"
    },
    planning: {
      name: "PlanningController",
      path: "../controllers/planningController"
    },
    user: {
      name: "UserController",
      path: "../controllers/userController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo"
    },
    course: {
      name: "CourseRepo",
      path: "../repos/courseRepo"
    },
    packagee: {
      name: "PackageRepo",
      path: "../repos/packageRepo"
    },
    planning: {
      name: "PlanningRepo",
      path: "../repos/planningRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    truck: {
      name: "TruckService",
      path: "../services/truckService"
    },
    course: {
      name: "CourseService",
      path: "../services/courseService"
    },
    packagee: {
      name: "PackageService",
      path: "../services/packageService"
    },
    planning: {
      name: "PlanningService",
      path: "../services/planningService"
    },
    user:{
      name: "UserService",
      path: "../services/userService"
    }
  },
};
