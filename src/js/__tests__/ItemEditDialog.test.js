import { shallowMount, mount } from '@vue/test-utils'
import ItemEditDialog from '../../components/ItemEditDialog.vue'

test('ItemEditDialog:showDialog', () => {
  const wrapper = shallowMount(ItemEditDialog);
  wrapper.vm.showDialog({a: "123"}, "title", "text", "#FF8888");
  
  expect(wrapper.vm.$data.item_title).toBe("title");
  expect(wrapper.vm.$data.item_text).toBe("text");
  expect(wrapper.vm.$data.item_color).toBe("#FF8888");
  expect(wrapper.vm.$data.extra).toStrictEqual({a: "123"});
  expect(wrapper.vm.$data.dialog_show).toBe(true);

})

test('ItemEditDialog:hideDialog', () => {
    const wrapper = shallowMount(ItemEditDialog);

    wrapper.vm.$data.item_title = "title";
    wrapper.vm.$data.item_text = "text";
    wrapper.vm.$data.item_color = "#AAFFBB"
    wrapper.vm.$data.extra = {data: "aaa"};
    wrapper.vm.$data.dialog_show = true;

    wrapper.vm.hideDialog();
    
    expect(wrapper.vm.$data.item_title).toBe(undefined);
    expect(wrapper.vm.$data.item_text).toBe(undefined);
    expect(wrapper.vm.$data.item_color).toBe(null);
    expect(wrapper.vm.$data.extra).toStrictEqual(null);
    expect(wrapper.vm.$data.dialog_show).toBe(false);
  
  })

  test('ItemEditDialog:onDelete', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.onDelete();
    
    expect(wrapper.vm.$refs.delete_dialog.$data.dialog_show).toBe(true);
  })

  test('ItemEditDialog:onSubmitDelete', () => {
    const wrapper = shallowMount(ItemEditDialog);

    wrapper.vm.$data.item_title = "title";
    wrapper.vm.$data.item_text = "text";
    wrapper.vm.$data.item_color = "#AAFFBB"
    wrapper.vm.$data.extra = {data: "aaa"};
    wrapper.vm.$data.dialog_show = true;

    wrapper.vm.onSubmitDelete();
    
    expect(wrapper.vm.$data.item_title).toBe(undefined);
    expect(wrapper.vm.$data.item_text).toBe(undefined);
    expect(wrapper.vm.$data.item_color).toBe(null);
    expect(wrapper.vm.$data.extra).toStrictEqual(null);
    expect(wrapper.vm.$data.dialog_show).toBe(false);

    expect(wrapper.emitted().delete).toBeTruthy();
    expect(wrapper.emitted().delete.length).toBe(1);
    expect(wrapper.emitted().delete[0]).toEqual([{extra: {data: "aaa"}}]);
  })
  
  test('ItemEditDialog:onSubmit', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.$data.item_title = "title";
    wrapper.vm.$data.item_text = "text";
    wrapper.vm.$data.item_color = "#AAFFBB"
    wrapper.vm.$data.extra = {data: "aaa"};
    wrapper.vm.$data.dialog_show = true;

    wrapper.vm.onSubmit();
    
    expect(wrapper.vm.$data.item_title).toBe(undefined);
    expect(wrapper.vm.$data.item_text).toBe(undefined);
    expect(wrapper.vm.$data.item_color).toBe(null);
    expect(wrapper.vm.$data.extra).toStrictEqual(null);
    expect(wrapper.vm.$data.dialog_show).toBe(false);

    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().submit.length).toBe(1);
    expect(wrapper.emitted().submit[0]).toEqual([{title: "title", text: "text", color: "#AAFFBB", extra: {data: "aaa"}}]);
  })

  test('ItemEditDialog:onSubmit (failed)', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.$data.item_title = "";
    wrapper.vm.$data.item_text = "";
    wrapper.vm.$data.item_color = "#AAFFBB"
    wrapper.vm.$data.extra = {data: "aaa"};

    wrapper.vm.onSubmit();
    
    expect(wrapper.vm.$refs.bad_data_dialog.$data.dialog_show).toBe(true);
  })

  test('ItemEditDialog:isBadInput (false)', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.$data.item_title = "title";
    wrapper.vm.$data.item_text = "text";
    wrapper.vm.$data.item_color = "#AAFFBB"

    expect(wrapper.vm.isBadInput()).toBe(false);
  })

  test('ItemEditDialog:isBadInput (true all)', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.$data.item_title = "";
    wrapper.vm.$data.item_text = "";
    wrapper.vm.$data.item_color = ""

    expect(wrapper.vm.isBadInput()).toBe(true);
  })

  test('ItemEditDialog:isBadInput (true 1)', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.$data.item_title = "";
    wrapper.vm.$data.item_text = "text";
    wrapper.vm.$data.item_color = "#AAFFBB"

    expect(wrapper.vm.isBadInput()).toBe(true);
  })

  test('ItemEditDialog:isBadInput (true 2)', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.$data.item_title = "title";
    wrapper.vm.$data.item_text = "";
    wrapper.vm.$data.item_color = "#AAFFBB"

    expect(wrapper.vm.isBadInput()).toBe(true);
  })

  test('ItemEditDialog:isBadInput (true 3)', () => {
    const wrapper = mount(ItemEditDialog);

    wrapper.vm.$data.item_title = "title";
    wrapper.vm.$data.item_text = "text";
    wrapper.vm.$data.item_color = ""

    expect(wrapper.vm.isBadInput()).toBe(true);
  })

  test('ItemEditDialog:onCancel', () => {
    const wrapper = shallowMount(ItemEditDialog);

    wrapper.vm.$data.item_title = "title";
    wrapper.vm.$data.item_text = "text";
    wrapper.vm.$data.item_color = "#AAFFBB"
    wrapper.vm.$data.extra = {data: "aaa"};
    wrapper.vm.$data.dialog_show = true;

    wrapper.vm.onCancel();
    
    expect(wrapper.vm.$data.item_title).toBe(undefined);
    expect(wrapper.vm.$data.item_text).toBe(undefined);
    expect(wrapper.vm.$data.item_color).toBe(null);
    expect(wrapper.vm.$data.extra).toStrictEqual(null);
    expect(wrapper.vm.$data.dialog_show).toBe(false);
  
  })
