import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface EnergyNeededProps {
    value: Number;
}

export class EnergyNeeded extends ValueObject<EnergyNeededProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: EnergyNeededProps) {
        super(props);
    }

    public static create (energyNeeded: Number): Result<EnergyNeeded> {
        const guardResult = Guard.againstNullOrUndefined(energyNeeded, 'Energy Needed');
        if (!guardResult.succeeded) {
          return Result.fail<EnergyNeeded>(guardResult.message);
        } else {
          return Result.ok<EnergyNeeded>(new EnergyNeeded({ value: energyNeeded }))
        }
    }
}
