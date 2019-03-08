import common from './common';

const mixins = [common];

export default function (Vue) {
  mixins.forEach((mixin) => {
    Vue.mixin(mixin);
  });
};
