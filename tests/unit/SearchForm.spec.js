import Vue from 'vue';
import SearchForm from '@/components/common/SearchForm/SearchForm.vue';
import { enableAutoDestroy, shallowMount, mount } from '@vue/test-utils';

import element from 'element-ui';

Vue.use(element);

enableAutoDestroy(afterEach);

// eslint-disable-next-line no-undef
describe('SearchForm.vue', () => {
  let factory;
  beforeEach(() => {
    factory = (values = {}) => shallowMount(SearchForm, {
      propsData: {
        formData: {
        },
        formOptions: [
          { title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
        ],
        ...values,
      },
    });
  });
  it('表单lable的宽度，是否显示正常', () => {
    const wrapper = factory({ labelWidth: '120px' });
    expect(wrapper.findComponent(element.Form).vm.labelWidth).toBe('120px');
  });
  it('FormItem，label是否隐藏', () => {
    const wrapper = factory({
      formOptions: [
        { titleShow: true, title: '测试', key: 'yesterdayUsed', type: 'input' },
      ],
    });
    expect(wrapper.findComponent(element.FormItem).vm.label).toBe('');
  });
  it('FormItem，label是否显示', () => {
    const wrapper = factory({
      formOptions: [
        { title: '测试', key: 'yesterdayUsed', type: 'input' },
      ],
    });
    expect(wrapper.findComponent(element.FormItem).vm.label).toBe('测试：');
  });
  it('isAdvanced为true，组件是否显示正常', async () => {
    const wrapper = factory();
    await wrapper.setProps({
      isAdvanced: true,
    });
    expect(wrapper.find('#AdvancedSearch').text()).toBe('高级搜索');
  });

  it('子组件触发click事件--reset 是否触发', async () => {
    const wrapper = factory({ isAdvanced: true });
    wrapper.findAllComponents(element.Button).at(1).vm.$emit('click', 'searchForm');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().reset).toBeTruthy();
  });
  it('isSearch为false，组件是否显示正常', async () => {
    const wrapper = factory();
    await wrapper.setProps({
      isAdvanced: true,
      isSearch: false,
    });
    expect(wrapper.find('#AdvancedSearch').exists()).toBeTruthy();
  });

  it('hidden为false，input，组件是否显示', async () => {
    const wrapper = factory({
      formOptions: [
        { hidden: false, title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
      ],
    });
    expect(wrapper.find(element.Input).exists()).toBeTruthy();
  });
  it('hidden为true，input，组件是否隐藏', async () => {
    const wrapper = factory({
      formOptions: [
        { hidden: true, title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
      ],
    });
    expect(wrapper.find(element.Input).exists()).toBeFalsy();
  });
  it('formOptions-isAdvanced为true，显示关键字搜索框在外面', async () => {
    const wrapper = factory({
      isAdvanced: true,
      formOptions: [
        { isAdvanced: true, title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
      ],
    });
    expect(wrapper.find(element.Input).exists()).toBeTruthy();
  });
  it('isAdvanced为true mode默认 open为true，是否显示input搜索框', async () => {
    const wrapper = factory({
      isAdvanced: true,
      formOptions: [
        { isAdvanced: false, title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
      ],
    });
    wrapper.setData({ open: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(element.Input).exists()).toBeTruthy();
  });
  it('mode为special，特殊模式,只显示一个搜索框在外面', async () => {
    const wrapper = factory({
      isAdvanced: true,
      formOptions: [
        { title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
      ],
      mode: 'special',
    });
    expect(wrapper.find('#AdvancedSearch').exists()).toBeTruthy();
    expect(wrapper.findAllComponents(element.Button).length).toBe(0);
  });
  it('触发click事件--changeOpen 是否触发', async () => {
    const wrapper = factory({ isAdvanced: true });
    wrapper.setData({ open: false });
    wrapper.find('#AdvancedSearch').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.open).toBe(true);
    expect(wrapper.emitted().reset).toBeTruthy();
  });
  it('子组件触发click事件--submit 是否粗发', async () => {
    const wrapper = mount(SearchForm, {
      propsData: {
        formData: {},
        formOptions: [
              { title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
        ],
      },
    });
    wrapper.findAllComponents(element.Button).at(0).vm.$emit('click', 'searchForm');
    expect(wrapper.emitted().submit).toBeTruthy();
  });
  it('rules--判断校验成功', async () => {
    const wrapper = mount(SearchForm, {
      propsData: {
        formData: {},
        formOptions: [
          { title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
        ],
      },
    });
    const btn = wrapper.findAll('button').at(0);
    const input = wrapper.findAll('input').at(0);
    const rules = {
      yesterdayUsed: { required: true, message: '请输入', trigger: 'blur' },
    };
    wrapper.setProps({ rules });
    const formItemInput = '123';
    await input.setValue(formItemInput);
    await wrapper.vm.$nextTick();
    await btn.trigger('click');
    expect(wrapper.emitted().submit).toBeTruthy();
  });
  it('rules--判断校验失败', async () => {
    const wrapper = mount(SearchForm, {
      propsData: {
        formData: {},
        formOptions: [
          { title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
        ],
      },
    });
    const btn = wrapper.findAll('button').at(0);
    const input = wrapper.findAll('input').at(0);
    const rules = {
      yesterdayUsed: { required: true, message: '请输入', trigger: 'blur' },
    };
    wrapper.setProps({ rules });
    const formItemInput = '';
    await input.setValue(formItemInput);
    await wrapper.vm.$nextTick();
    await btn.trigger('click');
    expect(wrapper.emitted().submit).toBeFalsy();
  });
  it('mode为special，特殊模式,分支显示判断formOptions-hidden为true', async () => {
    const wrapper = factory({
      isAdvanced: true,
      formOptions: [
        { hidden: true, title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
      ],
      mode: 'special',
    });
    expect(wrapper.find(element.Input).exists()).toBeFalsy();
  });
  it('mode为special，特殊模式,分支显示判断open', async () => {
    const wrapper = factory({
      isAdvanced: true,
      formOptions: [
        { hidden: false, title: '昨日消耗≥', key: 'yesterdayUsed', type: 'input' },
      ],
      mode: 'special',
    });
    wrapper.find('#AdvancedSearch').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find(element.Input).exists()).toBeTruthy();
  });
});

