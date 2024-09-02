import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface DurationProps {
    value: Number;
}

export class Duration extends ValueObject<DurationProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: DurationProps) {
        super(props);
    }

    public static create (duration: Number): Result<Duration> {
        const guardResult = Guard.againstNullOrUndefined(duration, 'Duration');
        if (!guardResult.succeeded) {
          return Result.fail<Duration>(guardResult.message);
        } else {
          return Result.ok<Duration>(new Duration({ value: duration }))
        }
    }
}
