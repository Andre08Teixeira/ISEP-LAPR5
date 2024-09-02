import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  phoneNumber: string;
  password: UserPassword;
  role: Role;
}

export class User extends AggregateRoot<UserProps> {
  user: Result<UserEmail>;
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): UserPassword {
    return this.props.password;
  }
  get phoneNumber (): string {
    return this.props.phoneNumber;
  }

  get role (): Role {
    return this.props.role;
  }
  
  set role (value: Role) {
      this.props.role = value;
  }

  set email (value: UserEmail){
    this.props.email = value;
  }

  set firstName (value: string){
    this.props.firstName = value;
  }

  set lastName (value: string){
    this.props.lastName = value;
  }

  set phoneNumber (value : string) {
    this.props.phoneNumber = value;
  }


  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.phoneNumber, argumentName: 'phoneNumber' },
      { argument: props.role, argumentName: 'role' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }     
    else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }
}