import { shallowMount } from '@vue/test-utils'
import InfoDialog from '../../components/InfoDialog.vue'

test('InfoDialog:showDialog', () => {
  const wrapper = shallowMount(InfoDialog);
  wrapper.vm.showDialog("title", "message");
  
  expect(wrapper.vm.$data.dialog_title).toBe("title");
  expect(wrapper.vm.$data.dialog_message).toBe("message");
  expect(wrapper.vm.$data.dialog_show).toBe(true);
})

test('InfoDialog:onOkClicked', () => {
    const wrapper = shallowMount(InfoDialog);

    wrapper.vm.$data.dialog_title = "not empty";
    wrapper.vm.$data.dialog_message = "not empty";
    wrapper.vm.$data.dialog_show = true;

    wrapper.vm.onOkClicked();
    
    expect(wrapper.vm.$data.dialog_title).toBe("");
    expect(wrapper.vm.$data.dialog_message).toBe("");
    expect(wrapper.vm.$data.dialog_show).toBe(false);
})