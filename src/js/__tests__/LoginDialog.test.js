import { shallowMount } from '@vue/test-utils'
import LoginDialog from '../../components/LoginDialog.vue'

test('LoginDialog:showDialog', () => {
    const wrapper = shallowMount(LoginDialog);
    wrapper.vm.showDialog();

    expect(wrapper.vm.$data.dialog_show).toBe(true);  
  })
  
test('LoginDialog:hideDialog', () => {
      const wrapper = shallowMount(LoginDialog);
  
      wrapper.vm.$data.login = "login";
      wrapper.vm.$data.password = "password";
      wrapper.vm.$data.loading = true;
      wrapper.vm.$data.dialog_show = true;
  
      wrapper.vm.hideDialog();
      
      expect(wrapper.vm.$data.login).toBe("");
      expect(wrapper.vm.$data.password).toBe("");
      expect(wrapper.vm.$data.loading).toBe(false);
      expect(wrapper.vm.$data.dialog_show).toBe(false);
    })
  
test('LoginDialog:stopLoading', () => {
        const wrapper = shallowMount(LoginDialog);

        wrapper.vm.$data.loading = true;
        wrapper.vm.stopLoading();

        expect(wrapper.vm.$data.loading).toBe(false);
      })

test('LoginDialog:onLoginClicked', () => {
        const wrapper = shallowMount(LoginDialog);
    
        wrapper.vm.$data.login = "login";
        wrapper.vm.$data.password = "password";
        wrapper.vm.$data.loading = false;
    
        wrapper.vm.onLoginClicked();
        
        expect(wrapper.vm.$data.loading).toBe(true);

        expect(wrapper.emitted().submit).toBeTruthy();
        expect(wrapper.emitted().submit.length).toBe(1);
        expect(wrapper.emitted().submit[0]).toEqual([{login: "login", password: "password"}]);
      })

test('LoginDialog:onCancelClicked', () => {
        const wrapper = shallowMount(LoginDialog);
    
        wrapper.vm.$data.login = "login";
        wrapper.vm.$data.password = "password";
        wrapper.vm.$data.loading = true;
        wrapper.vm.$data.dialog_show = true;
    
        wrapper.vm.onCancelClicked();
        
        expect(wrapper.vm.$data.login).toBe("");
        expect(wrapper.vm.$data.password).toBe("");
        expect(wrapper.vm.$data.loading).toBe(false);
        expect(wrapper.vm.$data.dialog_show).toBe(false);
      })
