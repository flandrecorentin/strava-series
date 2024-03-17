import {TypeSerie} from "./enum/type-serie";
import {StateSerie} from "./enum/state-serie";

export interface Serie {
  athleteId: string | undefined,
  name: string,
  type: TypeSerie,
  create_timestamp: number | undefined,
  state: StateSerie,
  bio: string
}
