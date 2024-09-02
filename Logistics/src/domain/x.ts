import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface XProps {
    value: Number;
}

export class X extends ValueObject<XProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: XProps) {
        super(props);
    }

    public static create (x: Number): Result<X> {
        const guardResult = Guard.againstNullOrUndefined(x, 'X');
        if (!guardResult.succeeded) {
          return Result.fail<X>(guardResult.message);
        } else {
          return Result.ok<X>(new X({ value: x }))
        }
    }
}