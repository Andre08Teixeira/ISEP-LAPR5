import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TruckAutonomyProps {
    value: Number;
}

export class TruckAutonomy extends ValueObject<TruckAutonomyProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: TruckAutonomyProps) {
        super(props);
    }

    public static create (autonomy: Number): Result<TruckAutonomy> {
        const guardResult = Guard.againstNullOrUndefined(autonomy, 'autonomy');
        if (!guardResult.succeeded) {
          return Result.fail<TruckAutonomy>(guardResult.message);
        } else {
          return Result.ok<TruckAutonomy>(new TruckAutonomy({ value: autonomy }))
        }
    }
}