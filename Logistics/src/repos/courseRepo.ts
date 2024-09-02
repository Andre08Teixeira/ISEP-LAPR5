import { Service, Inject } from 'typedi';

import ICourseRepo from "../services/IRepos/ICourseRepo";
import { Course } from "../domain/course";
import { CourseId } from "../domain/courseId";
import { CourseMap } from "../mappers/CourseMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ICoursePersistence } from '../dataschema/ICoursePersistence';

@Service()
export default class CourseRepo implements ICourseRepo {
  private models: any;

  constructor(
    @Inject('courseSchema') private courseSchema : Model<ICoursePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(course: Course): Promise<boolean> {

    const idX = course.id instanceof CourseId ? (<CourseId>course.id).toValue() : course.id;

    const query = { domainId: idX};
    const courseDocument = await this.courseSchema.findOne( query as FilterQuery<ICoursePersistence & Document>);

    return !!courseDocument === true;
  }

  public async save (course: Course): Promise<Course> {
    const query = { domainId: course.id.toString()};

    const courseDocument = await this.courseSchema.findOne( query );

    try {
      if (courseDocument === null ) {
        const rawCourse: any = CourseMap.toPersistence(course);

        const courseCreated = await this.courseSchema.create(rawCourse);

        return CourseMap.toDomain(courseCreated);
      } else {
        courseDocument.id = course.id;
        courseDocument.warehouseID1 = course.warehouseID1;
        courseDocument.warehouseID2 = course.warehouseID2;
        courseDocument.distance = course.distance;
        courseDocument.duration = course.duration;
        courseDocument.energyNeeded = course.energyNeeded;
        await courseDocument.save();

        return course;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (courseId: CourseId | string): Promise<Course> {
    const query = { domainId: courseId};
    const courseRecord = await this.courseSchema.findOne( query as FilterQuery<ICoursePersistence & Document> );

    if( courseRecord != null) {
      return CourseMap.toDomain(courseRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Course[]> {

    const courseRecord = await this.courseSchema.find();

    return courseRecord !== null ? courseRecord.map((postRecord) => CourseMap.toDomain(postRecord)): null

  }

  public async remove(courseId: CourseId | string): Promise<null>{
    const query = { domainId: courseId};
    await this.courseSchema.deleteOne( query as FilterQuery<ICoursePersistence & Document> );
    return null;
  }
}
