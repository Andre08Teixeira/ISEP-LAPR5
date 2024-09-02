import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface ZProps {
    value: Number;
}

export class Z extends ValueObject<ZProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: ZProps) {
        super(props);
    }

    public static create (z: Number): Result<Z> {
        const guardResult = Guard.againstNullOrUndefined(z, 'Z');
        if (!guardResult.succeeded) {
          return Result.fail<Z>(guardResult.message);
        } else {
          return Result.ok<Z>(new Z({ value: z }))
        }
    }
}