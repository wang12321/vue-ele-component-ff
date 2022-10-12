import Vue from 'vue';
import Pagination from '@/components/common/Pagination/Pagination.vue';
import { enableAutoDestroy, shallowMount, mount } from '@vue/test-utils';

import element from 'element-ui';
// 将会在每个测试之后运行 `wrapper.destroy()`
enableAutoDestroy(afterEach);

Vue.use(element);
jest.useFakeTimers();

// eslint-disable-next-line no-undef
describe('pagination.vue', () => {
  it('props传值 组件是否正常显示 ', async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageData: {
          total: 20,
          page: 1,
          rows: 20,
        },
      },
    });
    expect(wrapper.findComponent(element.Pagination).vm.pageSize).toBe(20);
    expect(wrapper.findComponent(element.Pagination).vm.total).toBe(20);
    expect(wrapper.findComponent(element.Pagination).vm.currentPage).toBe(1);
  });
  it('子组件触发size-change事件--props.pageData.rows 是否改变', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageData: {},
      },
    });
    wrapper.findComponent(element.Pagination).vm.$emit('size-change', 40);
    expect(wrapper.props().pageData.rows).toBe(40);
    expect(wrapper.emitted().reloadData).toBeTruthy();
  });
  it('子组件触发current-change事件--props.pageData.page 是否改变', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageData: {},
      },
    });
    wrapper.findComponent(element.Pagination).vm.$emit('current-change', 3);
    expect(wrapper.props().pageData.page).toBe(3);
    expect(wrapper.emitted().reloadData).toBeTruthy();
  });
  it('show 组件是否正常显示 ', async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageData: {},
      },
    });
    expect(wrapper.find(element.Pagination).exists()).toBe(true);
    await wrapper.setProps({ show: false });
    expect(wrapper.find(element.Pagination).exists()).toBe(false);
  });
  it('easeInOutQuad method ', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageData: {},
      },
    });
    expect(wrapper.vm.easeInOutQuad(200, 100, -100, 500)).toBe(68);
    expect(wrapper.vm.easeInOutQuad(300, 100, -100, 500)).toBe(32);
  });
  it('组件销毁事件--interval是否清空', async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageData: {
          total: 100,
        },
      },
      beforeDestroy() {
        if (wrapper.vm.interval) {
          clearInterval(wrapper.vm.interval);
          wrapper.vm.interval = null;
        }
      },
    });
    expect(wrapper.vm.interval).toBe(null);
    wrapper.vm.scrollToTop();
    expect(wrapper.vm.interval).not.toBe(null);
    wrapper.destroy();
    expect(wrapper.vm.interval).toBe(null);
  });

  it('测试定时器回调函数', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageData: {},
      },
    });
    window.scrollTo = jest.fn();
    // mock函数可以记录状态
    const fn = jest.fn(() => -10);
    wrapper.setMethods({ easeInOutQuad: fn });
    wrapper.vm.scrollToTop();
    // 把所有的定时器执行
    jest.runAllTimers();
    // 这里判断是否调用
    expect(fn).toBeCalled();
  });
  it('测试定时器回调函数判断分支if以及backPosition值', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        pageData: {},
        backPosition: 10,
      },
    });
    // mock函数可以记录状态
    let i = 0;
    const fn = jest.fn(() => {
      // eslint-disable-next-line no-plusplus
      i++;
      return 20 - i;
    });
    window.scrollTo = jest.fn();
    wrapper.setMethods({ easeInOutQuad: fn });
    wrapper.vm.scrollToTop();
    // 把所有的定时器执行
    jest.runAllTimers();
    expect(window.scrollTo).toBeCalledWith(0, 10);
  });
});

