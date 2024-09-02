/* eslint-disable prettier/prettier */
import { Service, Inject } from "typedi";
import config from "../../config";
import ICourseDTO from '../dto/ICourseDTO';
import { Course } from "../domain/course";
import ICourseRepo from './IRepos/ICourseRepo';
import ICourseService from './IServices/ICourseService';
import { Result } from "../core/logic/Result";
import { CourseMap } from "../mappers/CourseMap";
// Warehouse ";


@Service()
export default class CourseService implements ICourseService {
  constructor(
      @Inject(config.repos.course.name) private courseRepo : ICourseRepo
  ) {}

  public async getCourse( courseDTO: ICourseDTO): Promise<Result<ICourseDTO>> {
    try {
      const course = await this.courseRepo.findByDomainId(courseDTO.id);

      if (course === null) {
        return Result.fail<ICourseDTO>("Course not found");
      }
      else {
        const courseDTOResult = CourseMap.toDTO( course ) as ICourseDTO;
        return Result.ok<ICourseDTO>( courseDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createCourse(courseDTO: ICourseDTO): Promise<Result<ICourseDTO>> {
    try {

      const courseOrError = await Course.create( courseDTO );

      if (courseOrError.isFailure) {
        return Result.fail<ICourseDTO>(courseOrError.errorValue());
      }

      const courseResult = courseOrError.getValue();

      await this.courseRepo.save(courseResult);

      const courseDTOResult = CourseMap.toDTO( courseResult ) as ICourseDTO;
      return Result.ok<ICourseDTO>( courseDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateCourse(courseDTO: ICourseDTO): Promise<Result<ICourseDTO>> {
    try {
      const course = await this.courseRepo.findByDomainId(courseDTO.id);

      if (course === null) {
        return Result.fail<ICourseDTO>("Course not found");
      }
      else {
        course.warehouseID1 = courseDTO.warehouseID1;
        course.warehouseID2 = courseDTO.warehouseID2;
        course.distance = courseDTO.distance;
        course.duration = courseDTO.duration;
        course.energyNeeded = courseDTO.energyNeeded;
        await this.courseRepo.save(course);

        const courseDTOResult = CourseMap.toDTO( course ) as ICourseDTO;
        return Result.ok<ICourseDTO>( courseDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllCourses(): Promise<Result<ICourseDTO[]>> {
    try {
      const courseList = await this.courseRepo.findAll();

      if (courseList === null) {
        return Result.fail<ICourseDTO[]>("No courses found");
      }

      const result = courseList.map((courseList) => CourseMap.toDTO(courseList) as ICourseDTO);
      return Result.ok<ICourseDTO[]>(result);

    } catch (e) {
      throw e;
    }
  }

  public async removeCourse(courseDTO: ICourseDTO): Promise<Result<ICourseDTO>> {
    try {
      const course = await this.courseRepo.findByDomainId(courseDTO.id);
      if (course === null) {
        return Result.fail<ICourseDTO>("Course not found");
      }
      else {
        await this.courseRepo.remove(course.id);

        const courseDTOResult = CourseMap.toDTO( course ) as ICourseDTO;
        return Result.ok<ICourseDTO>( courseDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  /*public async getWarehouse(warehouseId : string): Promise<boolean>{

    return new Promise((resolve)=> {
      var https = require('https');
      var options = {
        host: 'localhost',
        path: '/api/entregas' + warehouseId,
        port: 5001,
        accept: 'text/plain',
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
      };

       var req = https.get(options, funtion(res){
        resolve(res.statusCode==200);
       });

       req.on('error', function(e){
        console.log('ERROR: ' + e.message);
        resolve(false);
       });
    });

  }*/
}
