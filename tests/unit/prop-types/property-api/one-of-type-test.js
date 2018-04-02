/**
 * Unit test for the PropTypes.oneOfType validator
 */
import EmberObject from '@ember/object';
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {
  itValidatesTheProperty,
  spyOnValidateMethods
} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const numberTypeDef = {
  isRequired: {
    required: true,
    type: 'number'
  },
  required: false,
  type: 'number'
}

const stringTypeDef = {
  isRequired: {
    required: true,
    type: 'string'
  },
  required: false,
  type: 'string'
}

const requiredDef = {
  required: true,
  type: 'oneOfType',
  typeDefs: [numberTypeDef, stringTypeDef]
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'oneOfType',
  typeDefs: [numberTypeDef, stringTypeDef]
}

describe('Unit / validator / PropTypes.oneOfType', function () {
  const ctx = {propertyName: 'bar'}
  let sandbox, Foo

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    spyOnValidateMethods(sandbox)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when required', function () {
    beforeEach(function () {
      ctx.def = requiredDef
      Foo = EmberObject.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
          ]).isRequired
        }
      })
    })

    describe('when initialized with number instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with string instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'test'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with boolean instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: true})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be one of expected types: [number, string]')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
    })
  })

  describe('when not required', function () {
    let Foo

    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = EmberObject.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
          ])
        }
      })
    })

    describe('when initialized with number instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with string instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'test'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with boolean instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: true})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be one of expected types: [number, string]')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })
})
