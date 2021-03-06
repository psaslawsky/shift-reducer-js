/**
 * Copyright 2016 Shape Security, Inc.
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

import Shift from 'shift-ast';

export default class MonoidalReducer {
  constructor(monoid) {
    this.identity = monoid.empty();
    let concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = (a, b) => concat.call(a, b);
  }

  fold(list, a) {
    return list.reduce((memo, x) => this.append(memo, x), a == null ? this.identity : a);
  }

  reduceArrayAssignmentTarget(node, {elements, rest}) {
    return this.append(this.fold(elements.filter(n => n !== null)), rest === null ? this.identity : rest);
  }

  reduceArrayBinding(node, {elements, rest}) {
    return this.append(this.fold(elements.filter(n => n !== null)), rest === null ? this.identity : rest);
  }

  reduceArrayExpression(node, {elements}) {
    return this.fold(elements.filter(n => n !== null));
  }

  reduceArrowExpression(node, {params, body}) {
    return this.append(params, body);
  }

  reduceAssignmentExpression(node, {binding, expression}) {
    return this.append(binding, expression);
  }

  reduceAssignmentTargetIdentifier(node) {
    return this.identity;
  }

  reduceAssignmentTargetPropertyIdentifier(node, {binding, init}) {
    return this.append(binding, init === null ? this.identity : init);
  }

  reduceAssignmentTargetPropertyProperty(node, {name, binding}) {
    return this.append(name, binding);
  }

  reduceAssignmentTargetWithDefault(node, {binding, init}) {
    return this.append(binding, init);
  }

  reduceBinaryExpression(node, {left, right}) {
    return this.append(left, right);
  }

  reduceBindingIdentifier(node) {
    return this.identity;
  }

  reduceBindingPropertyIdentifier(node, {binding, init}) {
    return this.append(binding, init === null ? this.identity : init);
  }

  reduceBindingPropertyProperty(node, {name, binding}) {
    return this.append(name, binding);
  }

  reduceBindingWithDefault(node, {binding, init}) {
    return this.append(binding, init);
  }

  reduceBlock(node, {statements}) {
    return this.fold(statements);
  }

  reduceBlockStatement(node, {block}) {
    return block;
  }

  reduceBreakStatement(node) {
    return this.identity;
  }

  reduceCallExpression(node, {callee, arguments: _arguments}) {
    return this.append(callee, this.fold(_arguments));
  }

  reduceCatchClause(node, {binding, body}) {
    return this.append(binding, body);
  }

  reduceClassDeclaration(node, {name, super: _super, elements}) {
    return this.fold([name, _super === null ? this.identity : _super, this.fold(elements)]);
  }

  reduceClassElement(node, {method}) {
    return method;
  }

  reduceClassExpression(node, {name, super: _super, elements}) {
    return this.fold([name === null ? this.identity : name, _super === null ? this.identity : _super, this.fold(elements)]);
  }

  reduceCompoundAssignmentExpression(node, {binding, expression}) {
    return this.append(binding, expression);
  }

  reduceComputedMemberAssignmentTarget(node, {object, expression}) {
    return this.append(object, expression);
  }

  reduceComputedMemberExpression(node, {object, expression}) {
    return this.append(object, expression);
  }

  reduceComputedPropertyName(node, {expression}) {
    return expression;
  }

  reduceConditionalExpression(node, {test, consequent, alternate}) {
    return this.fold([test, consequent, alternate]);
  }

  reduceContinueStatement(node) {
    return this.identity;
  }

  reduceDataProperty(node, {name, expression}) {
    return this.append(name, expression);
  }

  reduceDebuggerStatement(node) {
    return this.identity;
  }

  reduceDirective(node) {
    return this.identity;
  }

  reduceDoWhileStatement(node, {body, test}) {
    return this.append(body, test);
  }

  reduceEmptyStatement(node) {
    return this.identity;
  }

  reduceExport(node, {declaration}) {
    return declaration;
  }

  reduceExportAllFrom(node) {
    return this.identity;
  }

  reduceExportDefault(node, {body}) {
    return body;
  }

  reduceExportFrom(node, {namedExports}) {
    return this.fold(namedExports);
  }

  reduceExportFromSpecifier(node) {
    return this.identity;
  }

  reduceExportLocalSpecifier(node, {name}) {
    return name;
  }

  reduceExportLocals(node, {namedExports}) {
    return this.fold(namedExports);
  }

  reduceExpressionStatement(node, {expression}) {
    return expression;
  }

  reduceForInStatement(node, {left, right, body}) {
    return this.fold([left, right, body]);
  }

  reduceForOfStatement(node, {left, right, body}) {
    return this.fold([left, right, body]);
  }

  reduceForStatement(node, {init, test, update, body}) {
    return this.fold([init === null ? this.identity : init, test === null ? this.identity : test, update === null ? this.identity : update, body]);
  }

  reduceFormalParameters(node, {items, rest}) {
    return this.append(this.fold(items), rest === null ? this.identity : rest);
  }

  reduceFunctionBody(node, {directives, statements}) {
    return this.append(this.fold(directives), this.fold(statements));
  }

  reduceFunctionDeclaration(node, {name, params, body}) {
    return this.fold([name, params, body]);
  }

  reduceFunctionExpression(node, {name, params, body}) {
    return this.fold([name === null ? this.identity : name, params, body]);
  }

  reduceGetter(node, {name, body}) {
    return this.append(name, body);
  }

  reduceIdentifierExpression(node) {
    return this.identity;
  }

  reduceIfStatement(node, {test, consequent, alternate}) {
    return this.fold([test, consequent, alternate === null ? this.identity : alternate]);
  }

  reduceImport(node, {defaultBinding, namedImports}) {
    return this.append(defaultBinding === null ? this.identity : defaultBinding, this.fold(namedImports));
  }

  reduceImportNamespace(node, {defaultBinding, namespaceBinding}) {
    return this.append(defaultBinding === null ? this.identity : defaultBinding, namespaceBinding);
  }

  reduceImportSpecifier(node, {binding}) {
    return binding;
  }

  reduceLabeledStatement(node, {body}) {
    return body;
  }

  reduceLiteralBooleanExpression(node) {
    return this.identity;
  }

  reduceLiteralInfinityExpression(node) {
    return this.identity;
  }

  reduceLiteralNullExpression(node) {
    return this.identity;
  }

  reduceLiteralNumericExpression(node) {
    return this.identity;
  }

  reduceLiteralRegExpExpression(node) {
    return this.identity;
  }

  reduceLiteralStringExpression(node) {
    return this.identity;
  }

  reduceMethod(node, {name, params, body}) {
    return this.fold([name, params, body]);
  }

  reduceModule(node, {directives, items}) {
    return this.append(this.fold(directives), this.fold(items));
  }

  reduceNewExpression(node, {callee, arguments: _arguments}) {
    return this.append(callee, this.fold(_arguments));
  }

  reduceNewTargetExpression(node) {
    return this.identity;
  }

  reduceObjectAssignmentTarget(node, {properties}) {
    return this.fold(properties);
  }

  reduceObjectBinding(node, {properties}) {
    return this.fold(properties);
  }

  reduceObjectExpression(node, {properties}) {
    return this.fold(properties);
  }

  reduceReturnStatement(node, {expression}) {
    return expression === null ? this.identity : expression;
  }

  reduceScript(node, {directives, statements}) {
    return this.append(this.fold(directives), this.fold(statements));
  }

  reduceSetter(node, {name, param, body}) {
    return this.fold([name, param, body]);
  }

  reduceShorthandProperty(node, {name}) {
    return name;
  }

  reduceSpreadElement(node, {expression}) {
    return expression;
  }

  reduceStaticMemberAssignmentTarget(node, {object}) {
    return object;
  }

  reduceStaticMemberExpression(node, {object}) {
    return object;
  }

  reduceStaticPropertyName(node) {
    return this.identity;
  }

  reduceSuper(node) {
    return this.identity;
  }

  reduceSwitchCase(node, {test, consequent}) {
    return this.append(test, this.fold(consequent));
  }

  reduceSwitchDefault(node, {consequent}) {
    return this.fold(consequent);
  }

  reduceSwitchStatement(node, {discriminant, cases}) {
    return this.append(discriminant, this.fold(cases));
  }

  reduceSwitchStatementWithDefault(node, {discriminant, preDefaultCases, defaultCase, postDefaultCases}) {
    return this.fold([discriminant, this.fold(preDefaultCases), defaultCase, this.fold(postDefaultCases)]);
  }

  reduceTemplateElement(node) {
    return this.identity;
  }

  reduceTemplateExpression(node, {tag, elements}) {
    return this.append(tag === null ? this.identity : tag, this.fold(elements));
  }

  reduceThisExpression(node) {
    return this.identity;
  }

  reduceThrowStatement(node, {expression}) {
    return expression;
  }

  reduceTryCatchStatement(node, {body, catchClause}) {
    return this.append(body, catchClause);
  }

  reduceTryFinallyStatement(node, {body, catchClause, finalizer}) {
    return this.fold([body, catchClause === null ? this.identity : catchClause, finalizer]);
  }

  reduceUnaryExpression(node, {operand}) {
    return operand;
  }

  reduceUpdateExpression(node, {operand}) {
    return operand;
  }

  reduceVariableDeclaration(node, {declarators}) {
    return this.fold(declarators);
  }

  reduceVariableDeclarationStatement(node, {declaration}) {
    return declaration;
  }

  reduceVariableDeclarator(node, {binding, init}) {
    return this.append(binding, init === null ? this.identity : init);
  }

  reduceWhileStatement(node, {test, body}) {
    return this.append(test, body);
  }

  reduceWithStatement(node, {object, body}) {
    return this.append(object, body);
  }

  reduceYieldExpression(node, {expression}) {
    return expression === null ? this.identity : expression;
  }

  reduceYieldGeneratorExpression(node, {expression}) {
    return expression;
  }
}
