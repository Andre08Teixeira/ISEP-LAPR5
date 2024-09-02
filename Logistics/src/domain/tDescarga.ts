import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TDescargaProps {
    value: Number;
}

export class TDescarga extends ValueObject<TDescargaProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: TDescargaProps) {
        super(props);
    }

    public static create (tdescarga: Number): Result<TDescarga> {
        const guardResult = Guard.againstNullOrUndefined(tdescarga, 'Tempo de descarga');
        if (!guardResult.succeeded) {
          return Result.fail<TDescarga>(guardResult.message);
        } else {
          return Result.ok<TDescarga>(new TDescarga({ value: tdescarga }))
        }
    }
}