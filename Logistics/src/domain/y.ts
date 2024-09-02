import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface YProps {
    value: Number;
}

export class Y extends ValueObject<YProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: YProps) {
        super(props);
    }

    public static create (y: Number): Result<Y> {
        const guardResult = Guard.againstNullOrUndefined(y, 'Y');
        if (!guardResult.succeeded) {
          return Result.fail<Y>(guardResult.message);
        } else {
          return Result.ok<Y>(new Y({ value: y }))
        }
    }
}