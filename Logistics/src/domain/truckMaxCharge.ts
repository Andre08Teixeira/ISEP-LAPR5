import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TruckMaxChargeProps {
    value: Number;
}

export class TruckMaxCharge extends ValueObject<TruckMaxChargeProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: TruckMaxChargeProps) {
        super(props);
    }

    public static create (max_charge: Number): Result<TruckMaxCharge> {
        const guardResult = Guard.againstNullOrUndefined(max_charge, 'max_charge');
        if (!guardResult.succeeded) {
          return Result.fail<TruckMaxCharge>(guardResult.message);
        } else {
          return Result.ok<TruckMaxCharge>(new TruckMaxCharge({ value: max_charge }))
        }
    }
}