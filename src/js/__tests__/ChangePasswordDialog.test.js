import { shallowMount } from '@vue/test-utils'
import ChangePasswordDialog from '../../components/ChangePasswordDialog.vue'


test('ChangePasswordDialog:showDialog', () => {
  const wrapper = shallowMount(ChangePasswordDialog);
  wrapper.vm.showDialog();

  expect(wrapper.vm.$data.dialog_show).toBe(true);
})


test('ChangePasswordDialog:hideDialog', () => {
  const wrapper = shallowMount(ChangePasswordDialog);
  
  wrapper.vm.$data.cur_password = "123";
  wrapper.vm.$data.new_password = "abc";
  wrapper.vm.$data.new_password2 = "abc";
  wrapper.vm.$data.dialog_show = true;
  
  wrapper.vm.hideDialog();

  expect(wrapper.vm.$data.cur_password).toBe("");
  expect(wrapper.vm.$data.new_password).toBe("");
  expect(wrapper.vm.$data.new_password2).toBe("");
  expect(wrapper.vm.$data.dialog_show).toBe(false);
})

test('ChangePasswordDialog:onCancelClicked', () => {
  const wrapper = shallowMount(ChangePasswordDialog);
  
  wrapper.vm.$data.cur_password = "123";
  wrapper.vm.$data.new_password = "abc";
  wrapper.vm.$data.new_password2 = "abc";
  wrapper.vm.$data.dialog_show = true;
  
  wrapper.vm.onCancelClicked();

  expect(wrapper.vm.$data.cur_password).toBe("");
  expect(wrapper.vm.$data.new_password).toBe("");
  expect(wrapper.vm.$data.new_password2).toBe("");
  expect(wrapper.vm.$data.dialog_show).toBe(false);
})

test('ChangePasswordDialog:onOkClicked', () => {
  const wrapper = shallowMount(ChangePasswordDialog);
  
  wrapper.vm.$data.cur_password = "123";
  wrapper.vm.$data.new_password = "abc";
  wrapper.vm.$data.new_password2 = "abc";
  wrapper.vm.$data.dialog_show = true;
  
  wrapper.vm.onOkClicked();

  expect(wrapper.vm.$data.cur_password).toBe("");
  expect(wrapper.vm.$data.new_password).toBe("");
  expect(wrapper.vm.$data.new_password2).toBe("");
  expect(wrapper.vm.$data.dialog_show).toBe(false);

  expect(wrapper.emitted().submit).toBeTruthy();
  expect(wrapper.emitted().submit.length).toBe(1);
  expect(wrapper.emitted().submit[0]).toEqual([{cur_password: "123", new_password: "abc", new_password2: "abc"}]);
})
