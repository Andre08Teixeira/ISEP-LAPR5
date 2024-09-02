import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { CourseId } from "./courseId";

import ICourseDTO from "../dto/ICourseDTO";
import { Distance } from "./distance";
import { Duration } from "./duration";
import { EnergyNeeded } from "./energyNeeded";

interface CourseProps {

  warehouseID1: string;
  warehouseID2: string;
  distance: number; //distance (in Km).
  duration: number; //duration (in minutes) of the course using a fully loaded truck(4,3tons).
  energyNeeded: number; //energy (in kWh) needed to conclude the course with a fully loaded truck(4,3tons).
}

export class Course extends AggregateRoot<CourseProps> {
  course: Course;
  get id (): UniqueEntityID {
    return this._id;
  }

  get courseId (): CourseId {
    return new CourseId(this.courseId.toValue());
  }

  get warehouseID1 (): string {
    return this.props.warehouseID1;
  }

  get warehouseID2 (): string {
    return this.props.warehouseID2;
  }

  get distance (): number {
    return this.props.distance;
  }

  get duration (): number {
    return this.props.duration;
  }

  get energyNeeded (): number {
    return this.props.energyNeeded;
  }

  set warehouseID1 ( value: string) {
    this.props.warehouseID1 = value;
  }

  set warehouseID2 ( value: string) {
    this.props.warehouseID2 = value;
  }

  set distance ( value: number) {
    this.props.distance = value;
  }

  set duration ( value: number) {
    this.props.duration = value;
  }

  set energyNeeded ( value: number) {
    this.props.energyNeeded = value;
  }

  private constructor (props: CourseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (courseDTO: ICourseDTO, id?: UniqueEntityID): Result<Course> {

    const warehouseID1 = courseDTO.warehouseID1;
    const warehouseID2 = courseDTO.warehouseID2;
    const distance = courseDTO.distance;
    const duration = courseDTO.duration;
    const energyNeeded = courseDTO.energyNeeded;

    if(!!distance === false ){
        return Result.fail<Course>('Must provide a course distance higher than 0')
    }else if(!!duration === false){
      return Result.fail<Course>('Must provide a course duration higher than 0')
    }else if(!!energyNeeded === false){
        return Result.fail<Course>('Must provide a course\'s energy needed higher than 0')
    }else {
      const course = new Course({warehouseID1: warehouseID1, warehouseID2: warehouseID2, distance: distance , duration : duration , energyNeeded : energyNeeded }, id);
      return Result.ok<Course>( course )
    }
  }
}
