import _ from 'lodash';
import { DevicesURL } from '../utils/device';

export default {
  methods: {
    getDevice () {
      return this.$route.device;
    },
    getDeviceUrl () {
      return DevicesURL[this.getDevice()];
    },
  },
};
