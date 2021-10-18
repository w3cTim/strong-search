<template>
  <!-- <q-page class="flex flex-s row items-start q-ma-lg"> -->
  <div class="q-pa-md">
    <q-grid title="搜索引擎排序" :data="rows" :columns="columns" row-key="id" :draggable="true" v-model:pagination="pagination">
      <template v-slot:top>
        <q-btn color="primary" label="Add row" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" style="width: 50px">
            <q-btn flat round color="secondary" icon="open_with" size="sm"></q-btn>
          </q-td>
          <q-td key="group">
            {{ props.row.group }}
          </q-td>
          <q-td key="name">
            {{ props.row.name }}
          </q-td>
          <q-td key="url">
            {{ props.row.url }}
          </q-td>
          <q-td key="enable" style="width: 100px">
            <q-btn flat round :color="props.row.enable ? 'secondary' : 'blue-grey-12'" :icon="props.row.enable ? 'check_circle_outline' : 'highlight_off'" />
          </q-td>
          <q-td key="encode" style="width: 100px">
            <q-btn flat round :color="props.row.encode ? 'secondary' : 'blue-grey-12'" :icon="props.row.encode ? 'check_circle_outline' : 'highlight_off'" />
          </q-td>
        </q-tr>
      </template>
    </q-grid>
  </div>
  <q-footer bordered class="bg-white q-pa-md row justify-end">
    <q-btn class="row justify-center" color="primary" label="保存排序" @click="seva" />
  </q-footer>
  <!-- </q-page> -->
</template>

<script>
// export default defineComponent({
//   setup() {},
// });
import { ref } from "vue";
import { getStorageLocal, setStorageLocal } from "src/utils/index.js";

const columns = [
  { name: "id", label: "", field: "id" },
  { name: "group", align: "left", label: "分组名称", field: "group" },
  { name: "name", align: "left", label: "名称", field: "name" },
  { name: "url", align: "left", label: "URL", field: "url" },
  { name: "enable", align: "left", label: "是否启用", field: "enable" },
  { name: "encode", align: "left", label: "是否编码", field: "encode" },
];

const rows = [
  { id: 101, group: "默认", name: "google", url: "https://www.google.com.tw/search?q=%s", encode: false, enable: true },
  { id: 102, group: "默认", name: "百度", url: "https://www.baidu.com/search?q=%s", encode: false, enable: true },
  { id: 103, group: "默认", name: "wiki", url: "https://zh.wikipedia.org/wiki/%s", encode: false, enable: true },
  { id: 1032, group: "搜索", name: "必应", url: "http://www.bing.com/search?q=%s", encode: false, enable: true },
  { id: 10322, group: "搜索", name: "magi", url: "https://magi.com/search?q=%s", encode: false, enable: true },
  { id: 301, group: "购物", name: "值得买", url: "http://search.smzdm.com/?s=%s", encode: false, enable: true },
  { id: 302, group: "购物", name: "狗东", url: "https://search.jd.com/Search?keyword=%s", encode: false, enable: true },
  { id: 303, group: "购物", name: "亚马逊", url: "http://www.amazon.cn/keywords=%s", encode: false, enable: true },
];

const pagination = ref({ page: 1, rowsPerPage: 999 });

export default {
  setup() {
    return {
      columns,
      rows,
      pagination,
      seva() {
        try {
          setStorageLocal({ StrongData: rows });
        } catch (error) {}
      },
    };
  },
};
</script>

<style>
/* q-grid  hide-bottom hide-pagination 无效，只能用过 Css 处理 */
.q-table__bottom.row.items-center.justify-end {
  display: none;
}
</style>
