import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TCargaProps {
    value: Number;
}

export class TCarga extends ValueObject<TCargaProps> {
    get value (): Number {
      return this.props.value;
    }

    private constructor (props: TCargaProps) {
        super(props);
    }

    public static create (tcarga: Number): Result<TCarga> {
        const guardResult = Guard.againstNullOrUndefined(tcarga, 'Tempo de carga');
        if (!guardResult.succeeded) {
          return Result.fail<TCarga>(guardResult.message);
        } else {
          return Result.ok<TCarga>(new TCarga({ value: tcarga }))
        }
    }
}