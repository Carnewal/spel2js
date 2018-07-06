/*
 * Copyright 2002-2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {SpelNode} from './SpelNode';

/**
 * A function reference is of the form "#someFunction(a,b,c)". Functions may be defined in
 * the context prior to the expression being evaluated or within the expression itself
 * using a lambda function definition. For example: Lambda function definition in an
 * expression: "(#max = {|x,y|$x>$y?$x:$y};max(2,3))" Calling context defined function:
 * "#isEven(37)". Functions may also be static java methods, registered in the context
 * prior to invocation of the expression.
 *
 * <p>Functions are very simplistic, the arguments are not part of the definition (right
 * now), so the names must be unique.
 *
 * @author Andy Clement
 * @author Ben March
 * @since 0.2.0
 */

function createNode(variableName, position) {
    var node = SpelNode.create('bean', position);

    node.getValue = function (state) {
        var locals = state.locals;
        // console.log('getValue', state, variableName, position)
        // var context = state.activeContext.peek(),
        //     locals = state.locals;

        // if (!context) {
        //     throw {
        //         name: 'ContextDoesNotExistException',
        //         message: 'Attempting to look up variable \''+ variableName +'\' for an undefined context.'
        //     };
        // }

        // //there are 2 keywords (root, this) that need to be dealt with
        // if (variableName === 'this') {
        //     return context;
        // }
        // if (variableName === 'root') {
        //     return state.rootContext;
        // }

        return locals[variableName];
    };

    node.setValue = function (value, state) {
        var locals = state.locals;

        /*jshint -W093 */
        return locals[variableName] = value;
        /*jshint +W093 */
    };

    return node;
}

export var BeanReference =  {
    create: createNode
};
