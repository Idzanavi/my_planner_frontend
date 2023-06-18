import { mount, shallowMount } from '@vue/test-utils'
import RegisterUser from '../../components/RegisterUser.vue'

test('RegisterUser:onRegistered', () => {
    const wrapper = mount(RegisterUser);

    wrapper.vm.onRegistered();
    
    expect(wrapper.vm.$refs.success_dialog.$data.dialog_show).toBe(true);
})


test('RegisterUser:onRegistrationError', () => {
    const wrapper = mount(RegisterUser);

    wrapper.vm.onRegistrationError({response: "Error details"});
    
    expect(wrapper.vm.$refs.error_dialog.$data.dialog_show).toBe(true);
})

