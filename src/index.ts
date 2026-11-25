/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

import { METHODS } from "node:http";

export const methods = METHODS.map((method) => method.toLowerCase());
