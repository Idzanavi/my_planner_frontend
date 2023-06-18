import { shallowMount } from '@vue/test-utils'
import YesNoDialog from '../../components/YesNoDialog.vue'


test('YesNoDialog:showDialog', () => {
    const wrapper = shallowMount(YesNoDialog);
    wrapper.vm.showDialog();

    expect(wrapper.vm.$data.dialog_show).toBe(true);  
})

test('YesNoDialog:hideDialog', () => {
    const wrapper = shallowMount(YesNoDialog);

    wrapper.vm.$data.dialog_show = true;
    wrapper.vm.hideDialog();

    expect(wrapper.vm.$data.dialog_show).toBe(false);  
})

test('YesNoDialog:onYes', () => {
    const wrapper = shallowMount(YesNoDialog);

    wrapper.vm.$data.dialog_show = true;
    wrapper.vm.onYes();

    expect(wrapper.vm.$data.dialog_show).toBe(false);
    expect(wrapper.emitted().yes).toBeTruthy();
    expect(wrapper.emitted().yes.length).toBe(1);
})

test('YesNoDialog:onNo', () => {
    const wrapper = shallowMount(YesNoDialog);

    wrapper.vm.$data.dialog_show = true;
    wrapper.vm.onNo();

    expect(wrapper.vm.$data.dialog_show).toBe(false);
    expect(wrapper.emitted().no).toBeTruthy();
    expect(wrapper.emitted().no.length).toBe(1);
})
