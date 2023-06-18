import { shallowMount } from '@vue/test-utils'
import ItemShowDialog from '../../components/ItemShowDialog.vue'

test('ItemShowDialog:showDialog', () => {
    const wrapper = shallowMount(ItemShowDialog);
    wrapper.vm.showDialog("title", "text");
    
    expect(wrapper.vm.$data.title).toBe("title");
    expect(wrapper.vm.$data.text).toBe("text");
    expect(wrapper.vm.$data.dialog_show).toBe(true);
  
  })
  
  test('ItemShowDialog:onOkClicked', () => {
    const wrapper = shallowMount(ItemShowDialog);

    wrapper.vm.$data.title = "title";
    wrapper.vm.$data.text = "text";
    wrapper.vm.$data.dialog_show = true;

    wrapper.vm.onOkClicked();
    
    expect(wrapper.vm.$data.title).toBe("");
    expect(wrapper.vm.$data.text).toBe("");
    expect(wrapper.vm.$data.dialog_show).toBe(false);
  
  })
