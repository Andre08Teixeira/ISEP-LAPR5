import { Result } from "../../core/logic/Result";
import ICourseDTO from "../../dto/ICourseDTO";

export default interface ICourseService  {
  createCourse(courseDTO: ICourseDTO): Promise<Result<ICourseDTO>>;
  updateCourse(courseDTO: ICourseDTO): Promise<Result<ICourseDTO>>;
  getCourse(courseDTO: ICourseDTO): Promise<Result<ICourseDTO>>;
  getAllCourses(): Promise<Result<ICourseDTO[]>>;
  removeCourse(courseDTO: ICourseDTO): Promise<Result<ICourseDTO>>;

}
