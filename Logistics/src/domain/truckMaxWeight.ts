import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TruckMaxWeightProps {
    value: Number;
}

export class TruckMaxWeight extends ValueObject<TruckMaxWeightProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: TruckMaxWeightProps) {
        super(props);
    }

    public static create (maximum_weight: Number): Result<TruckMaxWeight> {
        const guardResult = Guard.againstNullOrUndefined(maximum_weight, 'maximum_weight');
        if (!guardResult.succeeded) {
          return Result.fail<TruckMaxWeight>(guardResult.message);
        } else {
          return Result.ok<TruckMaxWeight>(new TruckMaxWeight({ value: maximum_weight }))
        }
    }
}