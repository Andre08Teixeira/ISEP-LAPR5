import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TruckChargeTimeProps {
    value: Number;
}

export class TruckChargeTime extends ValueObject<TruckChargeTimeProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: TruckChargeTimeProps) {
        super(props);
    }

    public static create (charge_time: Number): Result<TruckChargeTime> {
        const guardResult = Guard.againstNullOrUndefined(charge_time, 'charge_time');
        if (!guardResult.succeeded) {
          return Result.fail<TruckChargeTime>(guardResult.message);
        } else {
          return Result.ok<TruckChargeTime>(new TruckChargeTime({ value: charge_time }))
        }
    }
}