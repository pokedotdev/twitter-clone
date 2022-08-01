export * from "./syntax/external";
export * from "./types";
export { createClient } from "edgedb";
import { $, _edgedbJsVersion } from "edgedb";
import * as $syntax from "./syntax/syntax";
import * as $op from "./operators";
import _std from "./modules/std";
import _cal from "./modules/cal";
import _cfg from "./modules/cfg";
import _default from "./modules/default";
import _schema from "./modules/schema";
import _sys from "./modules/sys";
import _math from "./modules/math";

if (_edgedbJsVersion !== "0.21.1") {
  throw new Error(
    `The query builder was generated by a different version of edgedb-js (v0.21.1)` +
      ` than the one currently installed (v${_edgedbJsVersion}).\n` +
      `Run 'npx edgeql-js' to re-generate a compatible version.\n`
  );
}

const ExportDefault: typeof _std & 
  typeof _default & 
  $.util.OmitDollarPrefixed<typeof $syntax> & 
  typeof $op & {
  "std": typeof _std;
  "cal": typeof _cal;
  "cfg": typeof _cfg;
  "default": typeof _default;
  "schema": typeof _schema;
  "sys": typeof _sys;
  "math": typeof _math;
} = {
  ..._std,
  ..._default,
  ...$.util.omitDollarPrefixed($syntax),
  ...$op,
  "std": _std,
  "cal": _cal,
  "cfg": _cfg,
  "default": _default,
  "schema": _schema,
  "sys": _sys,
  "math": _math,
};
const Cardinality = $.Cardinality;
type Cardinality = $.Cardinality;
export type Set<
  Type extends $.BaseType,
  Cardinality extends $.Cardinality = $.Cardinality.Many
> = $.TypeSet<Type, Cardinality>;


export default ExportDefault;
export { Cardinality };
