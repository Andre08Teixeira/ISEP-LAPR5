import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TruckRegistrationProps {
    value: string;
}

export class TruckRegistration extends ValueObject<TruckRegistrationProps> {
    get value (): string {
      return this.props.value;
    }

    private constructor (props: TruckRegistrationProps) {
        super(props);
    }

    public static create (registration: string): Result<TruckRegistration> {
        const guardResult = Guard.againstNullOrUndefined(registration, 'registration');
        if (!guardResult.succeeded) {
          return Result.fail<TruckRegistration>(guardResult.message);
        } else {
          return Result.ok<TruckRegistration>(new TruckRegistration({ value: registration }))
        }
    }
}