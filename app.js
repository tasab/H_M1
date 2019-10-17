function setProp(component, props) {
  for (let type_of_props in props) {
    if (type_of_props === "style") {
      for (let type_of_attribute in props[type_of_props]) {
        component[`${type_of_props}`][`${type_of_attribute}`] =
          props[type_of_props][type_of_attribute];
      }
    } else if (type_of_props !== "children") {
      component[`${type_of_props}`] = `${props[type_of_props]}`;
    }
  }
}
function createElement(type, props, ...children) {
  const node = {
    type,
    props: props || {}
  };
  if (children) {
    node.props.children = children;
  }
  const children_element = node.props.children[0];
  if (node.props.children.length < 1 || typeof children_element === "string") {
    const wrapper_text = document.createElement(node.type);
    setProp(wrapper_text, node.props);
    const text = document.createTextNode(node.props.children);
    wrapper_text.appendChild(text);
    return wrapper_text;
  }
  const main_component = document.createElement(node.type);
  setProp(main_component, node.props);
  for (let i = 0; i < node.props.children[0].length; i++) {
    if (typeof node.props.children[0][i] === "string") {
      const inner_element = document.createTextNode(node.props.children[0][i]);
      main_component.appendChild(inner_element);
    } else {
      main_component.appendChild(node.props.children[0][i]);
    }
  }
  return main_component;
}

function rendered(main_component, container) {
  container.appendChild(main_component);
}

const React = {
  createElement,
  rendered
};

const app = React.createElement("div", { style: { backgroundColor: "red" } }, [
  React.createElement("span", undefined, "Hello world"),
  React.createElement("br"),
  "This is just a text node",
  React.createElement("div", { textContent: "Text content" })
]);

React.rendered(app, document.getElementById("app"));
