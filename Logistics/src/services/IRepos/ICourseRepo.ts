import { Repo } from "../../core/infra/Repo";
import { Course } from "../../domain/course";
import { CourseId } from "../../domain/courseId";

export default interface ICourseRepo extends Repo<Course> {
  save(course: Course): Promise<Course>;
  findByDomainId (courseId: CourseId | string): Promise<Course>;
  findAll(): Promise<Course[]>;
	remove(courseId: CourseId);
  exists(course: Course): Promise<boolean>;

  //findByIds (courseIds: Course[]): Promise<Course[]>;
  //saveCollection (courses: Course[]): Promise<Course[]>;
  //removeByCourseIds (courses: CourseId[]): Promise<any>
}
