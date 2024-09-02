import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ICoursePersistence } from '../dataschema/ICoursePersistence';

import ICourseDTO from "../dto/ICourseDTO";
import { Course } from "../domain/course";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class CourseMap extends Mapper<Course> {

  public static toDTO( course: Course): ICourseDTO {
    return {
      id: course.id.toString(),
      warehouseID1:course.warehouseID1,
      warehouseID2:course.warehouseID2,
      distance:course.distance,
      duration:course.duration,
      energyNeeded:course.energyNeeded,
    } as ICourseDTO;
  }

  public static toDomain (course: any | Model<ICoursePersistence & Document> ): Course {
    const courseOrError = Course.create(
      course,
      new UniqueEntityID(course.domainId)
    );

    courseOrError.isFailure ? console.log(courseOrError.error) : '';

    return courseOrError.isSuccess ? courseOrError.getValue() : null;
  }

  public static toPersistence (course: Course): any {
    return {
      domainId: course.id.toString(),
      warehouseID1:course.warehouseID1,
      warehouseID2:course.warehouseID2,
      distance:course.distance,
      duration:course.duration,
      energyNeeded:course.energyNeeded
    }
  }
}
