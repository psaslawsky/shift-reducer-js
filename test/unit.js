/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as assert from "assert"

import reduce from "../";
import {parseModule} from "shift-parser";

suite("unit", () => {

  test("empty reducer throws", () => {
    assert.throws(() => reduce({}, parseModule("null;")));
  });

  test("nonempty reducer does not throw", () => {
    const literalNullReducer = {
      reduceExpressionStatement(node, state) {
        return state;
      },
      reduceLiteralNullExpression(node, state) {
        return state;
      },
      reduceModule(node, state) {
        return state;
      }
    };
    assert.doesNotThrow(() => reduce(literalNullReducer, parseModule("null;")));
  });

});
