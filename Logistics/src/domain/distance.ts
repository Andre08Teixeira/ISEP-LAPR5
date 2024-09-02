import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface DistanceProps {
    value: Number;
}

export class Distance extends ValueObject<DistanceProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: DistanceProps) {
        super(props);
    }

    public static create (distance: Number): Result<Distance> {
        const guardResult = Guard.againstNullOrUndefined(distance, 'Distance');
        if (!guardResult.succeeded) {
          return Result.fail<Distance>(guardResult.message);
        } else {
          return Result.ok<Distance>(new Distance({ value: distance }))
        }
    }
}
