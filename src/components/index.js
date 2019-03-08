
const components = {

};

export default function (Vue) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};
