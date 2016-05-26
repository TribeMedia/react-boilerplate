/**
 * Created by gqadonis on 5/26/16.
 */
// Property instruments...

//(function() {

  'use strict';

  var throwErr = function(err) {
    throw new Error(err);
  };

  if (window.inspectorTools) {
    throwErr('Inspector tools are already defined.')
  } else {
    window.inspectorTools = {};
  }

  var Component = function(name, owner, options) {
    this.name = name;
    this.owner = owner;
    this.options = options;

    this.actionHookMap = {};
    this.propertyHookMap = {};

    var thisComponent = this;

    var ActionHook = function (actionSpec) {
      var hooks = [];

      this.spec = actionSpec;

      this.dispatch = function(action) {
        if (hooks.length > 0) {
          for (var i = 0; i < hooks.length; ++i) {
            hooks[i](thisComponent, action);
          }
        }
      }

      this.addHookFunction = function(hookFunc) {
        hooks.push(hookFunc);
      }

      this.removeHookFunction = function(hookFunc) {
        var index = hooks.indexOf(hookFunc);
        if (index != -1) {
          hooks.splice(index, 1);
        }
      }
    }

    var PropertyHook = function (propertySpec) {
      var hooks = [];

      this.set = function(value) {
        var oldValue = propertySpec.getMethod();
        console.log('Old Property: ' + oldValue + ', New Property: ' + value);
        propertySpec.setMethod(value);
        if (hooks.length > 0 && oldValue !== value) {
          for (var i = 0; i < hooks.length; ++i) {
            hooks[i](thisComponent, oldValue, value);
          }
        }
      }

      this.get = propertySpec.getMethod;
      
      this.addHookFunction = function(hookFunc) {
        hooks.push(hookFunc);
      }
      
      this.removeHookFunction = function(hookFunc) {
        var index = hooks.indexOf(hookFunc);
        if (index != -1) {
          hooks.splice(index, 1);
        }
      }
    }

    // set up hooks for each defined property and action...
    if (options && options.properties && options.properties.length > 0) {
      for (var i = 0; i < options.properties.length; ++i) {
        var prop = options.properties[i];
        var propertyHook = new PropertyHook(prop);
        this.propertyHookMap[prop.name] = propertyHook;
      }
    }

    if (options && options.actions && options.actions.length > 0) {
      for (var i = 0; i < options.actions.length; ++i) {
        var action = options.actions[i];
        var actionHook = new ActionHook(action);
        this.actionHookMap[action.name] = actionHook;
      }
    }

    this.registerActionHook = function (actionName, actionCallback) {
      var actionHook = thisComponent.actionHookMap[actionName];
      if (actionHook && typeof(actionCallback) === 'function') {
        actionHook.addHookFunction(actionCallback);
      }
    }

    this.unregisterActionHook = function (actionName, actionCallback) {
      var actionHook = thisComponent.actionHookMap[actionName];
      if (actionHook && typeof(actionCallback) === 'function') {
        actionHook.removeHookFunction(actionCallback);
      }
    }

    this.registerPropertyHook = function (propName, propCallback) {
      var propertyHook = thisComponent.propertyHookMap[propName];
      if (propertyHook && typeof(propCallback) === 'function') {
        propertyHook.addHookFunction(propCallback);
      }
    }

    this.unregisterPropertyHook = function (propName, propCallback) {
      var propertyHook = thisComponent.propertyHookMap[propName];
      if (propertyHook && typeof(propCallback) === 'function') {
        propertyHook.removeHookFunction(propCallback);
      }
    }

    this.dispatchAction = function (action) {
      var actionHook = thisComponent.actionHookMap[action.name];
      if (actionHook) {
        actionHook.dispatch(action);
      }
    }

    this.getProperty = function (name) {
      var propertyHook = thisComponent.propertyHookMap[name];
      if (propertyHook) {
        return propertyHook.get();
      }
      return null;
    }

    this.setProperty = function (name, value) {
      var propertyHook = thisComponent.propertyHookMap[name];
      if (propertyHook) {
        return propertyHook.set(value);
      }
    }
  }

  // prototypes....
  window.inspectorTools.components = {};

  window.inspectorTools.PropTypes = {
    String : 'string',
    Number : 'number',
    Object : 'object',
    Date: 'date',
    Bool : 'bool',
    Array : 'array'
  };

  window.inspectorTools.addComponent = function(name, component, options) {
    if (window.inspectorTools.components[name] !== undefined) {
      throwErr('Component with name: ' + name + ' already exists!');
    }

    if (component == null || typeof(component) === undefined) {
      throwErr('Cannot defined a null component!');
    }

    if (component.hasOwnProperty('__inspectorComponent')) {
      throwErr('Component already assigned!');
    }

    component.__inspectorComponent = new Component(name, component, options);
    window.inspectorTools.components[name] = component.__inspectorComponent;

    console.log('Component ' + name + ' added!');
    return component.__inspectorComponent;
  };

  window.inspectorTools.getComponent = function(name) {
    return window.inspectorTools.components[name];
  }

  window.inspectorTools.removeComponent = function(name) {
    console.log('Component ' + name + ' removed!');
    window.inspectorTools.components[name] = null;
  }

  window.inspectorTools.dispatchAction = function(componentName, action) {
    var component = window.inspectorTools.getComponent(componentName);
    if (component) {
      component.dispatchAction(action);
    }
  }

  window.inspectorTools.registerForAction = function(componentName, actionName, actionFunc) {
    var component = window.inspectorTools.getComponent(componentName);
    if (component) {
      component.registerActionHook(actionName, actionFunc);
    }
  }

  window.inspectorTools.unregisterForAction = function(componentName, actionName, actionFunc) {
    var component = window.inspectorTools.getComponent(componentName);
    if (component) {
      component.unregisterActionHook(actionName, actionFunc);
    }
  }

  window.inspectorTools.getComponentProperty = function(componentName, propertyName) {
    var component = window.inspectorTools.getComponent(componentName);
    if (component) {
      return component.getProperty(propertyName);
    }
    return null;
  }

  window.inspectorTools.setComponentProperty = function(componentName, propertyName, value) {
    var component = window.inspectorTools.getComponent(componentName);
    if (component) {
      return component.setProperty(propertyName, value);
    }
    return null;
  }

//}());

export default function getInspectorTools() {
  return window.inspectorTools;
}