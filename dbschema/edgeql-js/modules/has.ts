import { $ } from "edgedb";
import * as _ from "../imports";
import type * as _std from "./std";
export type $CreatedAtλShape = $.typeutil.flatten<_std.$Object_1eda6830150611ed8c8fb5fe6745a9baλShape & {
  "created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, true, true>;
}>;
type $CreatedAt = $.ObjectType<"has::CreatedAt", $CreatedAtλShape, null>;
const $CreatedAt = $.makeType<$CreatedAt>(_.spec, "a7db17c0-20fe-11ed-8975-a5fb812749e4", _.syntax.literal);

const CreatedAt: $.$expr_PathNode<$.TypeSet<$CreatedAt, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($CreatedAt, $.Cardinality.Many), null, true);



export { $CreatedAt, CreatedAt };

type __defaultExports = {
  "CreatedAt": typeof CreatedAt
};
const __defaultExports: __defaultExports = {
  "CreatedAt": CreatedAt
};
export default __defaultExports;
